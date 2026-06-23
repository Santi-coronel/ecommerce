import React, { useState } from 'react'
import { collection, addDoc, doc, updateDoc, increment, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useCart } from '../context/CartContext'

const CheckoutForm = () => {
  const { cart, total, clear } = useCart()
  const [buyer, setBuyer] = useState({ name: '', email: '', address: '' })
  const [orderId, setOrderId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = e => setBuyer({ ...buyer, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 1. Verificar stock disponible antes de procesar
      await Promise.all(
        cart.map(async (item) => {
          const productRef = doc(db, 'products', item.id)
          const productSnap = await getDoc(productRef)
          
          if (!productSnap.exists()) {
            throw new Error(`Producto ${item.title} no encontrado`)
          }
          
          const currentStock = productSnap.data().stock || 0
          
          if (currentStock < item.qty) {
            throw new Error(`Stock insuficiente para ${item.title}. Disponible: ${currentStock}, Solicitado: ${item.qty}`)
          }
        })
      )

      // 2. Crear la orden
      const order = {
        buyer: {
          name: buyer.name,
          email: buyer.email,
          address: buyer.address
        },
        items: cart.map(item => ({
          id: item.id,
          title: item.title || 'Sin título',
          price: Number(item.price) || 0,
          qty: Number(item.qty) || 1
        })),
        total: Number(total()),
        date: new Date(),
        status: 'completed'
      }
      
      const col = collection(db, 'orders')
      const docRef = await addDoc(col, order)

      // 3. Actualizar stock de cada producto
      await Promise.all(
        cart.map(async (item) => {
          const productRef = doc(db, 'products', item.id)
          await updateDoc(productRef, {
            stock: increment(-item.qty)
          })
        })
      )

      setOrderId(docRef.id)
      clear()
      
    } catch (err) {
      console.error('Error en checkout:', err)
      setError(err.message || 'Error al procesar la compra. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div className="order-success">
        <h3>✅ ¡Gracias por tu compra!</h3>
        <p>Tu orden ha sido procesada exitosamente.</p>
        <p><strong>ID de orden:</strong> {orderId}</p>
        <p>Recibirás un email de confirmación a: <strong>{buyer.email}</strong></p>
      </div>
    )
  }

  if (cart.length === 0) {
    return <p>Tu carrito está vacío. Agrega productos antes de finalizar la compra.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3>Datos de envío</h3>
      
      <input 
        name="name" 
        placeholder="Nombre completo" 
        value={buyer.name} 
        onChange={handleChange} 
        required 
      />
      
      <input 
        name="email" 
        type="email"
        placeholder="Email" 
        value={buyer.email} 
        onChange={handleChange} 
        required 
      />
      
      <input 
        name="address" 
        placeholder="Dirección de envío" 
        value={buyer.address} 
        onChange={handleChange} 
        required 
      />

      <div className="order-summary">
        <h4>Resumen de compra</h4>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>{item.title} x {item.qty}</span>
            <span>${item.price * item.qty}</span>
          </div>
        ))}
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
          <span>Total a pagar:</span>
          <span>${total()}</span>
        </div>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '12px', 
          borderRadius: '4px',
          marginTop: '12px' 
        }}>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        style={{
          marginTop: '20px',
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Procesando compra...' : 'Finalizar compra'}
      </button>
    </form>
  )
}

export default CheckoutForm