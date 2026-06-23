import React from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import NotFound from './pages/NotFound'

const PublicLayout = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      {/* El navbar es fixed: las páginas internas necesitan offset; el home no (hero full-screen) */}
      <main style={{ flex: 1, paddingTop: isHome ? 0 : '4rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
