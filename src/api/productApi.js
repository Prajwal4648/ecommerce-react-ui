const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from Fake Store API
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchAllProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

/**
 * Fetch a single product by ID
 * @param {number|string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}`);
  }
  return response.json();
}
