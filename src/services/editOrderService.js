import api from './api';

export async function getOrderAndTasksById(id) {
  const orderRes = await api.get('/orders/' + id);
  const tasksRes = await api.get('/tasks');
  return { ordem: orderRes.data, tasks: tasksRes.data };
}

export async function updateOrder(id, payload) {
  const { data } = await api.patch('/orders/' + id, payload);
  return data;
}

export async function createOrder(payload) {
  const { data } = await api.post('/orders', payload);
  return data;
}

export async function getOrdersAndTasks() {
  const ordersRes = await api.get('/orders');
  const tasksRes = await api.get('/tasks');
  return { orders: ordersRes.data, tasks: tasksRes.data };
}

export async function deleteOrder(id) {
  await api.delete('/orders/' + id);
  return true;
}
