import React, { useEffect, useMemo, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'
import ProductCard from './ProductCard'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('Todos')

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
                className={`inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-semibold transition-all duration-200 ${
                  on
                    ? 'bg-navy-light text-white shadow-md shadow-navy/20'
                    : 'border border-line bg-white text-body hover:border-navy-light/40 hover:text-navy-light'
                }`}
              >
                {c}
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

export default ProductList
