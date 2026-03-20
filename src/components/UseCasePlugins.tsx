import { useState } from 'react'
import { motion } from 'framer-motion'
import { Puzzle } from 'lucide-react'

type Platform = 'macOS / Linux' | 'Windows'

const BASE = 'https://github.com/AlbericByte/ArqonDB/releases/download/plugin-v0.2.0'

const plugins = [
  {
    name: 'Claude Code',
    icon: '🤖',
    desc: "Anthropic's CLI coding assistant with persistent memory powered by ArqonDB vector + graph storage.",
    cmds: {
      'macOS / Linux': `curl -sL ${BASE}/install-claude-code.sh | bash`,
      'Windows': `irm ${BASE}/install-claude-code.ps1 | iex`,
    },
  },
  {
    name: 'Cursor',
    icon: '🖱',
    desc: 'AI-first code editor with ArqonDB-backed long-term memory for cross-session context recall.',
    cmds: {
      'macOS / Linux': `curl -sL ${BASE}/install-cursor.sh | bash`,
      'Windows': `irm ${BASE}/install-cursor.ps1 | iex`,
    },
  },
  {
    name: 'Windsurf',
    icon: '🌊',
    desc: "Codeium's AI IDE enhanced with ArqonDB semantic memory for smarter code completions.",
    cmds: {
      'macOS / Linux': `curl -sL ${BASE}/install-windsurf.sh | bash`,
      'Windows': `irm ${BASE}/install-windsurf.ps1 | iex`,
    },
  },
  {
    name: 'Copilot',
    icon: '✈',
    desc: 'GitHub Copilot augmented with ArqonDB memory layer for project-aware suggestions.',
    cmds: {
      'macOS / Linux': `curl -sL ${BASE}/install-copilot.sh | bash`,
      'Windows': `irm ${BASE}/install-copilot.ps1 | iex`,
    },
  },
  {
    name: 'Cline',
    icon: '⚡',
    desc: 'Autonomous coding agent with ArqonDB-powered memory for persistent task context.',
    cmds: {
      'macOS / Linux': `curl -sL ${BASE}/install-cline.sh | bash`,
      'Windows': `irm ${BASE}/install-cline.ps1 | iex`,
    },
  },
  {
    name: 'Codex',
    icon: '📦',
    desc: "OpenAI's Codex CLI with ArqonDB memory integration for cross-session knowledge retention.",
    cmds: {
      'macOS / Linux': `curl -sL ${BASE}/install-codex.sh | bash`,
      'Windows': `irm ${BASE}/install-codex.ps1 | iex`,
    },
  },
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

export default function UseCasePlugins() {
  const [platform, setPlatform] = useState<Platform>('macOS / Linux')

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

        {/* Platform switcher */}
        <div className="flex items-center justify-center gap-1 mb-10">
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

        {/* Plugin cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {plugins.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border-light bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{p.icon}</span>
                  <h3 className="text-base font-semibold text-text">{p.name}</h3>
                </div>
                <span className="text-[10px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  Available
                </span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-4">{p.desc}</p>
              <div className="rounded-xl bg-surface-dark overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-[#2a2a2c]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[10px] text-[#86868b]">
                    {platform === 'macOS / Linux' ? 'bash' : 'powershell'}
                  </span>
                </div>
                <pre className="px-4 py-3 text-[11px] font-mono text-[#e5e5ea] leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-[#86868b]">{platform === 'macOS / Linux' ? '$ ' : '> '}</span>
                    {p.cmds[platform]}
                  </code>
                </pre>
              </div>
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
      </div>
    </section>
  )
}
