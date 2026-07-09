# amp-grok-mode

Two Grok agent modes for Amp + a global Firecrawl hook.

Gives you a real "dial" inside the Grok family:
- `grok` — thorough / enhanced (like the senior-engineer style)
- `grok-rush` — super crisp, low-latency (faithful adaptation of official rush-classic)

Also provides a **separate global Firecrawl hook** that transparently replaces Amp's built-in web tools everywhere.

## Plugins in this repo

| File               | Purpose |
|--------------------|---------|
| `grok-mode.ts`     | Thorough Grok mode (`grok` — 4.5 + medium) |
| `grok-rush.ts`     | Crisp Grok mode (`grok-rush` — build-0.1 + none, rush principles) |
| `firecrawl-hook.ts`| Global `tool.call` hook + extra Firecrawl tools (affects **entire Amp**, both modes, subagents, etc.) |

**Important**: `firecrawl-hook.ts` is global. Install it to get Firecrawl for Grok, GLM, built-in modes, subagents, and everything else. The model has no idea it is using Firecrawl.

## The two modes (your control)

| Mode        | Model              | Reasoning | Behavior                              | Best for |
|-------------|--------------------|-----------|---------------------------------------|----------|
| `grok`      | `xai/grok-4.5`     | `medium`  | Enhanced / thorough (plans, reads more, careful) | Ambiguous work, research, UI, bigger changes |
| `grok-rush` | `xai/grok-build-0.1` | `none`  | Crisp rush style (one loop, minimal discovery, narrow verify) | Small well-defined edits, quick answers, low latency |

The main `grok` prompt is deliberately **enhanced** (has `frame_the_task`, `plan_before_acting`, `codebase_discovery`, full frontend taste rules, etc.). That's why it can read a lot of files.

`grok-rush` follows official rush-classic rules almost verbatim for the opposite behavior.

You stay 100% on Grok models.

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
amp --mode grok          # thorough (4.5 + medium) — enhanced
amp --mode grok-rush     # crisp (build-0.1 + none) — rush style
```

Override effort on either:

```bash
amp --mode grok --effort low
amp --mode grok-rush --effort low
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
