export function renderProducts(products) {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="productos-grid"></div>';
  const grid = app.querySelector('.productos-grid');

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button data-id="${p.id}">Agregar al carrito</button>
    `;
    grid.appendChild(card);
  });
}
import { useCart } from "../context/CartContext";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="producto-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
    </div>
  );
}
