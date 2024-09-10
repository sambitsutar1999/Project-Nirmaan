// src/utils/auth.js

const ADMIN_CREDENTIALS = {
  username: 'sambit',
  password: '12345',
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

export const login = (username, password, isAdmin) => {
  if (isAdmin && username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const user = { username, role: 'admin' };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  } else if (!isAdmin) {
    // Here you can handle regular user login logic if needed
    // For now, we assume any non-admin login is successful
    const user = { username, role: 'user' };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};
