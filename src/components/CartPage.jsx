import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { cart, removeItem, clear, total, updateQuantity } = useCart()

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>🛒 Tu carrito está vacío</h2>
        <p style={{ margin: '1.5rem 0', color: '#6c757d' }}>
          ¡Agrega algunos productos para comenzar tu compra!
        </p>
        <Link to="/products" className="btn">
          Explorar productos
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h2>🛒 Mi Carrito ({cart.length} {cart.length === 1 ? 'producto' : 'productos'})</h2>
      
      <ul className="cart-items">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <img 
              src={item.image || 'https://via.placeholder.com/80'} 
              alt={item.title}
            />
            
            <div className="cart-item-info">
              <h4>{item.title}</h4>
              <p style={{ color: '#6c757d' }}>Cantidad: {item.qty}</p>
            </div>
            
            <div className="cart-item-price">
              ${item.price.toLocaleString()}
            </div>
            
            <div className="cart-item-price" style={{ fontWeight: '700' }}>
              ${(item.price * item.qty).toLocaleString()}
            </div>
            
            <button 
              onClick={() => removeItem(item.id)} 
              className="btn btn-danger"
              style={{ padding: '0.5rem 1rem' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <span>Total:</span>
        <span style={{ color: '#0b84ff' }}>${total().toLocaleString()}</span>
      </div>

      <div className="cart-actions">
        <button onClick={clear} className="btn btn-secondary">
          Vaciar carrito
        </button>
        <Link to="/checkout" className="btn">
          Proceder al pago
        </Link>
      </div>
    </div>
  )
}

export default CartPage