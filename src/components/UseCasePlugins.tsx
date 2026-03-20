import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Puzzle, Copy, Check, Download, Star, Heart, Trash2 } from 'lucide-react'

const COUNTER_API = 'https://arqondb-counter.albericliu8.workers.dev'

type Platform = 'macOS / Linux' | 'Windows'

const BASE = 'https://github.com/AlbericByte/ArqonDB/releases/download/plugin-v0.1.0'

const installCmds: Record<Platform, string> = {
  'macOS / Linux': `curl -sL ${BASE}/install.sh | bash`,
  'Windows': `irm ${BASE}/install.ps1 | iex`,
}

const uninstallCmds: Record<Platform, string> = {
  'macOS / Linux': `curl -sL ${BASE}/uninstall.sh | bash`,
  'Windows': `irm ${BASE}/uninstall.ps1 | iex`,
}

const plugins = [
  { name: 'Copilot', icon: '✈', desc: 'GitHub Copilot augmented with ArqonDB memory layer for project-aware suggestions.' },
  { name: 'Cursor', icon: '🖱', desc: 'AI-first code editor with ArqonDB-backed long-term memory for cross-session context recall.' },
  { name: 'Claude Code', icon: '🤖', desc: "Anthropic's CLI coding assistant with persistent memory powered by ArqonDB vector + graph storage." },
  { name: 'Cline', icon: '⚡', desc: 'Autonomous coding agent with ArqonDB-powered memory for persistent task context.' },
  { name: 'Windsurf', icon: '🌊', desc: "Codeium's AI IDE enhanced with ArqonDB semantic memory for smarter code completions." },
  { name: 'Codex', icon: '📦', desc: "OpenAI's Codex CLI with ArqonDB memory integration for cross-session knowledge retention." },
]

const platforms: Platform[] = ['macOS / Linux', 'Windows']

const tools = [
  { name: 'add', desc: 'Store a new memory with automatic embedding and graph linking' },
  { name: 'search', desc: 'Semantic search across all stored memories' },
  { name: 'delete', desc: 'Remove a memory by ID' },
  { name: 'list', desc: 'List all stored memories with metadata' },
  { name: 'history', desc: 'View temporal history of a memory\'s changes' },
  { name: 'related', desc: 'Find related memories via graph traversal' },
  { name: 'resolve', desc: 'Detect and resolve conflicting memories' },
]

function CopyButton({ text, onCopy }: { text: string; onCopy?: () => void }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        onCopy?.()
        setTimeout(() => setCopied(false), 2000)
      }}
      className="flex items-center gap-1 text-[10px] text-[#86868b] hover:text-white transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-[#28c840]" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function SponsorPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm mx-4 text-center" onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-4">😭</div>
        <h3 className="text-lg font-semibold text-text mb-2">We're too popular!</h3>
        <p className="text-sm text-text-muted leading-relaxed mb-5">
          Our free counter quota ran out today because so many people are installing the plugin. Consider sponsoring us so we can keep the lights on!
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="https://github.com/sponsors/AlbericByte"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Sponsor on GitHub
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-surface-light text-text-muted text-sm font-medium hover:text-text transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}

