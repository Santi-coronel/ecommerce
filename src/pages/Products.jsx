import React from 'react'
import ProductList from '../components/ProductList'

const Products = () => (
  <div className="min-h-screen bg-surface">
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tightest text-ink text-balance">
          Catálogo
        </h1>
        <p className="mt-2 max-w-xl text-body">
          Perfumes, tecnología, gadgets y más — importados a pedido o en stock.
        </p>
      </header>
      <ProductList />
    </div>
  </div>
)

export default Products
