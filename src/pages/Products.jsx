import React from 'react'
import ProductList from '../components/ProductList'

const Products = () => (
  <div>
    <div style={{ background: '#fff', borderBottom: '1px solid #E8EBF0', padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: '#111827' }}>Catálogo</h1>
        <p style={{ color: '#6B7280', fontSize: '0.93rem', marginTop: '0.2rem' }}>
          Perfumes, parlantes y electrónica importada
        </p>
      </div>
    </div>
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <ProductList />
    </div>
  </div>
)

export default Products
