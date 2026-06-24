import React from 'react'

// Editá las marcas que conseguís
const BRANDS = [
  'Apple', 'JBL', "Victoria's Secret", 'Sony', 'Samsung',
  'Nike', 'Dyson', 'PlayStation', 'Adidas', 'Lattafa'
]

const BrandMarquee = () => (
  <section className="border-b border-white/10 bg-navy py-12">
    <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.22em] text-muted">
      Algunas de las marcas que te conseguimos
    </p>
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap pr-16">
        {[...BRANDS, ...BRANDS].map((b, i) => (
          <span key={i} className="text-xl font-semibold tracking-tight text-white/55 transition-colors duration-200 hover:text-white sm:text-2xl">
            {b}
          </span>
        ))}
      </div>
    </div>
  </section>
)

export default BrandMarquee
