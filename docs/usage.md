# Usage

## Features

| Area | Description |
|---|---|
| Search | Bundesagentur für Arbeit API (`fetch`) and Indeed via jobspy (`fetch-indeed`); filters for radius, age (`--since`), no temp agencies, jobs only (no apprenticeships) |
| Enrichment | Employer type (direct/agency/temp), salary, home office, contract, hours, address, distance, fetched in parallel without slowing the search |
| Upkeep | Every search and `jobs check` detects stored postings that disappeared at the source; they are marked, not deleted |
| Management | Status per job (`new` / `selected` / `rejected`) via CLI or web UI |
| Template and slots | Your own HTML template with `data-slot` markers; text blocks are filled by an LLM from profile and posting and can be edited one by one |
| Export | Finished PDF (via local Chromium) plus HTML/CSS/assets for manual fixes |

For the PDF export a Chromium-based browser (`chromium`, `google-chrome` or `brave`) must be installed; Playwright drives it but does not download one. Without it everything except `jobs generate` works.

## Web UI

```sh
uv run jobs serve   # http://127.0.0.1:8765
```

React and shadcn/ui against a JSON API under `/api/*`: job list with filters, sorting and bulk actions, command palette (Ctrl/Cmd+K), application generation, per-block auto-save editing and regeneration, live preview, export, light and dark theme. Bound to 127.0.0.1 by default, no login unless `JOBS_WEB_TOKEN` is set (then HTTP Basic Auth protects the whole app). CLI and UI share the same business logic.

The frontend lives in `frontend/` (Vite, React, TypeScript) and its build is committed (`frontend/dist/`), so `uv run jobs serve` is the only command needed at runtime. For frontend work: `cd frontend && npm install && npm run dev` (hot reload, proxies to the FastAPI API), `npm run build` before committing, `npm test` for Vitest.

The frontend styles come from a committed copy of the [Harmonia](https://github.com/alainritter/Harmonia) design system in `frontend/src/harmonia/`, so the build needs nothing outside this repo. To refresh it from a Harmonia checkout: `HARMONIA_DIR=/path/to/Harmonia npm run sync:harmonia`.

## Run as a service (optional)

`systemd/jobschleuse.service` is a systemd user unit for an always-on web UI. It assumes the checkout in `~/Dev/Jobschleuse` and `uv` in `~/.local/bin`; edit those two lines if yours differ.

```sh
mkdir -p ~/.config/systemd/user
cp systemd/jobschleuse.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable --now jobschleuse
```

Settings go into `.env`, not into the unit. For access from another device (for example behind a reverse proxy or a VPN name) set `JOBS_ALLOWED_HOSTS=<hostname>[,<hostname>]` and, on a network you do not fully trust, `JOBS_WEB_TOKEN`. The service itself stays on `127.0.0.1` unless you pass `--host`.

Disappeared postings are hidden but reachable via "show gone too", together with an application that may already exist.

## Templates

`templates/` contains:

- `beispiel.html`: minimal demo template (default).
- `beispiel-org.html`: demo template with organisation-specific slots.
- `styles.css`: shared styles for your own templates.

Your own templates (for example `bewerbung.html` plus `assets/`) are deliberately not part of the repo, so photo and signature stay local.

To connect your own template:

1. Copy the HTML file to `templates/<name>.html`.
2. Mark every text block that changes per application with `data-slot="name"` (unique names). Everything without `data-slot` stays unchanged.
3. Set `TEMPLATE_PATH=templates/<name>.html` in `.env`.

## Export result

Each application produces `out/<company>/`:

- `Bewerbung_<Name>_<Firma>.pdf`: the finished document
- `index.html`, `styles.css`, `assets/`: the same application as HTML for manual fixes
- `stelle.md`: the job posting for reference

The template ships fonts, icons and images locally, so preview and PDF look the same offline.

## Privacy

All data (jobs, profile, status, exported applications) stays local in SQLite or on disk. Only the LLM call that fills the text leaves the machine, with a freely chosen endpoint (`LLM_BASE_URL`).
