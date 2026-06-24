import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import EntregasManager from '../components/EntregasManager'

const tabStyle = (active) => ({
  padding: '0.6rem 1.3rem',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '0.92rem',
  background: active ? '#1B3A5B' : '#fff',
  color: active ? '#fff' : '#374151',
  boxShadow: active ? '0 2px 8px rgba(27,58,91,0.25)' : '0 1px 3px rgba(0,0,0,0.08)',
  transition: 'all 0.2s'
})

const CATEGORIES = ['Perfumes', 'Parlantes', 'Electrónica', 'Bienestar']

const EMPTY_FORM = {
  nombre: '',
  categoria: 'Perfumes',
  precio: '',
  stock: '',
  disponibilidad: 'En stock',
  descripcion: '',
  imagen: ''
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  background: 'white'
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.4rem',
  fontWeight: '600',
  color: '#374151',
  fontSize: '0.88rem'
}

const AdminPanel = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [tab, setTab] = useState('productos')

  const fetchProducts = async () => {
    setLoading(true)
    const snap = await getDocs(collection(db, 'products'))
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const showFeedback = (type, msg) => {
    setFeedback({ type, msg })
    setTimeout(() => setFeedback(null), 3500)
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const precio = Number(form.precio)
      const stock = Number(form.stock)
      const data = {
        nombre: form.nombre,
        categoria: form.categoria,
        precio,
        stock,
        disponibilidad: form.disponibilidad,
        descripcion: form.descripcion,
        imagen: form.imagen,
        // campos legacy para compatibilidad con la tienda
        title: form.nombre,
        price: precio,
        image: form.imagen,
        description: form.descripcion
      }

      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), data)
        showFeedback('success', 'Producto actualizado correctamente')
      } else {
        await addDoc(collection(db, 'products'), data)
        showFeedback('success', 'Producto creado correctamente')
      }

      setForm(EMPTY_FORM)
      setEditingId(null)
      fetchProducts()
    } catch (err) {
      showFeedback('error', 'Error al guardar. Revisá la consola.')
      console.error(err)
    }
    setSaving(false)
  }

  const handleEdit = (product) => {
    const existingImage = product.imagen || product.image || ''
    setForm({
      nombre: product.nombre || product.title || '',
      categoria: product.categoria || 'Perfumes',
      precio: product.precio ?? product.price ?? '',
      stock: product.stock ?? '',
      disponibilidad: product.disponibilidad || 'En stock',
      descripcion: product.descripcion || product.description || '',
      imagen: existingImage
    })
    setEditingId(product.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (product) => {
    const name = product.nombre || product.title || 'este producto'
    if (!window.confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return
    try {
      await deleteDoc(doc(db, 'products', product.id))
      showFeedback('success', `"${name}" eliminado`)
      if (editingId === product.id) {
        setForm(EMPTY_FORM)
        setEditingId(null)
      }
      fetchProducts()
    } catch (err) {
      showFeedback('error', 'Error al eliminar')
      console.error(err)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  const cancelEdit = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0D2137 0%, #1B3A5B 100%)',
        color: 'white',
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>Panel de Administración</h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', opacity: 0.85 }}>
            Essential Import · {user?.email}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/"
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            Ver tienda
          </a>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.75rem' }}>
          <button onClick={() => setTab('productos')} style={tabStyle(tab === 'productos')}>Productos</button>
          <button onClick={() => setTab('entregas')} style={tabStyle(tab === 'entregas')}>Entregas</button>
        </div>

        {tab === 'entregas' && <EntregasManager />}

        {tab === 'productos' && (
        <>
        {/* Feedback */}
        {feedback && (
          <div style={{
            padding: '0.9rem 1.25rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            background: feedback.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: feedback.type === 'success' ? '#065f46' : '#dc2626',
            fontWeight: '500',
            fontSize: '0.95rem',
            border: `1px solid ${feedback.type === 'success' ? '#6ee7b7' : '#fca5a5'}`
          }}>
            {feedback.type === 'success' ? '✅ ' : '❌ '}{feedback.msg}
          </div>
        )}

        {/* Form */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>
            {editingId ? '✏️ Editar producto' : '➕ Nuevo producto'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem 1.5rem' }}>
              <div>
                <label style={labelStyle}>Nombre *</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Ej: Perfume Hugo Boss 100ml"
                />
              </div>
              <div>
                <label style={labelStyle}>Categoría *</label>
                <select name="categoria" value={form.categoria} onChange={handleChange} style={inputStyle}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Precio ($) *</label>
                <input
                  name="precio"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.precio}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="0"
                />
              </div>
              <div>
                <label style={labelStyle}>Stock (unidades) *</label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="0"
                />
              </div>
              <div>
                <label style={labelStyle}>Disponibilidad *</label>
                <select name="disponibilidad" value={form.disponibilidad} onChange={handleChange} style={inputStyle}>
                  <option value="En stock">En stock</option>
                  <option value="A pedido">A pedido</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={labelStyle}>Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
                placeholder="Descripción del producto, características, etc."
              />
            </div>

            {/* Image URL */}
            <div style={{ marginTop: '1rem' }}>
              <label style={labelStyle}>URL de imagen</label>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <input
                  name="imagen"
                  type="url"
                  value={form.imagen}
                  onChange={handleChange}
                  style={{ ...inputStyle, flex: 1 }}
                  placeholder="https://..."
                />
                {form.imagen && (
                  <img
                    src={form.imagen}
                    alt="preview"
                    style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '8px', border: '2px solid #e5e7eb', flexShrink: 0 }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={saving}
                className="btn"
                style={{ minWidth: '185px' }}
              >
                {saving ? 'Guardando...' : editingId ? 'Actualizar producto' : 'Crear producto'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={saving}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product list */}
        <div style={{
          background: 'white',
          borderRadius: '14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.25rem 2rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ fontSize: '1.15rem', margin: 0, color: '#1a1a1a' }}>
              Productos ({products.length})
            </h2>
            {!loading && products.length > 0 && (
              <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                Click en "Editar" para modificar
              </span>
            )}
          </div>

          {loading ? (
            <p style={{ padding: '2.5rem', textAlign: 'center', color: '#6c757d' }}>Cargando productos...</p>
          ) : products.length === 0 ? (
            <p style={{ padding: '2.5rem', textAlign: 'center', color: '#6c757d' }}>
              No hay productos. Creá el primero con el formulario de arriba.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Imagen', 'Nombre', 'Categoría', 'Precio', 'Stock', 'Disponibilidad', 'Acciones'].map(h => (
                      <th key={h} style={{
                        padding: '0.85rem 1rem',
                        textAlign: 'left',
                        fontWeight: '600',
                        color: '#374151',
                        borderBottom: '1px solid #e5e7eb',
                        whiteSpace: 'nowrap',
                        fontSize: '0.82rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => {
                    const nombre = p.nombre || p.title || '—'
                    const precio = p.precio ?? p.price ?? 0
                    const imgSrc = p.imagen || p.image
                    const isEditing = editingId === p.id
                    return (
                      <tr key={p.id} style={{
                        background: isEditing ? '#eff6ff' : i % 2 === 0 ? 'white' : '#f9fafb',
                        borderLeft: isEditing ? '3px solid #3b82f6' : '3px solid transparent'
                      }}>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={nombre}
                              style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '6px' }}
                              onError={(e) => { e.target.style.display = 'none' }}
                            />
                          ) : (
                            <div style={{
                              width: 48, height: 48, borderRadius: '6px',
                              background: '#e5e7eb', display: 'flex', alignItems: 'center',
                              justifyContent: 'center', fontSize: '1.2rem'
                            }}>📦</div>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1a1a1a', maxWidth: '200px' }}>
                          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {nombre}
                          </span>
                          {(p.descripcion || p.description) && (
                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {p.descripcion || p.description}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: '#6c757d' }}>{p.categoria || '—'}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: '#0b84ff', whiteSpace: 'nowrap' }}>
                          ${Number(precio).toLocaleString()}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: '#1a1a1a', fontWeight: '500' }}>
                          {p.stock ?? '—'}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{
                            background: p.disponibilidad === 'A pedido' ? '#6366f1' : '#10b981',
                            color: 'white',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            whiteSpace: 'nowrap'
                          }}>
                            {p.disponibilidad || 'En stock'}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => handleEdit(p)}
                              style={{
                                padding: '0.4rem 0.9rem',
                                background: '#f59e0b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.82rem',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              style={{
                                padding: '0.4rem 0.9rem',
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.82rem',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
