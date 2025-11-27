// Serviço de ordens centralizado

// =====================
// Código usando json-server
// =====================

const JSON_SERVER_BASE = 'http://localhost:3001';

export async function getOrdersAndTasks() {
  const [resOrders, resTasks] = await Promise.all([
    fetch(`${JSON_SERVER_BASE}/orders`),
    fetch(`${JSON_SERVER_BASE}/tasks`)
  ]);

  if (!resOrders.ok || !resTasks.ok) {
    throw new Error('Erro ao buscar dados (json-server).');
  }

  return {
    orders: await resOrders.json(),
    tasks: await resTasks.json()
  };
}

export async function deleteOrder(id) {
  const res = await fetch(`${JSON_SERVER_BASE}/orders/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error('Erro ao excluir ordem (json-server).');
  }

  return true;
}

// =====================
// Código usando axios + back end real
// (deixe comentado para uso futuro)
// =====================

// import api from './api';
//
// export async function getOrdersAndTasks() {
//   const ordersRes = await api.get('/orders');
//   const tasksRes = await api.get('/tasks');
//   return { orders: ordersRes.data, tasks: tasksRes.data };
// }
//
// export async function deleteOrder(id) {
//   await api.delete('/orders/' + id);
//   return true;
// }
