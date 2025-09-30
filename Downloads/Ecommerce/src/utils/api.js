export async function fetchProducts() {
  const res = await fetch('/src/data/products.json');
  if (!res.ok) throw new Error('No se pudieron cargar los productos');
  return await res.json();
}
