import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="empty-state" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>404 - Página no encontrada</h2>
    <p style={{ 
      color: '#6c757d', 
      marginBottom: '2rem',
      fontSize: '1.1rem' 
    }}>
      Lo sentimos, la página que buscas no existe o fue movida.
    </p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <Link to="/" className="btn">
        🏠 Volver al inicio
      </Link>
      <Link to="/products" className="btn btn-secondary">
        🛍️ Ver productos
      </Link>
    </div>
  </div>
)

export default NotFound