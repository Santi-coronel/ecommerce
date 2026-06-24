import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WA = `https://wa.me/5491160476175?text=${encodeURIComponent('Hola Essential Import, quisiera pedir una cotización')}`

const LINE1 = ['Lo', 'que', 'buscás,']
const LINE2 = ['lo', 'conseguimos.']

const FinalCta = () => {
  const reduce = useReducedMotion()
  const word = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: '0.4em' }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }
  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.09 } } }

  return (
    <section className="relative overflow-hidden bg-navy px-5 py-32 text-center sm:py-48">
      {/* Glow propio (distinto del hero) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3730a3] opacity-25 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.98] tracking-tightest text-white text-balance"
        >
          <span className="block">
            {LINE1.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}{i < LINE1.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {LINE2.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}{i < LINE2.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </span>
        </motion.h2>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.5 }}
        >
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-semibold text-navy transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-white/10"
          >
            <MessageCircle size={20} />
            Pedí tu cotización
          </a>
          <p className="mt-6 text-sm text-white/55">Te respondemos por WhatsApp, normalmente en minutos.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCta
