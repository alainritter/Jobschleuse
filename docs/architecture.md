# Code layout

```
src/bewerbungs_pipeline/
  sources/arbeitsagentur.py   search, enrichment, availability check
  sources/indeed.py           search via python-jobspy
  sources/normalisierung.py   raw source values to display values (pure)
  db.py                       SQLite schema, migration, access
  models.py                   JobItem data model
  applications.py             create application, fill slots (LLM), fetch description
  llm.py                      LLM client, response schema, validation
  slots.py                    data-slot detection in HTML templates
  pdf.py                      export via local Chromium (Playwright)
  cli.py                      command line
  web/                        FastAPI: JSON API (/api/*), serves the React frontend

frontend/                     Vite + React + TypeScript + shadcn/ui
  src/features/stellen/       list, filters, detail, command palette
  src/features/bewerbung/     slot editor, preview
  dist/                       build output, committed
```
