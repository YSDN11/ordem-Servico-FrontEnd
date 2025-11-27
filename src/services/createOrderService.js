// Serviço de ordens

// =====================
// Código usando json-server
// =====================

const JSON_SERVER_BASE = "http://localhost:3001";

export async function createOrder(payload) {
  const res = await fetch(`${JSON_SERVER_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Erro ao salvar a ordem (json-server).");
  }

  return await res.json();
}

export async function getOrdersAndTasks() {
  const [resOrders, resTasks] = await Promise.all([
    fetch(`${JSON_SERVER_BASE}/orders`),
    fetch(`${JSON_SERVER_BASE}/tasks`),
  ]);

  if (!resOrders.ok || !resTasks.ok) {
    throw new Error("Erro ao buscar dados (json-server).");
  }

  return {
    orders: await resOrders.json(),
    tasks: await resTasks.json(),
  };
}

export async function getOrderById(id) {
  const res = await fetch(`${JSON_SERVER_BASE}/orders/${id}`);

  if (!res.ok) {
    throw new Error("Ordem não encontrada (json-server).");
  }

  return await res.json();
}

export async function updateOrder(id, payload) {
  const res = await fetch(`${JSON_SERVER_BASE}/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar ordem (json-server).");
  }

  return await res.json();
}

export async function deleteOrder(id) {
  const res = await fetch(`${JSON_SERVER_BASE}/orders/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao excluir ordem (json-server).");
  }

  return true;
}

// =====================
// Código usando axios + back end real
// (deixe comentado para uso futuro)
// =====================

// import api from './api';

// export async function createOrder(payload) {
//   const { data } = api.post('/orders', payload);
//   return data;
// }

// export async function getOrdersAndTasks() {
//   const ordersRes = await api.get('/orders');
//   const tasksRes = await api.get('/tasks');
//   return { orders: ordersRes.data, tasks: tasksRes.data };
// }

// export async function getOrderById(id) {
//   const { data } = await api.get('/orders/' + id);
//   return data;
// }

// export async function updateOrder(id, payload) {
//   const { data } = await api.patch('/orders/' + id, payload);
//   return data;
// }

// export async function deleteOrder(id) {
//   await api.delete('/orders/' + id);
//   return true;
// }
