import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WA = `https://wa.me/5491160476175?text=${encodeURIComponent('Hola Essential Import, quisiera pedir una cotización')}`

const FinalCta = () => (
  <section className="relative overflow-hidden bg-navy px-5 py-32 text-center sm:py-40">
    <div className="pointer-events-none absolute inset-0">
      <div className="aurora-blob aurora-b left-1/2 top-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 bg-[#3730a3] opacity-30" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto max-w-3xl"
    >
      <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold leading-[1.05] tracking-tightest text-white">
        Lo que buscás,
        <br />
        lo conseguimos.
      </h2>

      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-semibold text-navy transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-white/10"
      >
        <MessageCircle size={20} />
        Pedí tu cotización
      </a>

      <p className="mt-6 text-sm text-muted">Te respondemos por WhatsApp, normalmente en minutos.</p>
    </motion.div>
  </section>
)

export default FinalCta
