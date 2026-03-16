import { motion } from 'framer-motion'
import {
  Database, Search, GitBranch, Zap, Shield, Globe,
  Layers, BarChart3, Terminal, Clock, Server
} from 'lucide-react'

const features = [
  {
    icon: Server,
    title: 'Distributed KV',
    description: 'Sharded key-value store with gRPC API. Put, Get, Delete, Scan, BatchWrite, and prefix-based operations across a distributed cluster.',
  },
  {
    icon: Database,
    title: 'LSM-Tree Engine',
    description: 'Concurrent skip-list MemTable, prefix-compressed SST files, bloom filters, and sharded LRU block cache.',
  },
  {
    icon: Search,
    title: 'Vector Search',
    description: 'Built-in HNSW with L2, cosine, and inner-product distance. Product & scalar quantization for large-scale.',
  },
  {
    icon: GitBranch,
    title: 'State Branching',
    description: 'Fork/merge with copy-on-write overlays. Explore alternate reasoning paths and merge results back.',
  },
  {
    icon: Layers,
    title: 'Causal Graph',
    description: 'DAG-based reasoning trace with typed edges: Triggers, Informs, Branches, Merges. Full BFS traversal for explainability.',
  },
  {
    icon: Clock,
    title: 'Temporal Graph',
    description: 'Time-aware edges with validity intervals. Point-in-time traversal, range queries, and edge history tracking.',
  },
  {
    icon: Shield,
    title: 'Raft Consensus',
    description: 'Single-threaded event loop. Separate metadata and data plane Raft groups for performance.',
  },
  {
    icon: Zap,
    title: 'Reactive State',
    description: 'Compare-and-swap with optimistic locking. Watch key prefixes for real-time gRPC notifications.',
  },
  {
    icon: Terminal,
    title: 'Redis Protocol',
    description: 'RESP2-compatible TCP server. Connect with any Redis client. Full TTL support out of the box.',
  },
  {
    icon: Globe,
    title: 'Multi-Language SDKs',
    description: 'gRPC clients for Python, Java, Rust, Go, and C++. Native async for high-throughput workloads.',
  },
  {
    icon: BarChart3,
    title: 'Management UI',
    description: 'Web console with cluster stats, shard topology, KV terminal, user management, and Prometheus metrics.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Features() {
  return (
    <section id="features" aria-label="ArqonDB Features - Vector Search, Causal Graph, Temporal Graph, Raft Consensus" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-text leading-tight tracking-[-0.025em] mb-4">
            Everything an agent
            <br />needs to remember.
          </h2>
          <p className="text-text-muted text-lg max-w-[500px] mx-auto leading-relaxed">
            Key-value storage, vector search, causal graphs, and distributed consensus in a single database.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-surface-light flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-text" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">{f.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
