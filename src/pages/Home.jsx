import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <section style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <h1 style={{ marginBottom: '1rem' }}>
      ✨ Bienvenido a Essential.Import_ok
    </h1>
    <p style={{ 
      fontSize: '1.2rem', 
      color: '#6c757d', 
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem'
    }}>
      Descubre productos únicos importados con la mejor calidad y los mejores precios del mercado
    </p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Link to="/products" className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
        🛍️ Ver productos
      </Link>
    </div>
    
    <div style={{ 
      marginTop: '4rem', 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '2rem',
      textAlign: 'center'
    }}>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚚</div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Envío Rápido</h3>
        <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Entregas en 24-48hs</p>
      </div>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💳</div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Pago Seguro</h3>
        <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Múltiples métodos</p>
      </div>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌟</div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Calidad Premium</h3>
        <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Productos verificados</p>
      </div>
    </div>
  </section>
)

export default Home