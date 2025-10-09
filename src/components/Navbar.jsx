import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {
  const { itemsCount } = useCart()

  return (
    <nav className="navbar">
      <div className="nav-inner container">
        <Link to="/" className="brand">essential.import_ok</Link>
        <div className="links">
          <Link to="/products">Productos</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/cart" className="cart-link">
            <FaShoppingCart /> <span className="badge">{itemsCount()}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
