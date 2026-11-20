# Use from an agent

The CLI is built so an agent (for example Claude Code) can review jobs, rate them against `profile.yaml` and pre-sort them without asking back. With `--json`, stdout contains only JSON; messages go to stderr. Exit codes: `0` ok, `1` domain error (unknown ID, invalid score), `2` usage error.

```sh
uv run jobs fetch --what "Frontend" --where "Darmstadt" --json
# {"fetched": 40, "new": 12, "gone": 3}

uv run jobs list --unrated --json          # compact, without description
uv run jobs show 12 15 --json              # full, incl. description_md

uv run jobs rate 12 --score 85 --reason "Stack fits" --tags python,react
uv run jobs rate --stdin --json <<'EOT'
{"id": 12, "score": 85, "reason": "Stack fits", "tags": ["python", "react"]}
{"id": 15, "score": 20, "reason": "Temp agency, no remote"}
EOT
# {"rated": 2}

uv run jobs list --min-score 70 --sort score --json
uv run jobs pick 12 --json                 # {"status": "selected", "ids": [12]}
uv run jobs reject 15 17 18
```

`list` filters: `--status`, `--query`, `--location`, `--unrated`, `--min-score`, `--include-gone`, `--sort id|fresh|distance|score`, `--limit`. `rate --stdin` validates all lines before writing; if one is invalid, nothing is stored. For Arbeitsagentur jobs with a short description, `show` can fetch the full text (network access).
