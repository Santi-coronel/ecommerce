import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'
import ProductCard from './ProductCard'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const col = collection(db, 'products')
        const snapshot = await getDocs(col)
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setProducts(items)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div style={{
          display: 'inline-block',
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
          Cargando productos increíbles...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h2>No hay productos disponibles</h2>
        <p>Vuelve pronto para ver nuestras novedades</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

export default ProductList