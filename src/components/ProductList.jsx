import React, { useEffect, useMemo, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'
import ProductCard from './ProductCard'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('Todos')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, 'products'))
        setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Categorías derivadas de los productos reales (+ "Todos")
  const categories = useMemo(() => {
    const set = new Set()
    products.forEach(p => { if (p.categoria) set.add(p.categoria) })
    return ['Todos', ...[...set].sort((a, b) => a.localeCompare(b, 'es'))]
  }, [products])

  const visible = active === 'Todos'
    ? products
    : products.filter(p => p.categoria === active)

  if (loading) return (
    <div className="loading">
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '4px solid #E8EBF0',
        borderTopColor: '#1B3A5B',
        animation: 'spin 0.8s linear infinite',
        margin: '0 auto 1rem'
      }} />
      <p style={{ color: '#6B7280' }}>Cargando productos...</p>
    </div>
  )

  if (products.length === 0) return (
    <div className="empty-state">
      <h2>No hay productos disponibles</h2>
      <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>Volvé pronto para ver las novedades.</p>
    </div>
  )

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-7 flex flex-wrap gap-2">
          {categories.map(c => {
            const on = active === c
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  on
                    ? 'bg-[#1B3A5B] text-white shadow-md shadow-[#1B3A5B]/25'
                    : 'border border-[#E8EBF0] bg-white text-[#374151] hover:border-[#1B3A5B]/40 hover:text-[#1B3A5B]'
                }`}
              >
                {c}
              </button>
            )
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="empty-state">
          <h2>No hay productos en esta categoría</h2>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>Probá con otra categoría o consultanos por WhatsApp.</p>
        </div>
      ) : (
        <div className="grid">
          {visible.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

export default ProductList
