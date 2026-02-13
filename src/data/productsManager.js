import { products } from "./products";

// 🔹 Récupère tous les produits
export function getProducts() {
  return products;
}

// 🔹 AJOUTER un produit
export function addProduct(newProduct) {
  // Génère un id unique si absent
  if (!newProduct.id) newProduct.id = Date.now();
  products.push(newProduct);
  return products;
}

// 🔹 SUPPRIMER un produit par id
export function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) products.splice(index, 1);
  return products;
}

// 🔹 METTRE À JOUR un produit
export function updateProduct(updatedProduct) {
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) products[index] = { ...products[index], ...updatedProduct };
  return products;
}

// 🔹 FAVORIS
export function getFavorites() {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  return favs;
}

export function addToFavorites(product) {
  const favs = getFavorites();
  if (!favs.some(p => p.id === product.id)) {
    favs.push(product);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
  return favs;
}

export function removeFromFavorites(id) {
  const favs = getFavorites().filter(p => p.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favs));
  return favs;
}
