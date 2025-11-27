import api from './api';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export async function login(userNameOrEmail, password) {
  const { data } = await api.post('/auth/login', {
    userNameOrEmail,
    password
  });

  const { token, user } = data;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { token, user };
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}