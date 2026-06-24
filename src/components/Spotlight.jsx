import React, { useEffect, useRef } from 'react'

// Luz radial que sigue al cursor dentro de su sección contenedora (la posicionada).
// Solo en dispositivos con puntero real; se desactiva con prefers-reduced-motion.
const Spotlight = ({ color = 'rgba(56,189,248,0.12)', size = 540 }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const host = el?.parentElement
    if (!el || !host) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
        el.style.opacity = '1'
      })
    }
    const onLeave = () => { el.style.opacity = '0' }

    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
      style={{ background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 28%), ${color}, transparent 60%)` }}
    />
  )
}

export default Spotlight
