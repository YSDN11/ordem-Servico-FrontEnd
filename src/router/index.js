import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import OrdersPage from '../pages/OrdersPage.vue';
import CreateOrderPage from '../pages/CreateOrderPage.vue';
import EditOrderPage from '../pages/EditOrderPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/createOrder',  name: 'CreateOrder',  component: CreateOrderPage },
  { path: '/orders',  name: 'Orders',  component: OrdersPage },
  { path: '/editOrder', name: 'EditOrder', component: EditOrderPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
