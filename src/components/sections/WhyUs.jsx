import React from 'react'
import Reveal from '../Reveal'

const BLOCKS = [
  {
    t: 'Originales y sellados.',
    d: 'Comprados en tiendas oficiales del exterior. Nunca réplicas, nunca cajas abiertas.'
  },
  {
    t: 'Vos preguntás, nosotros respondemos.',
    d: 'Atención uno a uno por WhatsApp, de principio a fin. Sin bots ni esperas eternas.'
  },
  {
    t: 'Del mundo a tu puerta.',
    d: 'Nos encargamos de todo el proceso de importación y te lo entregamos donde estés.'
  }
]

const WhyUs = () => (
  <section className="bg-surface py-24 sm:py-32">
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <Reveal className="mb-12 sm:mb-16">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tightest text-ink text-balance">
          La diferencia Essential
        </h2>
      </Reveal>

      <div className="border-t border-black/10">
        {BLOCKS.map((b, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="grid gap-3 border-b border-black/10 py-10 sm:grid-cols-[1fr_1.4fr] sm:gap-12 sm:py-14">
              <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">{b.t}</h3>
              <p className="max-w-prose text-base leading-relaxed text-body sm:text-lg">{b.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default WhyUs
