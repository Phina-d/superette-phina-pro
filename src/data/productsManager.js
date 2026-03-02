import { products as defaultProducts } from "./products";

const STORAGE_KEY = "PHINA_PRODUCTS";

export function getProducts() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

  // Si aucun produit en localStorage
  if (!stored || stored.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }

  // 🔥 Fusion automatique (garde anciens + ajoute nouveaux)
  const merged = [...stored];

  defaultProducts.forEach((def) => {
    const exists = merged.find((p) => p.id === def.id);
    if (!exists) {
      merged.push(def);
    }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
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