# Grok Modes + Global Firecrawl Hook

This repository contains **two Grok plugins** + one global hook:

| File               | Purpose |
|--------------------|---------|
| `grok-mode.ts`     | Thorough Grok mode (`grok`) — senior-engineer behavior |
| `grok-rush.ts`     | Crisp low-latency Grok mode (`grok-rush`) — faithful adaptation of official rush-classic |
| `firecrawl-hook.ts`| Global transparent Firecrawl hook (affects **entire Amp**, including both modes) |

## The Two Modes (your dial inside Grok family)

| Mode        | Model            | Reasoning | Style                          | When to use |
|-------------|------------------|-----------|--------------------------------|-------------|
| `grok`      | `xai/grok-4.5`   | `medium`  | Thorough / enhanced            | Ambiguous tasks, research, careful changes, UI craft, when you want senior-engineer thoroughness |
| `grok-rush` | `xai/grok-build-0.1` | `none` | Super crisp, minimal loops     | Small well-defined edits, quick questions, low latency, "just do the smallest correct thing" |

Both still benefit from the global Firecrawl hook.

## Why two Grok modes?

The main `grok` prompt is intentionally **enhanced/thorough** (it has `frame_the_task`, `plan_before_acting`, `codebase_discovery`, full `frontend_taste`, etc.). That's why it sometimes reads many files and makes many tool calls.

`grok-rush` follows the official rush-classic principles almost verbatim:
- One focused discovery loop
- Stop as soon as you can name the files/symbols + narrow check
- Narrowest useful verification
- Smallest correct diff, no unrelated work
- Terse communication

This gives you the control you asked for while staying 100% inside Grok models.

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
amp --mode grok          # thorough (4.5 + medium)
amp --mode grok-rush     # crisp (build-0.1 + none)
```

You can still override effort on either:

```bash
amp --mode grok --effort low
amp --mode grok-rush --effort low   # (usually not needed)
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
