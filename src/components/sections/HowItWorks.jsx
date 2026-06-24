import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const STEPS = [
  { n: '01', t: 'Cotizás',    d: 'Nos decís qué buscás, por WhatsApp o desde la web. Sin compromiso.' },
  { n: '02', t: 'Confirmás',  d: 'Te pasamos precio final y plazo real. Vos confirmás y coordinamos el pago.' },
  { n: '03', t: 'Importamos', d: 'Compramos el producto original en el exterior y lo traemos hasta acá.' },
  { n: '04', t: 'Recibís',    d: 'Lo entregamos en CABA o lo enviamos a todo el país, con seguimiento.' }
]

const HowItWorks = () => {
  const reduce = useReducedMotion()

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-navy py-28 sm:py-40">
      {/* Profundidad: glow lateral + filo de luz superior */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-[12%] top-[20%] h-[32vmax] w-[32vmax] rounded-full bg-[#1B3A5B]/40 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="mb-16 text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-tightest text-white text-balance">
          Así funciona
        </h2>

        <div className="relative">
          {/* Línea base + línea que se dibuja al entrar en viewport */}
          <div className="absolute left-5 top-3 bottom-3 w-px bg-white/10" />
          <motion.div
            aria-hidden="true"
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reduce ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-5 top-3 bottom-3 w-px origin-top bg-gradient-to-b from-sky-400/70 via-sky-400/30 to-transparent"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-6 pb-14 last:pb-0"
            >
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-navy text-sm font-bold text-sky-300">
                {s.n}
              </span>
              <div className="relative pt-1">
                {/* Número ghost grande: textura tipográfica (solo desktop) */}
                <span className="pointer-events-none absolute -top-6 right-0 hidden select-none text-[6rem] font-extrabold leading-none tracking-tightest text-white/[0.05] sm:block">
                  {s.n}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{s.t}</h3>
                <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
