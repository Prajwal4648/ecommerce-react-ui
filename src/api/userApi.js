const USER_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all users from Fake Store API
 * @returns {Promise<Array>} Array of user objects
 */
export async function fetchAllUsers() {
  const response = await fetch(`${USER_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

/**
 * Fetch a single user by ID
 * @param {number|string} id - User ID
 * @returns {Promise<Object>} User object
 */
export async function fetchUserById(id) {
  const response = await fetch(`${USER_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }
  return response.json();
}
