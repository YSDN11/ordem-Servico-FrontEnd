import api from "./api";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export async function login(userNameOrEmail, password) {

  const { data } = await api.post("/auth/login", {
    userNameOrEmail,
    password,
  });

  const token = data.token;

  localStorage.setItem(TOKEN_KEY, token);

  let user = null;
  try {
    const payload = jwtDecode(token);

    const roleClaim =
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
      payload.role ??
      payload.roles ??
      [];

    const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];

    user = {
      id: payload.sub,
      userName: payload.unique_name || payload.name || userNameOrEmail,
      email: payload.email,
      roles,
    };
  } catch (e) {
    user = {
      userName: userNameOrEmail,
      roles: [],
    };
  }

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