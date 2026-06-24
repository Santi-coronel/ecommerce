import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { ArrowRight } from 'lucide-react'
import Reveal from '../Reveal'

const Card = ({ p }) => {
  const title = p.title || p.nombre || 'Producto'
  const price = p.price ?? p.precio ?? 0
  const image = p.image || p.imagen
  return (
    <Link to={`/product/${p.id}`} className="group w-[78vw] shrink-0 snap-start sm:w-[300px]">
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-navy/10">
        <div className="aspect-[4/5] overflow-hidden bg-surface">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-xs font-medium text-muted">Sin imagen</div>
          )}
        </div>
        <div className="p-5">
          <p className="truncate text-sm font-semibold text-ink">{title}</p>
          <div className="mt-1.5 flex items-center justify-between">
            <p className="text-lg font-bold text-navy-light">${price.toLocaleString()}</p>
            <span className="flex -translate-x-1 items-center gap-1 text-xs font-medium text-body opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Ver detalle <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const FeaturedCatalog = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    getDocs(query(collection(db, 'products'), limit(8)))
      .then((s) => setItems(s.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(() => {})
  }, [])

  if (!items.length) return null

  return (
    <section id="lo-ultimo" className="bg-white py-24 sm:py-32">
      <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tightest text-ink text-balance">
            Lo último importado
          </h2>
          <Link
            to="/products"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-navy-light"
          >
            Ver todo
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="no-scrollbar mx-auto max-w-7xl overflow-x-auto px-5 sm:px-8">
        <div className="flex snap-x snap-mandatory gap-5 pb-4">
          {items.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCatalog
