import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const isLowStock = product.stock > 0 && product.stock <= 5
  const isOutOfStock = !product.stock || product.stock === 0

  return (
    <div className="card">
      {/* Stock Badge */}
      {isOutOfStock && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#ef4444',
          color: 'white',
          padding: '0.4rem 0.8rem',
          borderRadius: '6px',
          fontWeight: '700',
          fontSize: '0.85rem',
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          Sin stock
        </div>
      )}
      
      {isLowStock && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#f59e0b',
          color: 'white',
          padding: '0.4rem 0.8rem',
          borderRadius: '6px',
          fontWeight: '700',
          fontSize: '0.85rem',
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          ¡Últimas {product.stock}!
        </div>
      )}

      <img 
        src={product.image || 'https://via.placeholder.com/400x300'} 
        alt={product.title}
        style={{ opacity: isOutOfStock ? 0.5 : 1 }}
      />
      
      <div className="card-body">
        <h3>{product.title}</h3>
        <p>${product.price?.toLocaleString()}</p>
        
        <div style={{ 
          fontSize: '0.9rem', 
          color: isOutOfStock ? '#ef4444' : '#10b981',
          marginBottom: '0.75rem',
          fontWeight: '600'
        }}>
          {isOutOfStock ? '❌ Agotado' : `✅ Stock: ${product.stock}`}
        </div>
        
        <Link 
          to={`/product/${product.id}`} 
          className="btn"
          style={{ width: '100%', textAlign: 'center' }}
        >
          Ver detalle
        </Link>
      </div>
    </div>
  )
}

export default ProductCard