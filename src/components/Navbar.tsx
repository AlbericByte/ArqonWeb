import { useState } from 'react'
import { Menu, X, Database, Github } from 'lucide-react'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#performance', label: 'Performance' },
  { href: '#agent', label: 'Agent Memory' },
  { href: '#use-case', label: 'Use Case' },
  { href: '#sdks', label: 'SDKs' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-border-light/60">
      <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-text font-semibold text-sm tracking-tight">
          <Database className="w-5 h-5 text-primary" />
          ArqonDB
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-xs text-text-muted hover:text-text transition-colors">
              {l.label}
            </a>
          ))}
          <a href="https://github.com/AlbericByte/ArqonDB" target="_blank" rel="noopener noreferrer"
            className="text-text-muted hover:text-text transition-colors">
            <Github className="w-4 h-4" />
          </a>
        </div>

        <button className="md:hidden text-text-muted" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border-light bg-white/95 backdrop-blur-2xl px-6 py-5 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm text-text-muted hover:text-text transition-colors">
              {l.label}
            </a>
          ))}
          <a href="https://github.com/AlbericByte/ArqonDB" target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-sm text-text-muted hover:text-text transition-colors flex items-center gap-2">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>
      )}
    </nav>
  )
}
