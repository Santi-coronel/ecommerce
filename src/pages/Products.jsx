import React from 'react'
import ProductList from '../components/ProductList'

const Products = () => (
  <div className="relative min-h-screen bg-surface">
    {/* Wash de profundidad para que el blanco no sea plano */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-navy/[0.05] to-transparent" />

    <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="mb-10 sm:mb-14">
        <h1 className="text-[clamp(2.4rem,6vw,3.8rem)] font-extrabold tracking-tightest text-ink text-balance">
          Catálogo
        </h1>
        <p className="mt-3 max-w-xl text-base text-body sm:text-lg">
          Perfumes, tecnología, gadgets y más — importados a pedido o en stock.
        </p>
      </header>
      <ProductList />
    </div>
  </div>
)

export default Products
