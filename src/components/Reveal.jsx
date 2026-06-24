import { motion, useReducedMotion } from 'framer-motion'

// Wrapper de entrada al scrollear (Framer Motion whileInView).
// Respeta prefers-reduced-motion: si está activo, el contenido aparece visible
// sin animación (nunca queda oculto).
const Reveal = ({ children, delay = 0, y = 24, className = '' }) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
