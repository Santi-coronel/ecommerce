import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { MessageCircle, ArrowLeft } from 'lucide-react'

const waUrl = (title) =>
  `https://wa.me/5491160476175?text=${encodeURIComponent(`Hola Essential Import, me interesa el producto: ${title}`)}`

const badgeFor = (product) => {
  if (product.disponibilidad === 'A pedido') return { text: 'A pedido', cls: 'bg-navy-light/10 text-navy-light' }
  const stock = product.stock ?? 0
  if (stock === 0) return { text: 'Sin stock', cls: 'bg-rose-100 text-rose-700' }
  if (stock <= 5) return { text: `¡Quedan ${stock} unidades!`, cls: 'bg-amber-100 text-amber-700' }
  return { text: `${stock} unidades en stock`, cls: 'bg-emerald-100 text-emerald-700' }
}

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    setLoading(true)
    getDoc(doc(db, 'products', id)).then((snap) => {
      if (snap.exists()) setProduct({ id: snap.id, ...snap.data() })
      setLoading(false)
    })
  }, [id])

  // SEO dinámico por producto (title + meta description)
  useEffect(() => {
    if (!product) return
    const name = product.title || product.nombre || 'Producto'
    const price = product.price ?? product.precio ?? 0
    const desc = product.description || product.descripcion || ''
    const snippet = desc.length > 110 ? desc.slice(0, 110) + '…' : desc
    document.title = `${name} — Essential Import`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', `${name} a $${price.toLocaleString()}. ${snippet} Consultá por WhatsApp.`.trim())
    return () => {
      document.title = 'Essential Import — Perfumes, tecnología y gadgets importados | CABA y todo el país'
      if (metaDesc) metaDesc.setAttribute('content', 'Importamos perfumes originales, tecnología y gadgets. Envíos en CABA con moto 24/7 y a todo el país. Consultá lo que buscás por WhatsApp.')
    }
  }, [product])

  if (loading) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-surface text-body">
      <div className="mb-4 h-11 w-11 animate-spin rounded-full border-4 border-line border-t-navy-light" />
      <p>Cargando…</p>
    </div>
  )

  if (!product) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-surface px-5 text-center">
      <p className="text-body">Producto no encontrado.</p>
      <Link to="/products" className="rounded-xl bg-navy-light px-6 py-3 font-semibold text-white">Ver catálogo</Link>
    </div>
  )

  const title = product.title || product.nombre
  const price = product.price ?? product.precio ?? 0
  const image = product.image || product.imagen
  const description = product.description || product.descripcion
  const badge = badgeFor(product)

  const reveal = (delay) => reduce
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } }

  return (
    <div className="relative min-h-screen bg-surface">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-navy/[0.05] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Link to="/products" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-navy-light">
          <ArrowLeft size={16} /> Volver al catálogo
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <motion.div {...reveal(0)} className="group overflow-hidden rounded-2xl border border-line bg-white">
            <img
              src={image || 'https://via.placeholder.com/640x640?text=Sin+imagen'}
              alt={title}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </motion.div>

          <motion.div {...reveal(0.1)} className="flex flex-col">
            {product.categoria && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-body">{product.categoria}</p>
            )}
            <h1 className="text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-tight tracking-tight text-ink text-balance">
              {title}
            </h1>
            <p className="mt-3 text-3xl font-bold text-navy-light">${price.toLocaleString()}</p>
            <span className={`mt-4 inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${badge.cls}`}>
              {badge.text}
            </span>

            {description && (
              <p className="mt-6 max-w-prose text-[0.97rem] leading-relaxed text-body">{description}</p>
            )}

            <a
              href={waUrl(title)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-wa px-8 text-base font-semibold text-white transition-all duration-200 hover:brightness-105 sm:w-auto"
            >
              <MessageCircle size={20} /> Consultar por WhatsApp
            </a>
            <p className="mt-4 text-sm text-body/80">Coordinamos pago y envío por WhatsApp.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
