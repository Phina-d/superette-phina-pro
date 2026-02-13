const ORDER_KEY = "PHINA_ORDERS";

export function getOrders() {
  return JSON.parse(localStorage.getItem(ORDER_KEY)) || [];
}

export function saveOrders(orders) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

export function addOrder(order) {
  const orders = getOrders();
  orders.push({
    id: Date.now(),
    status: "En cours",
    date: new Date().toLocaleDateString(),
    ...order,
  });
  saveOrders(orders);
}

export function updateOrderStatus(id, status) {
  const orders = getOrders().map((o) =>
    o.id === id ? { ...o, status } : o
  );
  saveOrders(orders);
}
