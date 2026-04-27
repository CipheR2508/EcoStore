const API_BASE_URL = '/api/v1';

export const api = {
  async getProducts(params = { page: 1, limit: 12 }) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${query}`);
    const result = await response.json();
    return result.data;
  },
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const result = await response.json();
    return result.data;
  },
  async getProductBySlug(slug) {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`);
    const result = await response.json();
    return result.data;
  },
  async getProfile(token) {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    return result.data;
  }
};
