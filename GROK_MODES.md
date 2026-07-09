# Grok Mode (Single Clean Mode + Global Firecrawl)

This repository contains **one single Grok agent mode**, directly modeled on the official `@amp/glm-52-mode`, plus a global Firecrawl hook.

## The Mode

| Mode | Model | Reasoning | Description |
|------|-------|-----------|-------------|
| `grok` | `xai/grok-build-0.1` | `medium` | Single clean Grok mode |

## Firecrawl (Global Hook)

This plugin registers a global `tool.call` listener that intercepts:

- `web_search` → Firecrawl search (with optional scrape)
- `read_web_page` → Firecrawl scrape

This affects **every** agent in Amp, not just `--mode grok`.

Additional tools are also registered (visible to agents that list them):

- `firecrawl_map`
- `firecrawl_crawl`
- `firecrawl_agent`
- `firecrawl_browser`

## Usage

```bash
amp --mode grok
```

Override effort if needed:

```bash
amp --mode grok --effort low
amp --mode grok --effort high
```

## Installation

### System-wide

```bash
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/grok-mode.ts \
  -o ~/.config/amp/plugins/grok-mode.ts
```

Then reload plugins.

### Project-scoped

```bash
mkdir -p .amp/plugins
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/grok-mode.ts \
  -o .amp/plugins/grok-mode.ts
git add .amp/plugins/grok-mode.ts
```

## Cleanup (Recommended)

If you previously had many Grok variants, remove all of them:

```bash
rm -f ~/.config/amp/plugins/grok-*.ts ~/.config/amp/plugins/grok*.ts 2>/dev/null || true
amp plugins reload
```

Keep only:

- `glm-52-mode.ts` (official)
- `grok-mode.ts` (this version)

## License

MIT
