const STORAGE_KEY = "PHINA_PRODUCTS";

export function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();
  products.push({ id: Date.now(), ...product });
  saveProducts(products);
}

export function updateProduct(updated) {
  const products = getProducts().map((p) =>
    p.id === updated.id ? updated : p
  );
  saveProducts(products);
}

export function deleteProduct(id) {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
}
