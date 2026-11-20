# Code layout

```
src/bewerbungs_pipeline/
  sources/arbeitsagentur.py   search, enrichment, availability check
  sources/indeed.py           search via python-jobspy
  sources/normalisierung.py   raw source values to display values (pure)
  pipeline.py                 fetch runs shared by CLI and web (search, store, mark gone)
  db.py                       SQLite schema, migration, access
  models.py                   JobItem data model
  config.py                   settings from environment / .env
  applications.py             create application, fill slots (LLM), fetch description
  llm.py                      LLM client, response schema, validation
  slots.py                    data-slot detection in HTML templates
  pdf.py                      export via local Chromium (Playwright)
  generate.py                 CLI facade: create an application and export it
  tasks.py                    in-memory background tasks for slow web calls (fetch, LLM, export)
  cli.py                      command line
  web/app.py                  FastAPI app: host/origin guard, optional basic auth, serves the React frontend
  web/routes/                 JSON API (/api/jobs, /api/applications, /api/tasks, /api/profile) and the HTML preview
  web/schemas.py              request and response models

frontend/                     Vite + React + TypeScript + shadcn/ui
  src/features/stellen/       list, filters, detail, command palette
  src/features/bewerbung/     slot editor, preview
  src/features/profil/        profile page (portrait and signature upload)
  dist/                       build output, committed
```
