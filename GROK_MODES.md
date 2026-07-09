# Grok Mode + Global Firecrawl Hook

This repository contains **two separate plugins**:

| File               | Purpose |
|--------------------|---------|
| `grok-mode.ts`     | Single clean Grok agent mode (modeled on official `@amp/glm-52-mode`) |
| `firecrawl-hook.ts`| Global transparent Firecrawl hook (affects **entire Amp**) |

## The Mode

| Mode | Model | Reasoning | Description |
|------|-------|-----------|-------------|
| `grok` | `xai/grok-build-0.1` | `medium` | Single clean Grok mode |

## Firecrawl (Global Transparent Hook)

`firecrawl-hook.ts` uses `amp.on('tool.call', ...)` + `synthesize` so the replacement is invisible:

- `web_search` → Firecrawl `search` (optionally with scrape)
- `read_web_page` → Firecrawl `scrape`

This is a **drop-in global override**:
- Works for Grok, GLM, built-in modes, **and all subagents**
- Original Amp web tools never run
- The model has no idea it is using Firecrawl

Extra additive tools (use explicitly when needed):

- `firecrawl_map`
- `firecrawl_crawl`
- `firecrawl_agent`
- `firecrawl_browser`

Requires the `firecrawl` CLI installed and authenticated (`firecrawl --status`).

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

### Both plugins (recommended)

```bash
# Grok mode
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/grok-mode.ts \
  -o ~/.config/amp/plugins/grok-mode.ts

# Global Firecrawl hook (affects everything)
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/firecrawl-hook.ts \
  -o ~/.config/amp/plugins/firecrawl-hook.ts

amp plugins reload
```

### Grok mode only (no Firecrawl replacement)

Just install `grok-mode.ts` above.

### Project-scoped

```bash
mkdir -p .amp/plugins
curl -fsSL .../grok-mode.ts -o .amp/plugins/grok-mode.ts
curl -fsSL .../firecrawl-hook.ts -o .amp/plugins/firecrawl-hook.ts
git add .amp/plugins/*.ts
```

## Cleanup (Recommended)

```bash
rm -f ~/.config/amp/plugins/grok-*.ts ~/.config/amp/plugins/grok*.ts 2>/dev/null || true
amp plugins reload
```

Keep only the official GLM + the two files from this repo.

## License

MIT
