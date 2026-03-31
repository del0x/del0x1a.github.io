# 0x1A // LOG

A minimal static site generator.

## [ SPECS ]
- **Core:** Python 3.14
- **Templating:** staticjinja (Jinja2)
- **Styling:** Custom CSS
- **Deployment:** GitHub Pages

## [ WORKFLOW ]
1.  Create note: `touch notes/new-entry.md`
2.  Add metadata block (title, date, tags, resources).
3.  Execute build: `./main.sh`
4.  Push to remote: `git push origin main`

## [ PROJECT GOALS ]
- [x] Custom terminal-style bullets (>>)
- [x] Automated resource list parsing
- [x] Add a surprise to the ??? page
- [x] Make the kitty "interactable"
- [ ] Move to self-hosted VPS / Docker
- [ ] Add RSS feed generation
- [ ] Build searchable tags