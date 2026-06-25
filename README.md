# amp-grok-mode

An [Amp](https://ampcode.com) agent-mode plugin that runs the coding agent as **xAI Grok Build 0.1** (`xai/grok-build-0.1`). Modeled on the official `@amp/glm-52-mode` plugin.

## Install

```bash
amp update
amp plugins add --auto-update https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/grok-mode.ts
amp --mode grok
```

That's it — the next Amp session you start runs as Grok.

## Prerequisites

1. **Amp CLI** — install from <https://ampcode.com> if you don't have it.
2. **A SuperGrok or X Premium+ subscription** linked to Amp. Run `amp login` on the web and connect your xAI / X account. A subscription grants access to Grok Build; a separate pay-as-you-go xAI API key is **not** required.

> A SuperGrok subscription does not grant xAI API credit, but this plugin uses Grok Build's subscription auth (the same path Grok Build itself uses), so your subscription covers it.

## What it does

- Registers an Amp agent mode keyed `grok` (label `Grok (exp)`).
- Routes the agent to `xai/grok-build-0.1` via Amp's experimental agent API.
- Ships a senior-engineer system prompt (operating principles, planning, codebase discovery, tool use, implementation style, frontend taste, verification, communication) — the same high-quality prompt used by the official GLM 5.2 mode.
- Enables the standard Amp tool set: `Read`, `Bash`, `edit_file`, `create_file`, `finder`, `web_search`, `read_web_page`, `oracle`, `librarian`, `painter`, `view_media`, and more.
- Reasoning effort is set to `max`.

## How auto-update works

The first line of `grok-mode.ts` is an `// @amp-plugin updated automatically from <url>` directive. Because this plugin is installed with `--auto-update`, Amp re-fetches that URL on launch and overwrites the local copy when the remote changes. So `git push` to `main` → everyone installed gets the update.

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

## Uninstall

```bash
rm ~/.config/amp/plugins/grok-mode.ts
```

Then reload plugins (command palette → `plugins: reload`) or restart Amp.

## Files

- `grok-mode.ts` — the entire plugin (single file).

## License

MIT — do whatever you want. "Grok" is a trademark of xAI Corp.; this project is not affiliated with or endorsed by xAI.
