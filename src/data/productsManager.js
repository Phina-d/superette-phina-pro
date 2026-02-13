import { products } from "./products";

// 🔹 Récupère tous les produits
export function getProducts() {
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
export function updateProduct(id, newData) {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...newData };
  }
  return products[index];
}
