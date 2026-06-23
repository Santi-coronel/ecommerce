import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'

const getWhatsAppUrl = (title) =>
  `https://wa.me/5491160476175?text=${encodeURIComponent(`Hola Essential Import, me interesa el producto: ${title}`)}`

const getAvailabilityBadge = (product) => {
  if (product.disponibilidad === 'A pedido') return { text: 'A pedido', bg: '#6366F1' }
  const stock = product.stock ?? 0
  if (stock === 0)  return { text: 'Sin stock', bg: '#EF4444' }
  if (stock <= 5)   return { text: `¡Quedan ${stock} unidades!`, bg: '#F59E0B' }
  return { text: `${stock} unidades en stock`, bg: '#10B981' }
}

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const snap = await getDoc(doc(db, 'products', id))
      if (snap.exists()) setProduct({ id: snap.id, ...snap.data() })
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (!product) return
    const name  = product.title || product.nombre || 'Producto'
    const price = product.price ?? product.precio ?? 0
    const desc  = product.description || product.descripcion || ''
    const snippet = desc.length > 110 ? desc.slice(0, 110) + '…' : desc

    document.title = `${name} — Essential Import`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content',
        `${name} a $${price.toLocaleString()}. ${snippet} Consultá por WhatsApp.`.trim()
      )
    }

    return () => {
      document.title = 'Essential Import — Perfumes, tecnología y gadgets importados | CABA y todo el país'
      if (metaDesc) {
        metaDesc.setAttribute('content',
          'Importamos perfumes originales, tecnología y gadgets. Envíos en CABA con moto 24/7 y a todo el país. Consultá lo que buscás por WhatsApp.'
        )
      }
    }
  }, [product])

  if (loading) return (
    <div className="loading">
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '4px solid #E8EBF0',
        borderTopColor: '#1B3A5B',
        animation: 'spin 0.8s linear infinite',
        margin: '0 auto 1rem'
      }} />
      <p>Cargando...</p>
    </div>
  )

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
      <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Producto no encontrado.</p>
      <Link to="/products" className="btn">Ver catálogo</Link>
    </div>
  )

  const title       = product.title || product.nombre
  const price       = product.price ?? product.precio ?? 0
  const image       = product.image || product.imagen
  const description = product.description || product.descripcion
  const badge       = getAvailabilityBadge(product)

  return (
    <div style={{ padding: '1.5rem' }}>
      <div className="product-detail">
        <img
          src={image || 'https://via.placeholder.com/480x480?text=Sin+imagen'}
          alt={title}
        />

        <div>
          {product.categoria && (
            <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              {product.categoria}
            </p>
          )}

          <h2>{title}</h2>
          <p className="product-price">${price.toLocaleString()}</p>

          <span style={{
            display: 'inline-block',
            background: badge.bg,
            color: '#fff',
            padding: '0.35rem 0.9rem',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: description ? '1.5rem' : '2rem'
          }}>
            {badge.text}
          </span>

          {description && (
            <p style={{
              color: '#6B7280',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              margin: '1rem 0 2rem'
            }}>
              {description}
            </p>
          )}

          <a
            href={getWhatsAppUrl(title)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              display: 'inline-block',
              background: '#25D366',
              padding: '0.9rem 2.25rem',
              fontSize: '1rem'
            }}
          >
            💬 Consultar por WhatsApp
          </a>

          <p style={{ marginTop: '1.25rem', fontSize: '0.82rem', color: '#9CA3AF' }}>
            Coordinamos pago y envío por WhatsApp.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
