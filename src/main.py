from pathlib import Path
import os
import markdown
import datetime
import re
import shutil
from staticjinja import Site

BASE_DIR = Path(__file__).resolve().parent
NOTES_DIR = BASE_DIR.parent / "notes"
OUTPUT_DIR = BASE_DIR.parent / "docs"
STATIC_DIR = BASE_DIR.parent / "static"

def parse_markdown(md_file):
    """Convert markdown to HTML and extract metadata cleanly."""
    text = md_file.read_text(encoding="utf-8")
    
    # Initialize Markdown with Meta extension
    md = markdown.Markdown(extensions=['meta'])
    html = md.convert(text)
    
    # Extract metadata dictionary
    meta = md.Meta if hasattr(md, 'Meta') else {}

    # 1. Extract Title: Metadata > First H1 > Filename
    title_list = meta.get('title', [])
    title = title_list[0] if title_list else None
    if not title:
        match = re.search(r"<h1>(.*?)</h1>", html)
        title = match.group(1) if match else md_file.stem.replace("-", " ").title()

    # 2. Extract Date: Metadata > File System
    date_list = meta.get('date', [])
    if date_list:
        try:
            date = datetime.datetime.fromisoformat(date_list[0])
        except ValueError:
            # fallback if format is invalid
            date = datetime.datetime.fromtimestamp(md_file.stat().st_mtime)
    else:
        date = datetime.datetime.fromtimestamp(md_file.stat().st_mtime)

    # 3. Clean Resources (Robust Fix for single/multi line)
    raw_resources = meta.get('resources', [])
    
    # Force into a list if it's somehow a single string
    if isinstance(raw_resources, str):
        raw_resources = [raw_resources]
        
    cleaned_resources = []
    for res in raw_resources:
        res_str = str(res).strip()
        
        # Skip empty lines or lines that are just 'link: ...'
        if not res_str or res_str.lower().startswith('link:'):
            continue
            
        # Strip 'name: ' prefix if it exists
        if res_str.lower().startswith('name:'):
            # Splitting by the first colon to get just the value
            clean_name = res_str.split(':', 1)[-1].strip()
        else:
            clean_name = res_str
        
        if clean_name:
            cleaned_resources.append(clean_name)

    filename = md_file.with_suffix(".html").name
    url = f"notes/{filename}"

    tags_list = meta.get('tags', [])
    
    if isinstance(tags_list, str):
        tags_list = [tags_list]
        
    # Clean them up: lowercase and remove extra whitespace
    tags = [tag.strip().lower() for tag in tags_list if tag.strip()]

    return {
        "title": title,
        "date": date,
        "date_str": date.strftime("%Y-%m-%d"),
        "resources": cleaned_resources,
        "tags": tags,
        "content": html,
        "filename": filename,
        "url": url,
    }

def collect_notes():
    notes = [parse_markdown(md) for md in NOTES_DIR.glob("*.md")]
    return sorted(notes, key=lambda n: n["date"], reverse=True)

def copy_static():
    """Copy static assets (css, js, images) into output/."""
    if STATIC_DIR.exists():
        for item in STATIC_DIR.iterdir():
            dest = OUTPUT_DIR / item.name
            if item.is_dir():
                shutil.copytree(item, dest, dirs_exist_ok=True)
            else:
                shutil.copy2(item, dest)

def build():
    print("Collecting notes...")
    notes = collect_notes()

    # Ensure output directories exist
    (OUTPUT_DIR / "notes").mkdir(parents=True, exist_ok=True)

    print("Generating site...")
    site = Site.make_site(
        searchpath="templates",
        outpath=str(OUTPUT_DIR),
        contexts=[
            ("index.html", lambda: {}),  # landing page
            ("notes_index.html", lambda: {"notes": notes}),  # notes list
            ("books.html", lambda: {}),
        ],
        rules=[(".*", lambda env, template, **kw: None)],  # disable auto
    )

    # Render individual notes
    for note in notes:
        template = site.get_template("note.html")
        rendered = template.render(note=note, current_page="/notes/index")
        (OUTPUT_DIR / "notes" / note["filename"]).write_text(rendered, encoding="utf-8")

    notes_for_index = []
    for note in notes:
        note_copy = note.copy()
        if note_copy["filename"].endswith(".html"):
            note_copy["filename"] = note_copy["filename"][:-5]  # strip ".html"
        notes_for_index.append(note_copy)

    # Render notes index
    template = site.get_template("notes_index.html")
    (OUTPUT_DIR / "notes" / "index.html").write_text(
        template.render(notes=notes_for_index, current_page="/notes/index"), encoding="utf-8"
    )

    # Render landing page
    template = site.get_template("index.html")
    (OUTPUT_DIR / "index.html").write_text(template.render(baseurl="", current_page="/index"), encoding="utf-8")

    template = site.get_template("books.html")
    (OUTPUT_DIR / "books.html").write_text(template.render(baseurl="", current_page="/books"), encoding="utf-8")
    
    template = site.get_template("birb.html")
    (OUTPUT_DIR / "birb.html").write_text(template.render(baseurl="", current_page="/???"), encoding="utf-8")

    # Copy static assets
    print("Copying static files...")
    copy_static()

if __name__ == "__main__":
    build()