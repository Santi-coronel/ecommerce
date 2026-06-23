import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../services/firebase'

const EMPTY = { imagen: '', producto: '' }

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  outline: 'none',
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

const cardStyle = {
  background: 'white',
  padding: '2rem',
  borderRadius: '14px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  marginBottom: '2rem'
}

const EntregasManager = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const fetchItems = async () => {
    setLoading(true)
    const snap = await getDocs(collection(db, 'entregas'))
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

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
      const data = { imagen: form.imagen, producto: form.producto }
      if (editingId) {
        await updateDoc(doc(db, 'entregas', editingId), data)
        showFeedback('success', 'Entrega actualizada correctamente')
      } else {
        await addDoc(collection(db, 'entregas'), data)
        showFeedback('success', 'Entrega creada correctamente')
      }
      setForm(EMPTY)
      setEditingId(null)
      fetchItems()
    } catch (err) {
      showFeedback('error', 'Error al guardar. Revisá la consola.')
      console.error(err)
    }
    setSaving(false)
  }

  const handleEdit = (it) => {
    setForm({
      imagen: it.imagen || it.img || it.image || '',
      producto: it.producto || it.caption || it.nombre || ''
    })
    setEditingId(it.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (it) => {
    const name = it.producto || 'esta entrega'
    if (!window.confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return
    try {
      await deleteDoc(doc(db, 'entregas', it.id))
      showFeedback('success', `"${name}" eliminada`)
      if (editingId === it.id) { setForm(EMPTY); setEditingId(null) }
      fetchItems()
    } catch (err) {
      showFeedback('error', 'Error al eliminar')
      console.error(err)
    }
  }

  const cancelEdit = () => { setForm(EMPTY); setEditingId(null) }

  return (
    <div>
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
      <div style={cardStyle}>
        <h2 style={{ fontSize: '1.15rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>
          {editingId ? '✏️ Editar entrega' : '➕ Nueva entrega'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem 1.5rem', alignItems: 'start' }}>
            <div>
              <label style={labelStyle}>Producto *</label>
              <input
                name="producto"
                value={form.producto}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Ej: iPhone 15 Pro Max — Entregado en CABA"
              />
            </div>
            <div>
              <label style={labelStyle}>URL de imagen *</label>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <input
                  name="imagen"
                  type="url"
                  value={form.imagen}
                  onChange={handleChange}
                  required
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
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button type="submit" disabled={saving} className="btn" style={{ minWidth: '185px' }}>
              {saving ? 'Guardando...' : editingId ? 'Actualizar entrega' : 'Crear entrega'}
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

      {/* List */}
      <div style={{ background: 'white', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.15rem', margin: 0, color: '#1a1a1a' }}>
            Entregas ({items.length})
          </h2>
        </div>

        {loading ? (
          <p style={{ padding: '2.5rem', textAlign: 'center', color: '#6c757d' }}>Cargando entregas...</p>
        ) : items.length === 0 ? (
          <p style={{ padding: '2.5rem', textAlign: 'center', color: '#6c757d' }}>
            No hay entregas. Creá la primera con el formulario de arriba.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.25rem',
            padding: '1.5rem 2rem 2rem'
          }}>
            {items.map((it) => {
              const isEditing = editingId === it.id
              const img = it.imagen || it.img || it.image
              return (
                <div key={it.id} style={{
                  border: isEditing ? '2px solid #1B3A5B' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#fff'
                }}>
                  <div style={{ aspectRatio: '1/1', background: '#f1f5f9' }}>
                    {img ? (
                      <img
                        src={img}
                        alt={it.producto || ''}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    ) : (
                      <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#94a3b8', fontSize: '0.8rem' }}>
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '0.85rem 1rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4, marginBottom: '0.75rem', minHeight: '2.4em' }}>
                      {it.producto || '—'}
                    </p>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => handleEdit(it)}
                        style={{ flex: 1, padding: '0.4rem 0.5rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.82rem' }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(it)}
                        style={{ flex: 1, padding: '0.4rem 0.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.82rem' }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default EntregasManager
