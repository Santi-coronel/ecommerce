import React from 'react'
import { Link } from 'react-router-dom'

const WA = `https://wa.me/5491160476175?text=${encodeURIComponent('Hola Essential Import, quisiera pedir una cotización')}`
const IG = 'https://www.instagram.com/essential.import_ok/'

const colTitle = 'mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted'
const linkClass = 'block py-1 text-sm text-white/70 transition-colors duration-200 hover:text-white'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-navy-light text-[0.72rem] font-extrabold leading-none tracking-tight text-white ring-1 ring-white/15">
                EI
              </span>
              <span className="text-[0.97rem] font-semibold tracking-tight">Essential Import</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Importación a pedido de productos originales. Lo que buscás, lo conseguimos.
            </p>
          </div>

          <div>
            <h4 className={colTitle}>Tienda</h4>
            <Link to="/" className={linkClass}>Inicio</Link>
            <Link to="/products" className={linkClass}>Catálogo</Link>
          </div>

          <div>
            <h4 className={colTitle}>Contacto</h4>
            <a href={WA} target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp</a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className={linkClass}>@essential.import_ok</a>
            <p className="pt-1 text-sm text-muted">+54 9 11 6047-6175</p>
          </div>

          <div>
            <h4 className={colTitle}>Envíos</h4>
            <p className="text-sm leading-relaxed text-white/70">CABA — Motomensajería 24/7</p>
            <p className="text-sm leading-relaxed text-white/70">Todo el país — Correo a domicilio</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">© {year} Essential Import. Todos los derechos reservados.</p>
          <p className="text-xs text-muted">CABA, Argentina</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="select-none px-5 py-8 text-center text-[clamp(1.25rem,4vw,2.25rem)] font-bold leading-tight tracking-tight text-white/[0.07]">
          Essential Import
        </p>
      </div>
    </footer>
  )
}

export default Footer
