import { motion } from 'framer-motion'

const cases = [
  {
    icon: '🧩',
    title: 'AI Coding Assistant Memory Plugins',
    desc: 'Install ArqonDB memory plugins for Claude Code, Cursor, Windsurf, Copilot, Cline, and Codex. Give your AI coding assistant persistent, semantic memory powered by vector search and temporal graph storage.',
    badges: [
      { label: '6 Plugins', cls: 'bg-primary/10 text-primary' },
      { label: 'Available Now', cls: 'bg-accent/10 text-accent' },
    ],
    href: '#/plugins',
  },
  {
    icon: '📈',
    title: 'AI-Powered Quantitative Trading Agent',
    desc: 'Autonomous trading intelligence backed by ArqonDB\'s temporal graph engine. Model market relationships, track evolving correlations, and make data-driven decisions in real time.',
    badges: [
      { label: 'Temporal Graph', cls: 'bg-purple/10 text-purple' },
      { label: 'Coming Soon', cls: 'bg-warning/10 text-warning' },
    ],
    href: '#/trading',
  },
]

/* Duplicate cards for seamless infinite scroll */
const track = [...cases, ...cases]

export default function UseCaseCarousel() {
  return (
    <section id="use-case" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Use Cases</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-text leading-tight tracking-[-0.025em] mb-3">
            Built for Real Workloads.
          </h2>
          <p className="text-text-muted text-base max-w-[480px] mx-auto leading-relaxed">
            See how ArqonDB powers production AI applications.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <div className="uc-scroll-track flex gap-6 pl-6 w-max">
          {track.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className="block w-[460px] shrink-0 rounded-2xl border border-border-light bg-white p-8 hover:border-primary/30 hover:shadow-lg transition-all no-underline"
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="text-lg font-semibold text-text mb-2">{c.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5">{c.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {c.badges.map(b => (
                  <span key={b.label} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${b.cls}`}>
                    {b.label}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
