import { motion } from 'framer-motion'

type Benchmark = {
  label: string
  arqon: number
  competitor: number
  unit: string
}

const memBenchmarks: Benchmark[] = [
  { label: 'Sequential Write', arqon: 5.29, competitor: 33.99, unit: 'ms' },
  { label: 'Batch Write (100/batch)', arqon: 3.69, competitor: 4.85, unit: 'ms' },
  { label: 'Sequential Read', arqon: 4.20, competitor: 9.56, unit: 'ms' },
  { label: 'Random Read', arqon: 5.40, competitor: 9.01, unit: 'ms' },
]

const flushBenchmarks: Benchmark[] = [
  { label: 'Sequential Write + Flush', arqon: 105.40, competitor: 462.95, unit: 'ms' },
  { label: 'Batch Write + Flush', arqon: 89.92, competitor: 88.44, unit: 'ms' },
  { label: 'Point Read After Flush', arqon: 113.18, competitor: 151.99, unit: 'ms' },
]

const graphBenchmarks: Benchmark[] = [
  { label: 'Edge Ingestion (50K edges)', arqon: 1.1, competitor: 50, unit: 'µs/edge' },
  { label: 'Temporal Range Query', arqon: 0.3, competitor: 1700, unit: 'µs/query' },
  { label: 'Multi-hop BFS (depth=3)', arqon: 13.8, competitor: 320, unit: 'µs/traversal' },
  { label: 'Point-in-Time Query', arqon: 0.6, competitor: 1500, unit: 'µs/query' },
]

function getBadge(b: Benchmark) {
  const ratio = b.competitor / b.arqon
  if (ratio >= 1.3) {
    const formatted = ratio >= 100 ? `${Math.round(ratio).toLocaleString()}x faster` : `${ratio.toFixed(1)}x faster`
    return { text: formatted, cls: 'bg-accent/10 text-accent-dark' }
  }
  if (ratio >= 0.95) {
    return { text: 'on par', cls: 'bg-primary/10 text-primary' }
  }
  const inv = (b.arqon / b.competitor).toFixed(1)
  return { text: `${inv}x slower`, cls: 'bg-surface-lighter text-text-light' }
}

function formatValue(val: number, unit: string) {
  if (val >= 1000) return `${val.toLocaleString()} ${unit}`
  return `${val} ${unit}`
}

function BenchmarkBar({ b, competitorName }: { b: Benchmark; competitorName: string }) {
  const maxVal = Math.max(b.arqon, b.competitor)
  const arqonWidth = (b.arqon / maxVal) * 100
  const competitorWidth = (b.competitor / maxVal) * 100
  const badge = getBadge(b)

  // For extreme ratios, use log scale so ArqonDB bar is still visible
  const ratio = maxVal / Math.min(b.arqon, b.competitor)
  const useLogScale = ratio > 20
  let arqonBarWidth = arqonWidth
  let competitorBarWidth = competitorWidth
  if (useLogScale) {
    const logMax = Math.log10(maxVal)
    const logMin = Math.log10(Math.min(b.arqon, b.competitor))
    const logRange = logMax - logMin
    arqonBarWidth = ((Math.log10(b.arqon) - logMin) / logRange) * 85 + 15
    competitorBarWidth = ((Math.log10(b.competitor) - logMin) / logRange) * 85 + 15
  }

  return (
    <div className="rounded-2xl bg-white p-5 border border-border-light">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-text">{b.label}</span>
        <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full font-semibold ${badge.cls}`}>
          {badge.text}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-primary font-mono w-16 shrink-0 text-right">ArqonDB</span>
          <div className="flex-1 h-7 bg-surface-light rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${arqonBarWidth}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-end px-2.5"
            >
              <span className="text-[10px] font-mono text-white whitespace-nowrap font-medium">
                {formatValue(b.arqon, b.unit)}
              </span>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-light font-mono w-16 shrink-0 text-right">{competitorName}</span>
          <div className="flex-1 h-7 bg-surface-light rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${competitorBarWidth}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="h-full bg-surface-lighter rounded-lg flex items-center justify-end px-2.5"
            >
              <span className="text-[10px] font-mono text-text-light whitespace-nowrap">
                {formatValue(b.competitor, b.unit)}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Performance() {
  return (
    <section id="performance" aria-label="ArqonDB Performance Benchmarks" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Performance</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-text leading-tight tracking-[-0.025em] mb-4">
            Blazing fast.
          </h2>
          <p className="text-text-muted text-lg max-w-[500px] mx-auto leading-relaxed">
            Built from scratch in Rust with write group batching and unified Raft WAL.
          </p>
        </div>

        <div className="max-w-[640px] mx-auto space-y-10">
          {/* KV: In-Memory Benchmarks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-sm font-semibold text-text">KV In-Memory</h3>
              <span className="text-[10px] text-text-light font-mono px-2 py-0.5 rounded-full bg-surface-light">vs RocksDB · 10K pairs, 20B keys, 100B values</span>
            </div>
            <div className="space-y-3">
              {memBenchmarks.map((b) => <BenchmarkBar key={b.label} b={b} competitorName="RocksDB" />)}
            </div>
          </motion.div>

          {/* KV: Flush-to-SST Benchmarks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-sm font-semibold text-text">KV Flush-to-SST</h3>
              <span className="text-[10px] text-text-light font-mono px-2 py-0.5 rounded-full bg-surface-light">vs RocksDB · 100K pairs, 20B keys, 1KB values</span>
            </div>
            <div className="space-y-3">
              {flushBenchmarks.map((b) => <BenchmarkBar key={b.label} b={b} competitorName="RocksDB" />)}
            </div>
          </motion.div>

          {/* Temporal Graph Benchmarks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-sm font-semibold text-text">Temporal Graph · 10–5000× via Embedded Design</h3>
              <span className="text-[10px] text-text-light font-mono px-2 py-0.5 rounded-full bg-surface-light">vs Neo4j · 10K nodes, 50K temporal edges</span>
            </div>
            <p className="text-xs text-text-light mb-4 -mt-2 leading-relaxed">
              Embedded engine vs client-server request — conservatively estimated at /10 overhead. The advantage comes from architectural design, not optimization.
            </p>
            <div className="space-y-3">
              {graphBenchmarks.map((b) => <BenchmarkBar key={b.label} b={b} competitorName="Neo4j" />)}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-16 mt-16">
          {[
            { value: '920+', label: 'Tests' },
            { value: '64K+', label: 'Lines of Rust' },
            { value: '132+', label: 'PRs Merged' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-text tracking-tight">{s.value}</div>
              <div className="text-sm text-text-light mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
