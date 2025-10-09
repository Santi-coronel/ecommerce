import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      marginTop: '4rem',
      padding: '3rem 0 1.5rem',
      boxShadow: '0 -10px 30px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Columna 1: Sobre nosotros */}
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>
              Essential.Import_ok
            </h3>
            <p style={{ 
              color: 'rgba(255,255,255,0.9)', 
              lineHeight: '1.6',
              fontSize: '0.95rem' 
            }}>
              Tu tienda de confianza para productos importados de calidad premium. 
              Innovación, calidad y precio justo.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
              Enlaces Rápidos
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}>
                  🏠 Inicio
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/products" style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}>
                  🛍️ Productos
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/cart" style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}>
                  🛒 Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
              Contacto
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.9)' }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                📧 @essential.import_ok
              </li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                📱 +54 11 6047-6175
              </li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                📍 Buenos Aires, Argentina
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '0.9rem'
        }}>
          <p>© {currentYear} Essential.Import_ok - Todos los derechos reservados</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            Desarrollado con ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer