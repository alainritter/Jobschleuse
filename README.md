# Jobschleuse

Local pipeline from job search to a finished application: find postings, enrich them with facts the result list lacks, shortlist, and fill an application template with an LLM.

![Jobschleuse web UI](docs/screenshot.png)

![Data flow: Bundesagentur and Indeed, fetch with enrichment, SQLite, selected job, fill slots via LLM, export as PDF and HTML](docs/architecture.svg)

## Why

Job boards show a title and a snippet; whether the employer is direct or a temp agency, the salary, home office and distance only show up after opening each posting. I wanted to filter on those facts, notice vanished postings, and stop retyping the same cover letter. Everything runs locally; only the LLM call leaves the machine.

## Run

```sh
uv sync
cp .env.example .env                   # set LLM_BASE_URL, LLM_API_KEY, LLM_MODEL
cp profile.yaml.example profile.yaml   # add your own data

uv run jobs fetch --what "Mechatroniker" --where "Frankfurt" --radius 50 --since 14 --no-temp-agency --jobs-only
uv run jobs list --status new
uv run jobs pick 3
uv run jobs generate 3                 # writes out/<company>/index.html and PDF
uv run jobs serve                      # web UI on http://127.0.0.1:8765
```

## Notes

- The PDF export needs a Chromium-based browser installed; Playwright does not download one.
- Sources are the Bundesagentur für Arbeit API and, optionally, Indeed via jobspy. Postings and the CLI output are German.
- The CLI has a `--json` mode for agents; see [docs/agents.md](docs/agents.md).
- Details: [usage](docs/usage.md), [code layout](docs/architecture.md).

## License

See [LICENSE.md](LICENSE.md).
