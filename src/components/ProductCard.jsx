import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

const WA_PHONE = '5491160476175'
const waUrl = (title) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hola Essential Import, me interesa el producto: ${title}`)}`

const badgeFor = (product) => {
  if (product.disponibilidad === 'A pedido') return { text: 'A pedido', cls: 'bg-navy-light/10 text-navy-light' }
  const stock = product.stock ?? 0
  if (stock === 0) return { text: 'Sin stock', cls: 'bg-rose-100 text-rose-700' }
  if (stock <= 5) return { text: `Quedan ${stock}`, cls: 'bg-amber-100 text-amber-700' }
  return { text: 'En stock', cls: 'bg-emerald-100 text-emerald-700' }
}

const ProductCard = ({ product }) => {
  const title = product.title || product.nombre || 'Producto'
  const price = product.price ?? product.precio ?? 0
  const image = product.image || product.imagen
  const badge = badgeFor(product)

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/10">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <img
            src={image || 'https://via.placeholder.com/400x500?text=Sin+imagen'}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${badge.cls}`}>
            {badge.text}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="truncate text-sm font-semibold text-ink" title={title}>{title}</h3>
          <p className="mt-1 text-lg font-bold text-navy-light">${price.toLocaleString()}</p>
        </Link>
        <a
          href={waUrl(title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-wa px-4 text-sm font-semibold text-white transition-all duration-200 hover:brightness-105"
        >
          <MessageCircle size={17} /> Consultar
        </a>
      </div>
    </div>
  )
}

export default ProductCard
