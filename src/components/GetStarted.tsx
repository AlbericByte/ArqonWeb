import { motion } from 'framer-motion'
import { Terminal, Cloud, Monitor } from 'lucide-react'

const deployOptions = [
  {
    icon: Terminal,
    title: 'Single Node',
    description: 'Development & testing',
    code: `cargo build --features data-node
cargo run --bin raft_engine -- \\
  /tmp/arqondb 0.0.0.0:7379`,
  },
  {
    icon: Cloud,
    title: 'Kubernetes',
    description: '3+ node production cluster',
    code: `kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/metadata.yaml
kubectl apply -f k8s/raft-engine.yaml
kubectl apply -f k8s/gateway.yaml`,
  },
  {
    icon: Monitor,
    title: 'Docker',
    description: 'Minimal runtime image',
    code: `docker compose up -d metadata
docker compose up -d data-node-1
docker compose up -d data-node-2
docker compose up -d gateway`,
  },
]

export default function GetStarted() {
  return (
    <section id="get-started" className="py-24 md:py-32 bg-surface-light">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-text leading-tight tracking-[-0.025em] mb-4">
            Deploy in minutes.
          </h2>
          <p className="text-text-muted text-lg max-w-[500px] mx-auto leading-relaxed">
            From local development to production Kubernetes clusters.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {deployOptions.map(opt => (
            <div key={opt.title} className="rounded-2xl bg-white border border-border-light overflow-hidden">
              <div className="p-6 border-b border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center">
                    <opt.icon className="w-5 h-5 text-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text text-sm">{opt.title}</h3>
                    <p className="text-xs text-text-light">{opt.description}</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-dark">
                <pre className="p-5 text-[12px] font-mono text-[#e5e5ea] leading-[1.7] overflow-x-auto">
                  <code>{opt.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
