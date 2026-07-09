# amp-grok-mode

Single clean Grok agent mode for Amp, modeled directly on the official `@amp/glm-52-mode`.

Also provides a **separate global Firecrawl hook** that transparently replaces Amp's built-in web tools everywhere.

## Two plugins in this repo

| File               | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `grok-mode.ts`     | Defines the single `grok` agent mode (clean prompt + tool list)         |
| `firecrawl-hook.ts`| Global `tool.call` hook + extra Firecrawl tools (affects **entire Amp**) |

**Important**: `firecrawl-hook.ts` is global. Install it to get Firecrawl for Grok, GLM, built-in modes, subagents, and everything else. The model has no idea it is using Firecrawl.

## What changed (Grok mode)

- Removed all the different "speed/quality" profiles (`grok-quick`, `grok-standard`, `grok-careful`, etc.)
- Now there is **one single mode** only: `grok`
- The prompt, tool list, structure, and code style are copied from the official GLM 5.2 plugin
- Default reasoning effort set to `medium`

## Install / Update

### Grok mode only

```bash
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/grok-mode.ts \
  -o ~/.config/amp/plugins/grok-mode.ts
```

### Global Firecrawl hook (recommended — affects everything)

```bash
curl -fsSL https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/firecrawl-hook.ts \
  -o ~/.config/amp/plugins/firecrawl-hook.ts
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

## Firecrawl Integration (Global & Transparent)

`firecrawl-hook.ts` uses a global `amp.on('tool.call', ...)` listener with `synthesize`:

- `web_search` → Firecrawl `search` (with optional `--scrape`)
- `read_web_page` → Firecrawl `scrape`

This is a **drop-in transparent override**:
- Works for every agent/mode/subagent
- Original tools are never executed
- No extra tools or names visible to the model

Extra (additive) tools are also registered and can be used explicitly:

- `firecrawl_map`
- `firecrawl_crawl`
- `firecrawl_agent`
- `firecrawl_browser`

Requires the `firecrawl` CLI to be installed and authenticated:

```bash
firecrawl --status
```

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

You should see the official GLM one + `grok-mode.ts` (and optionally `firecrawl-hook.ts`).

## License

MIT
