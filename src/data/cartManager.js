const CART_KEY = "phina_cart";
const FAV_KEY = "phina_favorites";

// ===== PANIER =====
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((p) => p.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
}

export function increaseQty(id) {
  const cart = getCart();
  const item = cart.find((p) => p.id === id);
  if (item) item.qty += 1;
  saveCart(cart);
}

export function decreaseQty(id) {
  let cart = getCart();
  const item = cart.find((p) => p.id === id);

  if (item) {
    item.qty -= 1;
    if (item.qty <= 0) {
      cart = cart.filter((p) => p.id !== id);
    }
  }

  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = getCart().filter((p) => p.id !== id);
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

// ===== FAVORIS =====
export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
}

export function saveFavorites(favs) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
}

export function addToFavorites(product) {
  const favs = getFavorites();
  const exists = favs.find((p) => p.id === product.id);

  if (!exists) {
    favs.push(product);
    saveFavorites(favs);
  }
}

export function removeFromFavorites(id) {
  const favs = getFavorites().filter((p) => p.id !== id);
  saveFavorites(favs);
}
