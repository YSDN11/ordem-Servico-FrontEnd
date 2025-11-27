import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import OrdersPage from '../pages/OrdersPage.vue';
import CreateOrderPage from '../pages/CreateOrderPage.vue';
import EditOrderPage from '../pages/EditOrderPage.vue';
import TaskPage from '../pages/TaskPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/createOrder',  name: 'CreateOrder',  component: CreateOrderPage },
  { path: '/orders',  name: 'Orders',  component: OrdersPage },
  { path: '/editOrder', name: 'EditOrder', component: EditOrderPage},
  { path: '/tasks', name: 'Tasks', component: TaskPage},
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next();

  const token = getStoredToken();
  if (!token) {
    return next({ path: '/login' });
  }

  next();
});

export default router;
