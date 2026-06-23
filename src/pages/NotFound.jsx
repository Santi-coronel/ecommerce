import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div style={{ padding: '3rem 1.5rem' }}>
    <div className="empty-state" style={{
      minHeight: '55vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: 520,
      margin: '0 auto'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: '#111827' }}>
        Página no encontrada
      </h2>
      <p style={{ color: '#6B7280', marginBottom: '2rem', fontSize: '1rem' }}>
        La página que buscás no existe o fue movida.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn">Volver al inicio</Link>
        <Link to="/products" className="btn btn-secondary">Ver catálogo</Link>
      </div>
    </div>
  </div>
)

export default NotFound
