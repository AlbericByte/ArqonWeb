import { motion } from 'framer-motion'
import { GitBranch, Network, Eye, Merge, Clock } from 'lucide-react'

const primitives = [
  {
    icon: Network,
    title: 'Causal Graph',
    subtitle: 'Track every reasoning step.',
    description: 'Record agent actions as nodes in a DAG with five step types: Observe, Think, Act, Tool, Result. Link them with semantic edges — Triggers, Informs, Branches, Merges. Full BFS traversal for complete explainability.',
    code: `db.add_step(
  agent_id="agent-1",
  step_type="Think",
  content="Analyzing signals..."
)
db.add_edge(
  from_step=step_1,
  to_step=step_2,
  edge_type="Triggers"
)`,
  },
  {
    icon: Clock,
    title: 'Temporal Graph',
    subtitle: 'Time-aware reasoning.',
    description: 'Edges carry validity intervals [valid_from, valid_to]. Query the graph at any point in time, traverse only edges active in a window, expire edges without deletion, and retrieve full edge history across versions.',
    code: `# Add edge with time validity
db.add_temporal_edge(
  src=step_1, dst=step_2,
  edge_type="Informs",
  valid_from=t0, valid_to=t1
)

# Point-in-time traversal
steps = db.traverse_at(
  start=step_1, ts=now,
  direction="Forward", max_depth=5
)

# Edge history across versions
history = db.edge_history(
  src=step_1, dst=step_2,
  edge_type="Informs"
)`,
  },
  {
    icon: GitBranch,
    title: 'Fork & Branch',
    subtitle: 'Explore alternate paths.',
    description: 'Create lightweight state branches with copy-on-write overlays. Zero data duplication. Agents explore alternative reasoning paths. Merge winning branches back atomically.',
    code: `branch = db.fork(
  parent_id="main",
  snapshot_from=step_42
)
db.branch_put(branch, "strategy", data)

# Merge back if successful
db.merge_branch(branch)`,
  },
  {
    icon: Eye,
    title: 'Reactive Watches',
    subtitle: 'Real-time state changes.',
    description: 'Compare-and-swap for optimistic concurrency. Watch key prefixes for instant notifications via server-streaming gRPC.',
    code: `# Optimistic locking
db.cas_put(
  key="state",
  value=new_val,
  expected_seq=42
)

# Watch for changes
stream = db.watch_prefix("agent-1:")`,
  },
  {
    icon: Merge,
    title: 'Similarity Search',
    subtitle: 'Learn from history.',
    description: 'Attach vector embeddings to reasoning steps. Find similar past chains via KNN search, then BFS to assemble full reasoning contexts. Agents learn from their own experience.',
    code: `# Find similar reasoning chains
chains = db.find_similar_chains(
  embedding=current_vector,
  k=5,
  max_depth=10
)`,
  },
]

export default function AgentMemory() {
  return (
    <section id="agent" aria-label="Agent Memory Primitives - Causal Graph, Temporal Graph, Fork, Reactive State" className="py-24 md:py-32 bg-surface-light">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Agent Memory</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-text leading-tight tracking-[-0.025em] mb-4">
            Memory primitives
            <br />built for agents.
          </h2>
          <p className="text-text-muted text-lg max-w-[540px] mx-auto leading-relaxed">
            Causal graphs, temporal edges, branching, reactive state, and similarity search — purpose-built for AI agent memory.
          </p>
        </div>

        <div className="space-y-16">
          {primitives.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-text" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text">{p.title}</h3>
                  </div>
                </div>
                <p className="text-primary text-sm font-medium mb-3">{p.subtitle}</p>
                <p className="text-text-muted leading-relaxed text-[15px]">{p.description}</p>
              </div>

              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="rounded-2xl bg-surface-dark overflow-hidden shadow-sm">
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2c]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <pre className="p-5 text-[13px] font-mono text-[#e5e5ea] leading-[1.65] overflow-x-auto">
                    <code>{p.code}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
