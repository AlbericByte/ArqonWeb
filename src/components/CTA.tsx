import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-[680px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-text leading-tight tracking-[-0.025em] mb-6">
          Give your agents
          <br />
          <span className="bg-gradient-to-r from-primary to-purple bg-clip-text text-transparent">
            persistent memory.
          </span>
        </h2>
        <p className="text-text-muted text-lg max-w-[440px] mx-auto mb-10 leading-relaxed">
          Open source. Apache 2.0 licensed. Schedule for production.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://github.com/AlbericByte/ArqonDB" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-all">
            View on GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="/docs"
            className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
            Read the Docs
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
