import { motion } from 'framer-motion'

const sdks = [
  { name: 'Python', version: '3.9+', install: 'pip install arqondb' },
  { name: 'Rust', version: '1.70+', install: 'cargo add arqondb' },
  { name: 'Go', version: '1.21+', install: 'go get arqondb' },
  { name: 'Java', version: '17+', install: 'io.arqon:arqondb' },
  { name: 'C++', version: '17+', install: 'vcpkg install arqondb' },
]

export default function SDKs() {
  return (
    <section id="sdks" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-3">SDKs</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-text leading-tight tracking-[-0.025em] mb-4">
            Your language. Your way.
          </h2>
          <p className="text-text-muted text-lg max-w-[500px] mx-auto leading-relaxed">
            Official gRPC clients for every major language, plus Redis protocol for instant integration.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[720px] mx-auto"
        >
          {sdks.map(sdk => (
            <div key={sdk.name}
              className="rounded-2xl bg-white border border-border-light p-5 text-center hover:shadow-md transition-shadow">
              <div className="text-lg font-semibold text-text mb-0.5">{sdk.name}</div>
              <div className="text-xs text-text-light mb-3">{sdk.version}</div>
              <code className="text-[10px] text-text-muted bg-surface-light rounded-lg px-2 py-1 block truncate font-mono">
                {sdk.install}
              </code>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 max-w-[480px] mx-auto rounded-2xl bg-white border border-border-light p-6 text-center"
        >
          <div className="text-text font-semibold text-sm mb-1">Redis Protocol Compatible</div>
          <p className="text-xs text-text-muted mb-3">
            Connect with <code className="text-[11px] bg-surface-light px-1.5 py-0.5 rounded font-mono">redis-cli</code> or any Redis client library.
          </p>
          <code className="block text-[12px] font-mono text-text-muted bg-surface-light rounded-xl px-4 py-2.5">
            $ redis-cli -p 6379 SET mykey "hello"
          </code>
        </motion.div>
      </div>
    </section>
  )
}
