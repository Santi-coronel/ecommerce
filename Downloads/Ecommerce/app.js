import { fetchProducts } from './src/utils/api.js';
import { renderProducts } from './src/components/productCard.js';

export async function initApp() {
  try {
    const products = await fetchProducts();
    renderProducts(products);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}
