import { useState } from 'react'
import { Menu, X, Database, Github, ChevronDown } from 'lucide-react'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#performance', label: 'Performance' },
  { href: '#agent', label: 'Agent Memory' },
  { href: '#sdks', label: 'SDKs' },
  { href: '/docs/', label: 'Docs' },
]

const useCaseItems = [
  { href: '#/plugins', label: 'AI Coding Plugins', icon: '🧩' },
  { href: '#/trading', label: 'Trading Agent', icon: '📈', badge: 'Coming Soon' },
]

/** If on a sub-page (#/plugins etc.), go home first then scroll to anchor */
function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith('/')) return // external like /docs/
  const isSubPage = window.location.hash.startsWith('#/')
  if (isSubPage) {
    e.preventDefault()
    window.location.hash = ''
    // After React re-renders the home page, scroll to the anchor
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const id = href.replace('#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ucOpen, setUcOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-border-light/60">
      <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-text font-semibold text-sm tracking-tight">
          <Database className="w-5 h-5 text-primary" />
          ArqonDB
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.slice(0, 4).map(l => (
            <a key={l.href} href={l.href}
              onClick={(e) => handleAnchorClick(e, l.href)}
              className="text-xs text-text-muted hover:text-text transition-colors">
              {l.label}
            </a>
          ))}

          {/* Use Case dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setUcOpen(true)}
            onMouseLeave={() => setUcOpen(false)}
          >
            <button className="text-xs text-text-muted hover:text-text transition-colors flex items-center gap-1">
              Use Case
              <ChevronDown className={`w-3 h-3 transition-transform ${ucOpen ? 'rotate-180' : ''}`} />
            </button>
            {ucOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="bg-white/95 backdrop-blur-2xl border border-border-light rounded-xl shadow-lg py-2 min-w-[200px]">
                  {useCaseItems.map(item => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setUcOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-text-muted hover:text-text hover:bg-surface-light transition-colors"
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[10px] font-medium text-warning bg-warning/10 px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {links.slice(4).map(l => (
            <a key={l.href} href={l.href}
              onClick={(e) => handleAnchorClick(e, l.href)}
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
          {links.slice(0, 4).map(l => (
            <a key={l.href} href={l.href}
              onClick={(e) => { handleAnchorClick(e, l.href); setOpen(false) }}
              className="text-sm text-text-muted hover:text-text transition-colors">
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-text font-medium">Use Case</span>
            {useCaseItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-text-muted hover:text-text transition-colors pl-4 flex items-center gap-2"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-medium text-warning bg-warning/10 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
          {links.slice(4).map(l => (
            <a key={l.href} href={l.href}
              onClick={(e) => { handleAnchorClick(e, l.href); setOpen(false) }}
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
