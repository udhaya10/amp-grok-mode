// @amp-plugin updated automatically from https://raw.githubusercontent.com/udhaya10/amp-grok-mode/main/firecrawl-hook.ts

import type { PluginAPI } from '@ampcode/plugin'

export default function(amp: PluginAPI) {
	if (!amp.experimental) {
		amp.logger.log('Experimental plugin API is not available.')
		return
	}

	// =====================================================
	// Global Firecrawl hook — affects the entire Amp instance
	// =====================================================
	// Intercepts 'web_search' and 'read_web_page' for EVERY agent, mode, and subagent.
	// Uses 'synthesize' so the original tools are never executed.
	// The model has no idea Firecrawl is involved.

	amp.on('tool.call', async (event, ctx) => {
		if (event.tool === 'web_search') {
			const { query, limit = 10, scrape = false } = event.input as any
			const args: string[] = ['search', String(query), '--limit', String(limit)]
			if (scrape) {
				args.push('--scrape', '--scrape-formats', 'markdown', '--only-main-content')
			}
			try {
				const res = await ctx.$`firecrawl ${args}`
				return {
					action: 'synthesize',
					result: { output: res.stdout || res.stderr || 'No search results' }
				}
			} catch (e: any) {
				return {
					action: 'synthesize',
					result: { output: `Firecrawl web_search error: ${e?.message || e}` }
				}
			}
		}

		if (event.tool === 'read_web_page') {
			const { url, format = 'markdown', onlyMainContent = true } = event.input as any
			const args: string[] = ['scrape', String(url), '--format', format]
			if (onlyMainContent && format === 'markdown') {
				args.push('--only-main-content')
			}
			try {
				const res = await ctx.$`firecrawl ${args}`
				return {
					action: 'synthesize',
					result: { output: res.stdout || res.stderr || 'No content' }
				}
			} catch (e: any) {
				return {
					action: 'synthesize',
					result: { output: `Firecrawl read_web_page error: ${e?.message || e}` }
				}
			}
		}

		// Let everything else (including our extra firecrawl_* tools) run normally
		return { action: 'allow' }
	})

	// --- ADDITIONS (extra Firecrawl power, registered as new tools) ---

	amp.registerTool({
		name: 'firecrawl_map',
		description: 'Map a website: discover all (or filtered) URLs on a domain without scraping content.',
		inputSchema: {
			type: 'object',
			properties: {
				url: { type: 'string' },
				limit: { type: 'number', description: 'Max URLs to return' },
				search: { type: 'string', description: 'Optional search query to filter URLs' },
				includeSubdomains: { type: 'boolean' },
			},
			required: ['url'],
		},
		async execute(input) {
			const { url, limit = 100, search, includeSubdomains } = input as any
			const args = ['map', url, '--limit', String(limit)]
			if (search) args.push('--search', search)
			if (includeSubdomains) args.push('--include-subdomains')
			const res = await amp.$`firecrawl ${args}`
			return res.stdout || res.stderr || 'No URLs found'
		},
	})

	amp.registerTool({
		name: 'firecrawl_crawl',
		description: 'Crawl an entire site (or section) and extract content from many pages.',
		inputSchema: {
			type: 'object',
			properties: {
				url: { type: 'string' },
				limit: { type: 'number', description: 'Max pages to crawl' },
				maxDepth: { type: 'number' },
				includePaths: { type: 'string', description: 'Comma-separated paths to include (e.g. /docs,/blog)' },
				excludePaths: { type: 'string' },
				wait: { type: 'boolean', description: 'Wait for crawl to finish before returning (can be slow)' },
			},
			required: ['url'],
		},
		async execute(input) {
			const { url, limit = 50, maxDepth, includePaths, excludePaths, wait = false } = input as any
			const args = ['crawl', url, '--limit', String(limit)]
			if (maxDepth) args.push('--max-depth', String(maxDepth))
			if (includePaths) args.push('--include-paths', includePaths)
			if (excludePaths) args.push('--exclude-paths', excludePaths)
			if (wait) args.push('--wait')
			const res = await amp.$`firecrawl ${args}`
			return res.stdout || res.stderr || 'Crawl started or completed'
		},
	})

	amp.registerTool({
		name: 'firecrawl_agent',
		description: 'Firecrawl autonomous agent: describe what data you want and it finds + extracts it across the web.',
		inputSchema: {
			type: 'object',
			properties: {
				prompt: { type: 'string', description: 'Natural language description of the data to extract' },
				urls: { type: 'string', description: 'Optional comma-separated URLs to focus on' },
				wait: { type: 'boolean', description: 'Wait for the agent job to complete' },
				maxCredits: { type: 'number' },
			},
			required: ['prompt'],
		},
		async execute(input) {
			const { prompt, urls, wait = true, maxCredits } = input as any
			const args = ['agent', prompt]
			if (urls) args.push('--urls', urls)
			if (wait) args.push('--wait')
			if (maxCredits) args.push('--max-credits', String(maxCredits))
			const res = await amp.$`firecrawl ${args}`
			return res.stdout || res.stderr || 'Agent job started'
		},
	})

	amp.registerTool({
		name: 'firecrawl_browser',
		description: 'Launch a cloud browser session (Playwright) and execute code or natural instructions on live pages.',
		inputSchema: {
			type: 'object',
			properties: {
				codeOrPrompt: { type: 'string', description: 'Playwright code (python/js) or natural language instruction' },
				url: { type: 'string', description: 'Optional URL to open first' },
				profile: { type: 'string', description: 'Optional saved profile name for persistence (login state etc.)' },
			},
			required: ['codeOrPrompt'],
		},
		async execute(input) {
			const { codeOrPrompt, url, profile } = input as any
			const args = ['browser', codeOrPrompt]
			if (url) args.push('--url', url) // some versions support it via shorthand
			if (profile) args.push('--profile', profile)
			const res = await amp.$`firecrawl ${args}`
			return res.stdout || res.stderr || 'Browser action completed'
		},
	})
}
