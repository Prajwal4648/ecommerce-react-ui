// src/pages/Admin/ManageUsers/userService.js
import { fetchAllUsers } from '../../../api/userApi';
import { KEY_USERS } from '../../../utils/constants';

export function getUsers() {
  const raw = localStorage.getItem(KEY_USERS);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

export async function seedUsers() {
  const existing = getUsers();
  if (existing.length > 0) return;

  const users = await fetchAllUsers();
  saveUsers(users);
}
