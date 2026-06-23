import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { Camera, ArrowUpRight } from 'lucide-react'
import Reveal from '../Reveal'

const IG = 'https://www.instagram.com/essential.import_ok/'

// Placeholders si la colección "entregas" de Firestore está vacía
const FALLBACK = [
  { producto: 'iPhone 15 Pro Max' },
  { producto: 'PlayStation 5' },
  { producto: 'MacBook Air M3' },
  { producto: 'Perfume Dior Sauvage' },
  { producto: 'Notebook ASUS ROG' },
  { producto: 'AirPods Pro 2' },
  { producto: 'Apple Watch Series 9' },
  { producto: 'JBL Charge 5' }
]

// Patrón asimétrico: la primera ocupa 2x2 desde sm en adelante
const spanFor = (i) => (i === 0 ? 'sm:col-span-2 sm:row-span-2' : '')

const Tile = ({ d, i }) => {
  const img = d.imagen || d.img || d.image
  const producto = d.producto || d.caption || d.nombre || ''
  return (
    <a
      href={IG}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-xl bg-[#EEF2F7] ${spanFor(i)}`}
    >
      {img ? (
        <img src={img} alt={producto} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="grid h-full w-full place-items-center text-muted">
          <div className="text-center">
            <Camera size={22} strokeWidth={1.6} className="mx-auto mb-1.5" />
            <p className="text-[0.7rem] font-medium">Foto próximamente</p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="p-4 text-sm font-medium text-white">{producto}</p>
      </div>
    </a>
  )
}

const Deliveries = () => {
  const [items, setItems] = useState(FALLBACK)

  useEffect(() => {
    getDocs(query(collection(db, 'entregas'), limit(9)))
      .then((s) => {
        if (!s.empty) setItems(s.docs.map((d) => ({ id: d.id, ...d.data() })))
      })
      .catch(() => {})
  }, [])

  return (
    <section id="entregas" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-light/70">Pruebas, no promesas</p>
          <h2 className="mt-2 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tightest text-navy">
            Entregas reales
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid auto-rows-[42vw] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[24vw] sm:grid-cols-3 lg:auto-rows-[210px] lg:grid-cols-4">
            {items.slice(0, 9).map((d, i) => (
              <Tile key={d.id || i} d={d} i={i} />
            ))}
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-navy-light"
          >
            Más en @essential.import_ok
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Deliveries
