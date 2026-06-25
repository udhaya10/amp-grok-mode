# amp-grok-mode

An [Amp](https://ampcode.com) agent-mode plugin that runs the coding agent as **xAI Grok Build 0.1** (`xai/grok-build-0.1`). Modeled on the official `@amp/glm-52-mode` plugin.

## Install

> ⚠️ **Heads-up on distribution:** as of the current Amp build, `amp plugins add` is restricted to `https://ampcode.com/@amp/plugins/*.ts` URLs only — i.e. plugins the Amp team hosts themselves. Third-party plugins like this one can't be installed with a one-liner yet. Use the manual install below. If Amp opens up third-party URLs in future, the `@amp-plugin` header in this file is already set so it'll "just work" with `amp plugins add --auto-update <url>`.

### Manual install (system-wide, all your projects)

```bash
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/grok-mode.ts \
  -o ~/.config/amp/plugins/grok-mode.ts
```

Then reload plugins: open the Amp command palette (`Ctrl+O`) → `plugins: reload`, or restart Amp.

### Project-scoped install (shared with your team via git)

Copy `grok-mode.ts` into your repo at `.amp/plugins/grok-mode.ts` and commit it. Anyone who clones the repo gets the plugin automatically — Amp loads every `.ts` file under `.amp/plugins/` on startup. No install step needed on their side.

```bash
mkdir -p .amp/plugins
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/grok-mode.ts \
  -o .amp/plugins/grok-mode.ts
git add .amp/plugins/grok-mode.ts
```

### Update

Re-run the `curl` command above (manual installs don't auto-update). For project-scoped installs, `git pull` updates it.

## Prerequisites

1. **Amp CLI** — install from <https://ampcode.com> if you don't have it.
2. **A SuperGrok or X Premium+ subscription** linked to Amp. Run `amp login` on the web and connect your xAI / X account. A subscription grants access to Grok Build; a separate pay-as-you-go xAI API key is **not** required.

> A SuperGrok subscription does not grant xAI API credit, but this plugin authenticates via Grok Build's subscription path (the same path Grok Build itself uses), so your subscription covers it.

## What it does

- Registers an Amp agent mode keyed `grok` (label `Grok (exp)`).
- Routes the agent to `xai/grok-build-0.1` via Amp's experimental agent API.
- Ships a senior-engineer system prompt (operating principles, planning, codebase discovery, tool use, implementation style, frontend taste, verification, communication) — the same high-quality prompt used by the official GLM 5.2 mode.
- Enables the standard Amp tool set: `Read`, `Bash`, `edit_file`, `create_file`, `finder`, `web_search`, `read_web_page`, `oracle`, `librarian`, `painter`, `view_media`, and more.
- Reasoning effort is set to `max`.

## Verify it loaded

```bash
amp plugins list
```

You should see:

```
✓ ~/.config/amp/plugins/grok-mode.ts active
  agent: grok
  agent mode: grok
```

Then run a session in Grok mode:

```bash
amp --mode grok
```

## Uninstall

```bash
rm ~/.config/amp/plugins/grok-mode.ts
```

Then reload plugins (command palette → `plugins: reload`) or restart Amp.

## Files

- `grok-mode.ts` — the entire plugin (single file). The first line is an `// @amp-plugin updated automatically from <url>` directive that documents the canonical source and keeps the file compatible with Amp's auto-update mechanism should third-party URLs ever be permitted.

## License

MIT — do whatever you want. "Grok" is a trademark of xAI Corp.; this project is not affiliated with or endorsed by xAI.
