import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  // Cargar carrito del localStorage al iniciar
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('essential_cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('essential_cart', JSON.stringify(cart))
  }, [cart])

  const addItem = (item, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id)
      if (exists) {
        return prev.map(p => 
          p.id === item.id 
            ? { ...p, qty: p.qty + qty } 
            : p
        )
      }
      return [...prev, { 
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        stock: item.stock,
        qty 
      }]
    })
  }

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeItem(id)
      return
    }
    setCart(prev => 
      prev.map(p => 
        p.id === id 
          ? { ...p, qty: newQty } 
          : p
      )
    )
  }

  const removeItem = (id) => setCart(prev => prev.filter(p => p.id !== id))
  
  const clear = () => setCart([])
  
  const total = () => cart.reduce((s, p) => s + p.price * p.qty, 0)
  
  const itemsCount = () => cart.reduce((s, p) => s + p.qty, 0)

  return (
    <CartContext.Provider value={{ 
      cart, 
      addItem, 
      updateQuantity,
      removeItem, 
      clear, 
      total, 
      itemsCount 
    }}>
      {children}
    </CartContext.Provider>
  )
}