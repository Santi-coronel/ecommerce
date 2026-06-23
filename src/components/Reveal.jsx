import { motion } from 'framer-motion'

// Wrapper de entrada al scrollear (Framer Motion whileInView).
// Usamos `amount` (porcentaje visible) en vez de `margin`: con margin negativo
// las últimas secciones no llegan a entrar en la zona de detección y quedan invisibles.
const Reveal = ({ children, delay = 0, y = 24, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

export default Reveal
