import React from 'react'
import Reveal from '../Reveal'

const STEPS = [
  { n: '01', t: 'Cotizás',    d: 'Nos decís qué buscás, por WhatsApp o desde la web. Sin compromiso.' },
  { n: '02', t: 'Confirmás',  d: 'Te pasamos precio final y plazo real. Vos confirmás y coordinamos el pago.' },
  { n: '03', t: 'Importamos', d: 'Compramos el producto original en el exterior y lo traemos hasta acá.' },
  { n: '04', t: 'Recibís',    d: 'Lo entregamos en CABA o lo enviamos a todo el país, con seguimiento.' }
]

const HowItWorks = () => (
  <section id="como-funciona" className="bg-navy py-24 sm:py-32">
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      <Reveal className="mb-16">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tightest text-white text-balance">
          Así funciona
        </h2>
      </Reveal>

      <div className="relative pl-2">
        <div className="absolute bottom-6 left-8 top-6 w-px bg-white/10" />
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08} className="relative flex gap-6 pb-12 last:pb-0">
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-navy text-sm font-bold text-white">
              {s.n}
            </div>
            <div className="pt-2.5">
              <h3 className="text-xl font-semibold tracking-tight text-white">{s.t}</h3>
              <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default HowItWorks
