import api from '../services/api';

export async function getOrdersAndTasks(page = 1, pageSize = 5, search = '') {
  const ordersRes = await api.get('/orders', {
    params: { page, pageSize, search }
  });
  const tasksRes = await api.get('/tasks');

  return {
    orders: ordersRes.data.items,
    totalOrders: ordersRes.data.total,
    tasks: tasksRes.data
  };
}

export async function deleteOrder(id) {
  await api.delete('/orders/' + id);
  return true;
}
