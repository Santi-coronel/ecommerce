import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

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

const WhyUs = () => {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-surface py-28 sm:py-40">
      {/* Textura de puntos, difuminada hacia los bordes */}
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="mb-14 max-w-3xl text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[1.02] tracking-tightest text-ink text-balance sm:mb-20">
          La diferencia <span className="text-navy-light">Essential</span>
        </h2>

        <div className="border-t border-black/10">
          {BLOCKS.map((b, i) => (
            <motion.div
              key={i}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 border-b border-black/10 py-9 sm:grid-cols-[1fr_1.4fr] sm:gap-12 sm:py-14"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.8rem]">{b.t}</h3>
              <p className="max-w-prose text-base leading-relaxed text-body sm:text-lg">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