export default function UseCasePlugins() {
  const [platform, setPlatform] = useState<Platform>('macOS / Linux')
  const [copyCount, setCopyCount] = useState<number | null>(null)
  const [showSponsor, setShowSponsor] = useState(false)

  useEffect(() => {
    fetch(COUNTER_API)
      .then(r => { if (r.status === 402) return null; return r.json() })
      .then(d => { if (d) setCopyCount(d.count) })
      .catch(() => {})
  }, [])

  function handleCopy() {
    fetch(COUNTER_API, { method: 'POST' })
      .then(r => {
        if (r.status === 402) { setShowSponsor(true); return null }
        return r.json()
      })
      .then(d => { if (d) setCopyCount(d.count) })
      .catch(() => setCopyCount(prev => (prev ?? 0) + 1))
  }

  return (
    <section className="pt-8 pb-24 md:pt-10 md:pb-32 bg-white">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Puzzle className="w-4 h-4 text-primary" />
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">Use Case</p>
            {copyCount !== null && (
              <span className="flex items-center gap-1 ml-3 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Download className="w-3.5 h-3.5" />
                {copyCount.toLocaleString()} installs
              </span>
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-text leading-tight tracking-[-0.025em] mb-4">
            AI Coding Assistant
            <br />Memory Plugins.
          </h2>
          <p className="text-text-muted text-lg max-w-[560px] mx-auto leading-relaxed">
            Install ArqonDB memory plugins for your favorite AI coding assistants.
            Give your AI persistent, semantic memory powered by vector search and temporal graph storage.
          </p>
        </motion.div>

        {/* Privacy callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-[640px] mx-auto mb-12 rounded-2xl border border-accent/20 bg-accent/5 px-6 py-5"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">🔒</span>
            <div>
              <h3 className="text-sm font-semibold text-text mb-1">100% Local &amp; Private</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                The entire ArqonDB database runs on your local disk. All memories, embeddings, and graph data stay on your machine — nothing is sent to external servers. Zero network calls, zero telemetry, complete privacy by design.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Overview badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-3 flex-wrap mb-10"
        >
          {['7 MCP Tools', 'Vector + Graph Storage', 'Local & Private', 'Cross-Platform'].map((badge, i) => (
            <span key={badge} className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              i === 0 ? 'bg-primary/10 text-primary' :
              i === 1 ? 'bg-purple/10 text-purple' :
              i === 2 ? 'bg-accent/10 text-accent' :
              'bg-warning/10 text-warning'
            }`}>
              {badge}
            </span>
          ))}
        </motion.div>

        {/* One-line install */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-[720px] mx-auto mb-6"
        >
          <h3 className="text-base font-semibold text-text text-center mb-4">
            One command — auto-detects and configures all installed agents
          </h3>
          <div className="flex items-center justify-center gap-1 mb-4">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  platform === p
                    ? 'bg-surface-dark text-white'
                    : 'bg-surface-light text-text-muted hover:text-text'
                }`}
              >
                {p === 'macOS / Linux' ? '🍎 🐧  macOS / Linux' : '🪟  Windows (PowerShell)'}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-surface-dark overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[#2a2a2c]">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
              </div>
              <CopyButton text={installCmds[platform]} onCopy={handleCopy} />
            </div>
            <pre className="px-4 py-3 text-[13px] font-mono text-[#e5e5ea] leading-relaxed overflow-x-auto">
              <code>
                <span className="text-[#86868b]">{platform === 'macOS / Linux' ? '$ ' : '> '}</span>
                {installCmds[platform]}
              </code>
            </pre>
          </div>
          <p className="text-xs text-text-light text-center mt-3">
            ~120MB self-contained package. Supports 50+ languages. No additional API keys required.
          </p>

          {/* Uninstall */}
          <details className="mt-4 group">
            <summary className="flex items-center justify-center gap-1.5 text-xs text-text-light cursor-pointer hover:text-text-muted transition-colors">
              <Trash2 className="w-3 h-3" />
              Uninstall
            </summary>
            <div className="mt-3 rounded-xl bg-surface-dark overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[#2a2a2c]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                </div>
                <CopyButton text={uninstallCmds[platform]} />
              </div>
              <pre className="px-4 py-3 text-[13px] font-mono text-[#e5e5ea] leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-[#86868b]">{platform === 'macOS / Linux' ? '$ ' : '> '}</span>
                  {uninstallCmds[platform]}
                </code>
              </pre>
            </div>
          </details>

          {/* GitHub Star & Sponsor */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <a
              href="https://github.com/AlbericByte/ArqonDB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-light text-sm font-medium text-text hover:border-warning/50 hover:text-warning transition-colors"
            >
              <Star className="w-4 h-4" />
              Star on GitHub
            </a>
            <a
              href="https://github.com/sponsors/AlbericByte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-light text-sm font-medium text-text hover:border-[#db61a2]/50 hover:text-[#db61a2] transition-colors"
            >
              <Heart className="w-4 h-4" />
              Sponsor
            </a>
          </div>
        </motion.div>

        {/* Supported agents grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {plugins.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl border border-border-light bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-lg">{p.icon}</span>
                <h3 className="text-sm font-semibold text-text">{p.name}</h3>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* MCP Tools Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border-light bg-white overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border-light">
            <h3 className="text-base font-semibold text-text">MCP Tools Reference</h3>
          </div>
          <div className="divide-y divide-border-light">
            {tools.map(t => (
              <div key={t.name} className="px-6 py-3 flex items-start gap-4">
                <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                  {t.name}
                </span>
                <span className="text-sm text-text-muted">{t.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Usage Examples — Claude Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-text tracking-[-0.02em] mb-3">
              See It in Action — Claude Code
            </h3>
            <p className="text-sm text-text-muted max-w-[520px] mx-auto leading-relaxed">
              Real workflows showing how Vector Search, Causal Graph, and Temporal Graph work together to give your AI assistant deep project understanding.
            </p>
          </div>

          <div className="space-y-6">
            {/* Example 1: Vector Search */}
            <div className="rounded-2xl border border-border-light bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-border-light flex items-center gap-3">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">Vector Search</span>
                <h4 className="text-sm font-semibold text-text">Semantic recall across sessions</h4>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-sm text-text-muted leading-relaxed">
                  Just tell Claude Code to remember something — it automatically stores the decision in ArqonDB. Weeks later, ask about it in completely different words and vector search finds it.
                </p>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 1 — Store</span>
                    <span className="text-xs text-text-light">You talk, Claude Code remembers</span>
                  </div>
                  <div className="rounded-xl bg-surface-dark overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto text-[10px] text-[#86868b]">week 1 — session A</span>
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto"><code>{`> "Remember: we switched from JWT refresh to rotating
   opaque tokens after the Feb outage"

✓ Saved to ArqonDB (auto-embedded, indexed in HNSW)

> "Also remember the auth middleware uses exponential
   backoff with jitter, max 3 retries"

✓ Saved to ArqonDB

> "Remember we decided against silent refresh — user
   must re-auth after 24h for compliance reasons"

✓ Saved to ArqonDB`}</code></pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 2 — Search</span>
                    <span className="text-xs text-text-light">Weeks later, different words, still finds them</span>
                  </div>
                  <div className="rounded-xl bg-surface-dark overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto text-[10px] text-[#86868b]">week 4 — session B</span>
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto"><code>{`> "How did we handle token refresh last time?"

# You said "token refresh" — you stored "opaque tokens"
# Different words, but ArqonDB vector search finds them:

┌─────────────────────────────────────────────────────┐
│ 0.94  "Switched from JWT refresh to rotating        │
│        opaque tokens after the Feb outage"          │
│ 0.91  "Auth middleware uses exponential backoff     │
│        with jitter, max 3 retries"                  │
│ 0.87  "Decided against silent refresh — user        │
│        must re-auth after 24h for compliance"       │
└─────────────────────────────────────────────────────┘

Claude: "Based on our past decisions, we use rotating
opaque tokens (not JWT) with exponential backoff and
max 3 retries. Users must re-auth after 24h per
compliance — no silent refresh."`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: Causal Graph */}
            <div className="rounded-2xl border border-border-light bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-border-light flex items-center gap-3">
                <span className="text-xs font-medium text-purple bg-purple/10 px-2.5 py-1 rounded-full">Causal Graph</span>
                <h4 className="text-sm font-semibold text-text">Trace why a decision was made</h4>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-sm text-text-muted leading-relaxed">
                  As you make decisions, tell Claude Code the reasoning. It links memories with causal edges automatically. Later, anyone can ask "why" and get the full chain.
                </p>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 1 — Store</span>
                    <span className="text-xs text-text-light">Decisions with context, stored over multiple sessions</span>
                  </div>
                  <div className="rounded-xl bg-surface-dark overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto text-[10px] text-[#86868b]">over multiple sessions</span>
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto"><code>{`# Session 1: After running benchmarks
> "Remember: cache benchmark showed Postgres 12ms p99,
   SQLite was under 1ms for our 50K key dataset"

✓ Saved to ArqonDB

# Session 2: Making the design decision
> "Remember: we chose SQLite over Postgres for the cache
   layer — single-binary deployment was the goal.
   This was because of the benchmark results last week."

✓ Saved to ArqonDB (linked to benchmark memory)

# Session 3: Removing old infra
> "Remember: we removed Redis dependency. SQLite cache
   handles our read pattern with zero extra infra.
   This follows from the SQLite decision."

✓ Saved to ArqonDB (linked to SQLite decision)`}</code></pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-purple bg-purple/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 2 — Traverse</span>
                    <span className="text-xs text-text-light">New team member asks "why SQLite?"</span>
                  </div>
                  <div className="rounded-xl bg-surface-dark overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto text-[10px] text-[#86868b]">new team member's session</span>
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto"><code>{`> "Why did we pick SQLite for the cache layer?"

# Claude Code traverses ArqonDB causal graph upstream:

  [benchmark-results]
      │ informed_by
      ▼
  [cache-design-decision]      ← "Postgres 12ms p99,
      │ caused_by                  SQLite <1ms. Chose
      ▼                            single-binary deploy"
  [redis-removal]
      │ supersedes
      ▼
  [old: redis-cache]           ← "Removed Redis to cut
                                   infra complexity"

Claude: "We chose SQLite because benchmarks showed it
was 12x faster than Postgres for our cache workload
(sub-1ms vs 12ms p99). The team also wanted single-binary
deployment, so we removed the Redis dependency entirely."`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 3: Temporal Graph */}
            <div className="rounded-2xl border border-border-light bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-border-light flex items-center gap-3">
                <span className="text-xs font-medium text-warning bg-warning/10 px-2.5 py-1 rounded-full">Temporal Graph</span>
                <h4 className="text-sm font-semibold text-text">See how architecture evolved over time</h4>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-sm text-text-muted leading-relaxed">
                  When you update a past decision, just tell Claude Code. ArqonDB keeps every version with timestamps — nothing is lost, even reverted experiments.
                </p>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 1 — Store</span>
                    <span className="text-xs text-text-light">Same topic updated over months — each version preserved</span>
                  </div>
                  <div className="rounded-xl bg-surface-dark overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto text-[10px] text-[#86868b]">Jan → Mar, across sessions</span>
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto"><code>{`# Jan 12
> "Remember: payment API design is REST + sync,
   simple POST /charge endpoint"

✓ Saved to ArqonDB

# Feb 3
> "Update payment API design: we added webhook
   callbacks because Stripe needs async confirmation"

✓ Updated in ArqonDB (v1 preserved, v2 created)

# Feb 28
> "Update payment API design: we tried event-driven
   rewrite but it FAILED — 40% more p99 latency,
   reverting back"

✓ Updated in ArqonDB (v3 created, marked as reverted)

# Mar 15
> "Update payment API design: final approach is
   REST + async queue via SQS. Simple API surface
   with background processing"

✓ Updated in ArqonDB (v4 created, current)`}</code></pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 2 — Time Travel</span>
                    <span className="text-xs text-text-light">Query the full evolution timeline</span>
                  </div>
                  <div className="rounded-xl bg-surface-dark overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto text-[10px] text-[#86868b]">refactoring session</span>
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto"><code>{`> "Show me how the payment API design changed"

# ArqonDB returns all temporal versions:

  v1  Jan 12  REST + sync processing
      │       "Simple POST /charge endpoint"
      ▼
  v2  Feb 03  Added webhook callbacks
      │       "Stripe needed async confirmation"
      ▼
  v3  Feb 28  Event-driven rewrite ✗ REVERTED
      │       "Too complex, 40% more p99 latency"
      ▼
  v4  Mar 15  REST + async queue (current) ✓
              "Best of both: simple API surface,
               background processing via SQS"

Claude: "The payment API went through 4 iterations.
We tried event-driven in v3 but reverted it due to
40% latency increase. Don't go down that path again.
Current design (REST + SQS) is the sweet spot."`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 4: Hyper Search — all three combined */}
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.02] overflow-hidden">
              <div className="px-6 py-4 border-b border-primary/10 flex items-center gap-3">
                <span className="text-xs font-medium text-white bg-gradient-to-r from-primary to-purple px-2.5 py-1 rounded-full">Hyper Search</span>
                <h4 className="text-sm font-semibold text-text">Vector + Causal + Temporal — combined</h4>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-sm text-text-muted leading-relaxed">
                  The most powerful mode. You just ask a question — Claude Code automatically uses all three engines behind the scenes to give you the full picture.
                </p>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Stored over time</span>
                    <span className="text-xs text-text-light">Incidents, decisions, and updates across weeks</span>
                  </div>
                  <div className="rounded-xl bg-surface-dark overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto text-[10px] text-[#86868b]">Jan — Mar, multiple sessions</span>
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto"><code>{`# Jan 15 — After an incident
> "Remember: we got hit by a bot scraping /api/users
   at 50K req/min. We had no rate limiting."

# Jan 20 — First fix
> "Remember: added nginx rate limiting at 100 req/min
   per IP. This was because of the bot incident."

# Feb 5 — Approach changed
> "Update rate limiting approach: moved from nginx to
   app-level with Redis. Nginx couldn't tell API key
   tiers apart."

# Feb 20 — Load test
> "Remember: load test results show token-bucket adds
   only 0.2ms overhead, handles 10K req/s per node.
   This informed the rate limiting design."

# Mar 1 — Final design
> "Update rate limiting approach: token bucket per API
   key with 3 tiers — free 60/min, pro 600/min,
   enterprise 6K/min."`}</code></pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-white bg-gradient-to-r from-primary to-purple px-2 py-0.5 rounded-full uppercase tracking-wider">Hyper Search</span>
                    <span className="text-xs text-text-light">One question triggers all three engines</span>
                  </div>
                  <div className="rounded-xl bg-surface-dark overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto text-[10px] text-[#86868b]">new feature session</span>
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto"><code>{`> "I need to add rate limiting — what do I need to know?"

# Behind the scenes, Claude Code fires all 3 engines:

# ① Vector Search — finds related memories
   "rate limiting" → 8 matches across all sessions

# ② Causal Graph — traces why they exist
   rate-limit-approach ← caused_by ← bot-abuse-incident
   rate-limit-approach ← informed_by ← load-test-results

# ③ Temporal Graph — shows how it evolved
   v1: nginx, 100/min/IP (Jan 20)
   v2: app-level, Redis (Feb 5)
   v3: token bucket, 3 tiers (Mar 1, current)

Claude: "We already have rate limiting! It was added
after a bot attack in January (50K req/min). We started
with nginx but moved to app-level because we needed
per-API-key tiers. Current design: token bucket with
3 tiers (free/pro/enterprise), only 0.2ms overhead.
The code is in src/middleware/rateLimit.ts — you should
extend the existing TokenBucket class rather than
building something new."`}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {showSponsor && <SponsorPopup onClose={() => setShowSponsor(false)} />}
    </section>
  )
}
