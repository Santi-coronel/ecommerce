import React from 'react'
import { Link } from 'react-router-dom'

const getWhatsAppUrl = (title) =>
  `https://wa.me/5491160476175?text=${encodeURIComponent(`Hola Essential Import, me interesa el producto: ${title}`)}`

const getAvailabilityBadge = (product) => {
  if (product.disponibilidad === 'A pedido') return { text: 'A pedido', bg: '#6366F1' }
  const stock = product.stock ?? 0
  if (stock === 0)  return { text: 'Sin stock', bg: '#EF4444' }
  if (stock <= 5)   return { text: `¡Quedan ${stock}!`, bg: '#F59E0B' }
  return { text: `${stock} en stock`, bg: '#10B981' }
}

const ProductCard = ({ product }) => {
  const badge = getAvailabilityBadge(product)
  const title = product.title || product.nombre || 'Producto'
  const price = product.price ?? product.precio ?? 0
  const image = product.image || product.imagen

  return (
    <div className="card">
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={image || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
          alt={title}
        />
        <span style={{
          position: 'absolute',
          top: 10,
          left: 10,
          background: badge.bg,
          color: '#fff',
          padding: '0.28rem 0.65rem',
          borderRadius: 6,
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.03em'
        }}>
          {badge.text}
        </span>
      </div>

      <div className="card-body">
        <h3 title={title}>{title}</h3>
        <p>${price.toLocaleString()}</p>

        <Link
          to={`/product/${product.id}`}
          className="btn"
          style={{ width: '100%', marginBottom: '0.45rem', display: 'block' }}
        >
          Ver detalle
        </Link>

        <a
          href={getWhatsAppUrl(title)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ width: '100%', display: 'block', background: '#25D366' }}
        >
          💬 Consultar
        </a>
      </div>
    </div>
  )
}

export default ProductCard
