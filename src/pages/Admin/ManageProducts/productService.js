// src/pages/Admin/ManageProducts/productService.js
import { fetchAllProducts } from '../../../api/productApi';
import { KEY_PRODUCTS } from '../../../utils/constants';

export function getProducts() {
  const raw = localStorage.getItem(KEY_PRODUCTS);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProducts(products) {
  localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
}

export async function seedProducts() {
  const existing = getProducts();
  if (existing.length > 0) return;

  const products = await fetchAllProducts();
  saveProducts(products);
}

//edit and delete 

// Delete a product by id
export function deleteProduct(id) {
  const products = getProducts();
  const updated = products.filter((p) => p.id !== id);
  saveProducts(updated);
}

// Update an existing product by id
export function updateProduct(id, updatedData) {
  const products = getProducts();
  const updated = products.map((p) =>
    p.id === id ? { ...p, ...updatedData } : p
  );
  saveProducts(updated);
}
