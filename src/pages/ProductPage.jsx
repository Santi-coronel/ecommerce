import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useCart } from '../context/CartContext'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const d = doc(db, 'products', id)
      const snap = await getDoc(d)
      if (snap.exists()) setProduct({ id: snap.id, ...snap.data() })
      setLoading(false)
    }
    fetch()
  }, [id])

  const handleAddToCart = () => {
    if (product.stock >= quantity) {
      addItem({ 
        id: product.id, 
        title: product.title, 
        price: product.price,
        image: product.image,
        stock: product.stock 
      }, quantity)
      
      // Notificación mejorada
      const notification = document.createElement('div')
      notification.innerHTML = `✅ ${quantity} ${product.title} agregado(s) al carrito`
      notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
      `
      document.body.appendChild(notification)
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease'
        setTimeout(() => notification.remove(), 300)
      }, 2500)
    } else {
      alert('No hay suficiente stock disponible')
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) return <p>Cargando...</p>
  if (!product) return <p>Producto no encontrado</p>

  const isOutOfStock = !product.stock || product.stock === 0

  return (
    <div className="product-detail">
      <img 
        src={product.image || 'https://via.placeholder.com/400x300'} 
        alt={product.title} 
        style={{width:300}} 
      />
      <div>
        <h2>{product.title}</h2>
        <p className="product-price">${product.price}</p>
        
        <div className="stock-info">
          <p>
            Stock disponible: 
            <strong style={{ color: isOutOfStock ? 'red' : 'green', marginLeft: '8px' }}>
              {product.stock ?? 0}
            </strong>
          </p>
        </div>

        {!isOutOfStock && (
          <div className="quantity-selector" style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              style={{ padding: '5px 15px', fontSize: '18px' }}
            >
              -
            </button>
            <span style={{ fontSize: '18px', minWidth: '30px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button 
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
              style={{ padding: '5px 15px', fontSize: '18px' }}
            >
              +
            </button>
          </div>
        )}

        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          style={{
            opacity: isOutOfStock ? 0.5 : 1,
            cursor: isOutOfStock ? 'not-allowed' : 'pointer'
          }}
        >
          {isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}

export default ProductPage