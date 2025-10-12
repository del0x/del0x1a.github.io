from pathlib import Path
import markdown
import datetime
import re
import shutil
from staticjinja import Site

NOTES_DIR = Path("notes")
OUTPUT_DIR = Path("../")   # output one level up
STATIC_DIR = Path("static")

def parse_markdown(md_file):
    """Convert markdown to HTML and extract metadata."""
    text = md_file.read_text(encoding="utf-8")
    html = markdown.markdown(text)

    # Title = first H1, fallback to filename
    match = re.search(r"<h1>(.*?)</h1>", html)
    title = match.group(1) if match else md_file.stem.replace("-", " ").title()

    # Date = file modified date
    date = datetime.datetime.fromtimestamp(md_file.stat().st_mtime).strftime("%Y-%m-%d")

    filename = md_file.with_suffix(".html").name
    url = f"notes/{filename}"

    return {
        "title": title,
        "date": date,
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
    notes = collect_notes()

    # Ensure output directories exist
    (OUTPUT_DIR / "notes").mkdir(parents=True, exist_ok=True)

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
    copy_static()

if __name__ == "__main__":
    build()
