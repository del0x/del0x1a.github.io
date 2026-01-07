# 0x1A // LOGBOOK

A minimal static site generator built to turn my thoughts into a searchable knowledge base.

## [ SPECS ]
- **Core:** Python 3.10
- **Templating:** staticjinja (Jinja2)
- **Styling:** Custom CSS
- **Deployment:** GitHub Pages

## [ WORKFLOW ]
1.  Create note: `touch notes/new-entry.md`
2.  Add metadata block (title, date, tags, resources).
3.  Execute build: `python3 build.py`
4.  Push to remote: `git push origin main`

## [ PROJECT GOALS ]
- [x] Custom terminal-style bullets (>>)
- [x] Automated resource list parsing
- [x] Add a surprise to the ??? page
- [x] Make the kitty "interactable"
- [ ] Move to self-hosted VPS / Docker
- [ ] Add RSS feed generation
- [ ] Build searchable tags