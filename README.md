# amp-grok-mode

Single clean Grok agent mode for Amp, modeled directly on the official `@amp/glm-52-mode`.

## What changed

- Removed all the different "speed/quality" profiles (`grok-quick`, `grok-standard`, `grok-careful`, etc.)
- Now there is **one single mode** only: `grok`
- The prompt, tool list, structure, and code style are copied from the official GLM 5.2 plugin
- Default reasoning effort set to `medium`
- **Global Firecrawl hook**: `web_search` and `read_web_page` are transparently replaced with Firecrawl for the entire Amp instance (not just this mode)
- Extra Firecrawl tools added: `firecrawl_map`, `firecrawl_crawl`, `firecrawl_agent`, `firecrawl_browser`

## Install / Update

```bash
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/grok-mode.ts \
  -o ~/.config/amp/plugins/grok-mode.ts
```

Then reload plugins (command palette → `plugins: reload`).

## Usage

```bash
amp --mode grok
```

You can still override effort:

```bash
amp --mode grok --effort low
amp --mode grok --effort high
```

## Firecrawl Integration (Global)

This plugin installs a **global** `tool.call` hook. This means:

- `web_search` and `read_web_page` are replaced with Firecrawl **everywhere** in Amp (Grok mode, GLM, built-in modes, subagents).
- The agent never sees the original tools.
- Additional tools are also available:
  - `firecrawl_map`
  - `firecrawl_crawl`
  - `firecrawl_agent`
  - `firecrawl_browser`

Requires the `firecrawl` CLI to be installed and authenticated (`firecrawl --status`).

## Cleanup old junk

If you have many old Grok plugins, clean them up:

```bash
rm -f ~/.config/amp/plugins/grok-*.ts ~/.config/amp/plugins/grok*.ts 2>/dev/null || true
amp plugins reload
```

## Verify

```bash
amp plugins list
```

You should see only the official GLM one + this single `grok-mode.ts`.

## License

MIT
