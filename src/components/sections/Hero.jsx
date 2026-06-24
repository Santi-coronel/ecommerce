import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const WA = `https://wa.me/5491160476175?text=${encodeURIComponent('Hola Essential Import, quisiera pedir una cotización')}`

const Hero = () => {
  const reduce = useReducedMotion()
  const item = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }
  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy px-5 pb-20 pt-16">
      {/* Aurora: manchas de color suaves en movimiento */}
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora-blob aurora-a left-[8%] top-[12%] h-[42vmax] w-[42vmax] bg-[#1B3A5B]" />
        <div className="aurora-blob aurora-b right-[2%] top-[8%] h-[34vmax] w-[34vmax] bg-[#3730a3]" />
        <div className="aurora-blob aurora-c bottom-[2%] left-[28%] h-[36vmax] w-[36vmax] bg-[#5b21b6]" />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-transparent to-navy" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Importación a pedido · Originales
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-7 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] tracking-tightest text-white text-balance"
        >
          Lo que buscás,
          <br />
          lo conseguimos.
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Perfumes, tecnología y gadgets importados. Originales, con seguimiento real y atención de una persona, no de un bot.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/products"
            className="w-full rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-white/10 sm:w-auto"
          >
            Ver catálogo
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] hover:bg-white/10 sm:w-auto"
          >
            Consultar por WhatsApp
          </a>
        </motion.div>
      </motion.div>

      <a
        href="#lo-ultimo"
        aria-label="Bajar al catálogo"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors hover:text-white"
      >
        <ArrowDown size={22} className="animate-floaty" />
      </a>
    </section>
  )
}

export default Hero
