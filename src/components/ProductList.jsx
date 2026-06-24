import React, { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'
import ProductCard from './ProductCard'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('Todos')
  const reduce = useReducedMotion()

  useEffect(() => {
    getDocs(collection(db, 'products'))
      .then((snap) => setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // Categorías derivadas de los productos reales (+ "Todos")
  const categories = useMemo(() => {
    const set = new Set()
    products.forEach((p) => { if (p.categoria) set.add(p.categoria) })
    return ['Todos', ...[...set].sort((a, b) => a.localeCompare(b, 'es'))]
  }, [products])

  const visible = active === 'Todos' ? products : products.filter((p) => p.categoria === active)

  const grid = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.05 } } }
  const card = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 text-body">
      <div className="mb-4 h-11 w-11 animate-spin rounded-full border-4 border-line border-t-navy-light" />
      <p>Cargando productos…</p>
    </div>
  )

  if (products.length === 0) return (
    <div className="rounded-2xl border border-line bg-white py-16 text-center">
      <h2 className="text-xl font-semibold text-ink">No hay productos disponibles</h2>
      <p className="mt-2 text-body">Volvé pronto para ver las novedades.</p>
    </div>
  )

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = active === c
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                aria-pressed={on}
                className={`relative inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${
                  on ? 'text-white' : 'border border-line bg-white text-body hover:text-navy-light'
                }`}
              >
                {on && (
                  reduce
                    ? <span className="absolute inset-0 rounded-full bg-navy-light" />
                    : <motion.span layoutId="filterPill" className="absolute inset-0 rounded-full bg-navy-light shadow-md shadow-navy/20" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            )
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white py-16 text-center">
          <h2 className="text-xl font-semibold text-ink">No hay productos en esta categoría</h2>
          <p className="mt-2 text-body">Probá con otra categoría o consultanos por WhatsApp.</p>
        </div>
      ) : (
        <motion.div
          key={active}
          initial="hidden"
          animate="show"
          variants={grid}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
        >
          {visible.map((p) => (
            <motion.div key={p.id} variants={card}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default ProductList
