import { motion } from 'framer-motion'
import { TrendingUp, Eye, Brain, Zap, CheckCircle, GitBranch, Search } from 'lucide-react'

const steps = [
  {
    icon: Eye,
    type: 'Observe',
    title: 'Market Data Ingestion',
    description: 'Sync 20-year daily bars for ~6,800 NASDAQ symbols. Scrape news via RSS, run sentiment analysis. Each event recorded as an Observe step in the causal graph.',
    color: 'text-[#4285F4]',
    bg: 'bg-[#4285F4]/10',
    ring: 'ring-[#4285F4]/20',
    code: `# News item → Observe step
step_id = db.add_step(
  agent_id="news-ingest",
  step_type="Observe",
  content=news_json,
  embedding=sentiment_vec
)`,
  },
  {
    icon: Brain,
    type: 'Think',
    title: 'Signal Analysis',
    description: 'Compute 200+ technical indicators and 10,000+ alpha factors per symbol. Claude AI batch-processes all stocks with indicators, factors, and news context to generate top 50 trading signals.',
    color: 'text-[#EA4335]',
    bg: 'bg-[#EA4335]/10',
    ring: 'ring-[#EA4335]/20',
    code: `# Claude signal → Think step
think_id = db.add_step(
  agent_id="signal-gen",
  step_type="Think",
  content=signal_json,
  embedding=signal_vec
)
# Causal link: Observe → Think
db.add_edge(
  src=step_id, dst=think_id,
  edge_type="Informs"
)`,
  },
  {
    icon: Search,
    type: 'Similarity',
    title: 'Pattern Matching',
    description: 'Extract 64-dim feature vectors from price patterns. HNSW search finds K nearest historical patterns. Inverse-distance weighted prediction for 5/10/21-day forward returns.',
    color: 'text-[#FBBC05]',
    bg: 'bg-[#FBBC05]/10',
    ring: 'ring-[#FBBC05]/20',
    code: `# Find similar past patterns
similar = db.find_similar_chains(
  embedding=pattern_64d,
  k=10, chain_depth=5
)
# Returns: anchor steps + causal chains
# → weighted return prediction`,
  },
  {
    icon: Zap,
    type: 'Act',
    title: 'Execution Planning',
    description: 'Claude generates exact executable orders: whole shares, IB commissions, position sizing with Kelly Criterion. Supports both live (Interactive Brokers) and paper trading modes.',
    color: 'text-[#34A853]',
    bg: 'bg-[#34A853]/10',
    ring: 'ring-[#34A853]/20',
    code: `# Trade order → Act step
act_id = db.add_step(
  agent_id="executor",
  step_type="Act",
  content=order_json
)
db.add_edge(
  src=think_id, dst=act_id,
  edge_type="Triggers"
)`,
  },
  {
    icon: CheckCircle,
    type: 'Result',
    title: 'Portfolio Tracking',
    description: 'Track fills, P&L, and daily snapshots. Each execution result stored as a Result step, closing the causal loop for full audit trail and feedback learning.',
    color: 'text-[#4285F4]',
    bg: 'bg-[#4285F4]/10',
    ring: 'ring-[#4285F4]/20',
    code: `# Execution result → Result step
result_id = db.add_step(
  agent_id="executor",
  step_type="Result",
  content=fill_json
)
db.add_edge(
  src=act_id, dst=result_id,
  edge_type="Triggers"
)`,
  },
  {
    icon: GitBranch,
    type: 'Fork',
    title: 'Strategy Exploration',
    description: 'Fork a branch to test alternative strategies. Run what-if scenarios with different thresholds, factor weights, or risk parameters. Merge winning strategies back to main timeline.',
    color: 'text-[#EA4335]',
    bg: 'bg-[#EA4335]/10',
    ring: 'ring-[#EA4335]/20',
    code: `# Explore alternative strategy
branch = db.fork(parent_id="main")
db.add_step(
  agent_id="strategy-test",
  step_type="Think",
  branch_id=branch,
  content=alt_params
)
# Compare → merge if better
db.merge_branch(branch)`,
  },
]

export default function UseCase() {
  return (
    <section id="use-case" aria-label="ArqonDB Quantitative Trading Demo - AgentStateService Workflow" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Use Case</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-text leading-tight tracking-[-0.025em] mb-4">
            AI-Powered Quantitative
            <br />Trading Agent.
          </h2>
          <p className="text-text-muted text-lg max-w-[560px] mx-auto leading-relaxed">
            A production demo showing how ArqonDB's AgentStateService powers an end-to-end
            trading pipeline — from market data to execution with full causal traceability.
          </p>
        </div>

        {/* Flow diagram header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-light text-xs font-medium text-text-muted">
              <TrendingUp className="w-3.5 h-3.5" />
              Arqon Trading Platform
            </span>
            <span className="text-text-light text-xs">powered by</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-xs font-medium text-primary">
              ArqonDB AgentStateService
            </span>
          </div>
        </motion.div>

        {/* Timeline steps */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.type + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 md:py-8 ${
                  i % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Timeline dot (desktop) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-10 hidden md:flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full ${step.bg} ring-4 ring-white flex items-center justify-center`}>
                    <step.icon className={`w-4 h-4 ${step.color}`} />
                  </div>
                </div>

                {/* Description card */}
                <div className={`${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}>
                  <div className={`inline-flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full ${step.bg} flex items-center justify-center md:hidden`}>
                      <step.icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <span className={`text-xs font-mono font-semibold ${step.color} uppercase tracking-wider`}>
                      {step.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
                </div>

                {/* Code card */}
                <div className={`mt-4 md:mt-0 ${i % 2 === 0 ? 'md:col-start-2 md:pl-16' : 'md:col-start-1 md:row-start-1 md:pr-16'}`}>
                  <div className="rounded-2xl bg-surface-dark overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2c]">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-[#e5e5ea] leading-[1.6] overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl bg-white border border-border-light p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '6,800+', label: 'NASDAQ Symbols' },
              { value: '200+', label: 'Technical Indicators' },
              { value: '10,000+', label: 'Alpha Factors' },
              { value: '64-dim', label: 'Pattern Vectors' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-semibold text-text tracking-tight">{s.value}</div>
                <div className="text-xs text-text-light mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
