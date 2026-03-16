import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section aria-label="ArqonDB - Distributed Agent Memory Database" className="relative min-h-screen flex items-center justify-center pt-12 overflow-hidden bg-surface">
      {/* Subtle gradient orbs */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] bg-purple/5 rounded-full blur-[80px]" />

      <div className="relative max-w-[980px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-5xl md:text-[80px] font-semibold text-text leading-[1.05] tracking-[-0.03em] mb-2">
            The Memory Database
          </h1>
          <h1 className="text-5xl md:text-[80px] font-semibold leading-[1.05] tracking-[-0.03em] mb-6">
            <span className="bg-gradient-to-r from-primary via-primary-light to-purple bg-clip-text text-transparent">
              for AI Agents.
            </span>
          </h1>

          <p className="text-lg md:text-[21px] text-text-muted max-w-[600px] mx-auto mb-10 leading-[1.47] font-normal">
            Distributed key-value store with built-in vector search,
            causal graph, temporal graph, and branch-based state management.
            Built in Rust for speed and reliability.
          </p>

          {/* SEO-rich hidden content for crawlers */}
          <div className="sr-only">
            <h2>ArqonDB: Open-Source Distributed Agent Memory Database</h2>
            <p>
              ArqonDB is an open-source distributed key-value database written in Rust,
              purpose-built as a memory database for AI agents and LLM applications.
              It combines an LSM-tree storage engine with HNSW vector similarity search,
              causal reasoning graphs, temporal graphs with time-aware edges,
              agent state forking and branching, Raft distributed consensus,
              Redis RESP2 protocol compatibility, and reactive compare-and-swap state.
              ArqonDB is up to 6.4x faster than RocksDB on writes and provides official SDKs
              for Python, Rust, Go, Java, and C++. Apache 2.0 licensed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/AlbericByte/ArqonDB" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-all">
              View on GitHub
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#features"
              className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
              Learn more
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-20 max-w-[640px] mx-auto"
        >
          <div className="rounded-2xl bg-surface-dark overflow-hidden shadow-2xl shadow-black/10">
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#2a2a2c]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-[#98989d] font-mono">agent_memory.py</span>
            </div>
            <pre className="p-6 text-left text-[13px] font-mono leading-[1.7] overflow-x-auto text-[#f5f5f7]">
              <code>
                <span className="text-[#ff7b72]">from</span>{' '}
                <span className="text-[#d2a8ff]">arqondb</span>{' '}
                <span className="text-[#ff7b72]">import</span>{' '}
                <span className="text-[#f5f5f7]">Client</span>{'\n\n'}
                <span className="text-[#8b949e]"># Connect to ArqonDB cluster</span>{'\n'}
                <span className="text-[#f5f5f7]">db</span>{' = '}
                <span className="text-[#f5f5f7]">Client</span>
                <span className="text-[#8b949e]">(</span>
                <span className="text-[#a5d6ff]">"localhost:9379"</span>
                <span className="text-[#8b949e]">)</span>{'\n\n'}
                <span className="text-[#8b949e]"># Store agent reasoning step</span>{'\n'}
                <span className="text-[#f5f5f7]">db</span>
                <span className="text-[#8b949e]">.</span>
                <span className="text-[#d2a8ff]">add_step</span>
                <span className="text-[#8b949e]">(</span>{'\n'}
                {'  '}
                <span className="text-[#ffa657]">agent_id</span>
                <span className="text-[#8b949e]">=</span>
                <span className="text-[#a5d6ff]">"agent-1"</span>
                <span className="text-[#8b949e]">,</span>{'\n'}
                {'  '}
                <span className="text-[#ffa657]">step_type</span>
                <span className="text-[#8b949e]">=</span>
                <span className="text-[#a5d6ff]">"Think"</span>
                <span className="text-[#8b949e]">,</span>{'\n'}
                {'  '}
                <span className="text-[#ffa657]">content</span>
                <span className="text-[#8b949e]">=</span>
                <span className="text-[#a5d6ff]">"Analyzing market signals..."</span>{'\n'}
                <span className="text-[#8b949e]">)</span>{'\n\n'}
                <span className="text-[#8b949e]"># Find similar past reasoning</span>{'\n'}
                <span className="text-[#f5f5f7]">similar</span>{' = '}
                <span className="text-[#f5f5f7]">db</span>
                <span className="text-[#8b949e]">.</span>
                <span className="text-[#d2a8ff]">find_similar_chains</span>
                <span className="text-[#8b949e]">(</span>
                <span className="text-[#f5f5f7]">embedding</span>
                <span className="text-[#8b949e]">,</span>{' '}
                <span className="text-[#ffa657]">k</span>
                <span className="text-[#8b949e]">=</span>
                <span className="text-[#79c0ff]">5</span>
                <span className="text-[#8b949e]">)</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
