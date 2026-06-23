import React from 'react'
import Reveal from '../Reveal'

const BLOCKS = [
  {
    n: '01',
    t: 'Originales y sellados.',
    d: 'Comprados en tiendas oficiales del exterior. Nunca réplicas, nunca cajas abiertas.'
  },
  {
    n: '02',
    t: 'Vos preguntás, nosotros respondemos.',
    d: 'Atención uno a uno por WhatsApp, de principio a fin. Sin bots ni esperas eternas.'
  },
  {
    n: '03',
    t: 'Del mundo a tu puerta.',
    d: 'Nos encargamos de todo el proceso de importación y te lo entregamos donde estés.'
  }
]

const WhyUs = () => (
  <section className="bg-[#F8FAFC] py-24 sm:py-32">
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <Reveal className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-light/70">Por qué con nosotros</p>
        <h2 className="mt-2 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tightest text-navy">
          La diferencia Essential
        </h2>
      </Reveal>

      <div className="border-t border-black/10">
        {BLOCKS.map((b, i) => (
          <Reveal key={b.n} delay={i * 0.08}>
            <div className="grid items-start gap-2 border-b border-black/10 py-10 sm:grid-cols-[7rem,1fr] sm:gap-8 sm:py-14">
              <span className="text-5xl font-extrabold tracking-tightest text-navy/15 sm:text-6xl">{b.n}</span>
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{b.t}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">{b.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default WhyUs
