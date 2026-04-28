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
  },
  async placeOrder(token, payload) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to place order');
    return result.data;
  },
  async getOrders(token) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to fetch orders');
    return result.data;
  },
  async getOrderDetails(token, orderId) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to fetch order details');
    return result.data;
  },
  async generateInvoice(token, orderId) {
    const response = await fetch(`${API_BASE_URL}/invoices/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order_id: orderId })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to generate invoice');
    return result.data;
  },
  async getInvoice(token, orderId) {
    const response = await fetch(`${API_BASE_URL}/invoices/order/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to fetch invoice');
    return result.data;
  }
};
