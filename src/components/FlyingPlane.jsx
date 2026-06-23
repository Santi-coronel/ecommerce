import React from 'react'
import { motion } from 'framer-motion'

// Avioncito decorativo (silueta rellena + estela) que cruza la pantalla en loop.
// fixed + pointer-events-none: vuela sobre todo sin bloquear clicks.
// motion-reduce:hidden -> se oculta si el usuario prefiere menos movimiento.
const FlyingPlane = () => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none fixed left-0 top-0 z-40 flex items-center gap-1.5 motion-reduce:hidden"
    initial={{ x: '-14vw', y: '20vh' }}
    animate={{ x: '116vw', y: ['20vh', '12vh', '26vh', '16vh'] }}
    transition={{
      x: { duration: 19, repeat: Infinity, ease: 'linear' },
      y: { duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
    }}
  >
    {/* estela */}
    <span className="h-[2px] w-3 rounded-full bg-sky-400/15" />
    <span className="h-[2px] w-4 rounded-full bg-sky-400/30" />
    <span className="h-[2px] w-6 rounded-full bg-sky-400/50" />
    {/* avión (silueta rellena, apuntando a la derecha) */}
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      className="rotate-90 drop-shadow-[0_2px_7px_rgba(56,189,248,0.55)]"
      fill="#38bdf8"
      stroke="#0ea5e9"
      strokeWidth="0.4"
      strokeLinejoin="round"
    >
      <path d="M22 16v-2l-8-5V3.5C14 2.67 13.33 2 12.5 2S11 2.67 11 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l8 2.5z" />
    </svg>
  </motion.div>
)

export default FlyingPlane
