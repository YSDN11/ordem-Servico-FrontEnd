import { createRouter, createWebHistory } from 'vue-router';
import { getStoredToken, getStoredUser } from '../services/authService';
import LoginPage from '../pages/LoginPage.vue';
import OrdersPage from '../pages/OrdersPage.vue';
import CreateOrderPage from '../pages/CreateOrderPage.vue';
import EditOrderPage from '../pages/EditOrderPage.vue';
import TaskPage from '../pages/TaskPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/createOrder',  name: 'CreateOrder',  component: CreateOrderPage, meta: { requiresAuth: true } },
  { path: '/orders',  name: 'Orders',  component: OrdersPage, meta: { requiresAuth: true } },
  { path: '/editOrder', name: 'EditOrder', component: EditOrderPage, meta: { requiresAuth: true } },
  { path: '/tasks', name: 'Tasks', component: TaskPage, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/register', name: 'Register', component: RegisterPage, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next();

  const token = getStoredToken();
  if (!token) return next({ path: '/login' });

  const user = getStoredUser();
  const userRoles = user?.roles || [];

  if (to.meta.roles && to.meta.roles.length > 0) {
    const hasRole = to.meta.roles.some(r => userRoles.includes(r));
    if (!hasRole) return next('/orders');
  }

  next();
});

export default router;
