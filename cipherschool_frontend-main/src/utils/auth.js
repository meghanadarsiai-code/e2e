export const AUTH_TOKEN_KEY = "token";
export const AUTH_USER_KEY = "user";

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const getUser = () => {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

export const persistAuth = ({ token, user }) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const isAuthenticated = () => Boolean(getToken() && getUser());

export const isAdmin = () => getUser()?.role === "admin";
