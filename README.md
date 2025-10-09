# Ecommerce React + Firebase — Entrega Final

## Qué contiene
- Proyecto base en React (Vite)
- Productos cargados desde Firestore
- Carrito (Context API)
- Checkout que guarda la orden en Firestore

## Cómo usar
1. `npm install`
2. `npm run dev`
3. Abrir `http://localhost:5173`

## Notas
- La configuración de Firebase ya está en `src/services/firebase.js` (usá tu proyecto real si necesitás cambiarla).
- Crea la colección `products` en Firestore con documentos que tengan: `title`, `price`, `stock`, `image`.
