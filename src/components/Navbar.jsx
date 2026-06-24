import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const WA = `https://wa.me/5491160476175?text=${encodeURIComponent('Hola Essential Import, quisiera pedir una cotización')}`

const LINKS = [
  { label: 'Catálogo', to: '/products' },
  { label: 'Cómo funciona', anchor: 'como-funciona' },
  { label: 'Entregas', anchor: 'entregas' },
  { label: 'FAQ', anchor: 'faq' }
]

const Monogram = () => (
  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-navy-light text-[0.72rem] font-extrabold leading-none tracking-tight text-white ring-1 ring-white/15">
    EI
  </span>
)

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const solid = scrolled || !isHome || open
  const anchorHref = (a) => (isHome ? `#${a}` : `/#${a}`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-white/10 bg-navy/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80">
          <Monogram />
          <span className="text-[0.97rem] font-semibold tracking-tight text-white">Essential Import</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className="text-sm font-medium text-muted transition-colors duration-200 hover:text-white">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={anchorHref(l.anchor)} className="text-sm font-medium text-muted transition-colors duration-200 hover:text-white">
                {l.label}
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy transition-all duration-200 hover:scale-[1.04] hover:shadow-lg hover:shadow-white/10 sm:inline-block"
          >
            Cotizar
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label="Abrir menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {LINKS.map((l) =>
              l.to ? (
                <Link key={l.label} to={l.to} className="rounded-lg px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-white">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={anchorHref(l.anchor)} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-white">
                  {l.label}
                </a>
              )
            )}
            <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-2 rounded-lg bg-white px-3 py-3 text-center text-base font-semibold text-navy">
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
