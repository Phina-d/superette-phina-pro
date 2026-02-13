const CLIENTS_KEY = "PHINA_CLIENTS";

export function getClients() {
  return JSON.parse(localStorage.getItem(CLIENTS_KEY)) || [];
}

export function saveClients(clients) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

export function addClient(client) {
  const clients = getClients();
  clients.push({ id: Date.now(), ...client });
  saveClients(clients);
}

export function updateClient(updated) {
  const clients = getClients().map((c) =>
    c.id === updated.id ? updated : c
  );
  saveClients(clients);
}

export function deleteClient(id) {
  const clients = getClients().filter((c) => c.id !== id);
  saveClients(clients);
}
