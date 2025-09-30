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
