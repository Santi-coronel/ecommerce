import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import Reveal from '../Reveal'

const QA = [
  {
    q: '¿Los productos son originales?',
    a: 'Sí, 100%. Importamos únicamente productos originales y nuevos, comprados en tiendas oficiales del exterior. Nunca réplicas.'
  },
  {
    q: '¿Cuánto tarda en llegar?',
    a: 'Lo que está en stock se entrega en CABA en el día. Lo que es a pedido depende del origen, y te confirmamos el plazo exacto antes de que cierres la compra.'
  },
  {
    q: '¿Cómo puedo pagar?',
    a: 'Coordinamos el medio de pago por WhatsApp según el caso: efectivo, transferencia y otras opciones. Siempre te dejamos todo claro antes de avanzar.'
  },
  {
    q: '¿Hacen envíos a todo el país?',
    a: 'Sí. En CABA con motomensajería 24/7 y al resto del país por correo a domicilio, a cualquier punto de Argentina.'
  },
  {
    q: '¿Qué pasa si el producto no llega?',
    a: 'No te dejamos solo. Si surge cualquier inconveniente con la entrega, lo resolvemos con vos hasta que llegue, o te devolvemos tu dinero.'
  }
]

const Faq = () => {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="mb-12">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tightest text-ink text-balance">
            Lo que más nos preguntan
          </h2>
        </Reveal>

        <Reveal className="border-t border-black/10">
          {QA.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-black/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-medium tracking-tight text-ink sm:text-xl">{item.q}</span>
                  <Plus
                    size={22}
                    className={`shrink-0 text-navy-light transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-base leading-relaxed text-body">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default Faq
