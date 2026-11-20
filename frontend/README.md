# Jobschleuse — Frontend

React + TypeScript + Vite + shadcn/ui gegen die JSON-API der
[Jobschleuse](../README.md) unter `/api/*`.

    npm install
    npm run dev      # Hot-Reload gegen die laufende FastAPI-API (Proxy in vite.config.ts)
    npm run build    # → dist/, wird committed — uv run jobs serve braucht kein Node
    npm test         # Vitest
    npm run sync:harmonia   # optional: refresh src/harmonia/ from a Harmonia checkout (HARMONIA_DIR)

## Konventionen

Eigenständiges `package.json`, unabhängig vom Python-Toolchain der API. `npm run
build` erzeugt `dist/` — das wird committed, `uv run jobs serve` liefert es zur
Laufzeit direkt aus und braucht selbst kein Node/npm. `npm test` (Vitest) deckt
gezielt Logik mit echtem Fehlerpotenzial ab (Debounce, Task-Polling), nicht
jede Komponente. `/applications/{id}/preview` bleibt ein serverseitig
gerenderter HTML-Endpunkt (iframe-Inhalt der Bewerbungsvorschau) — kein Teil
der JSON-API.
