// Troque pela URL do Railway após o deploy
const API_BASE_URL = window.API_BASE_URL || 'http://localhost:5000';

const api = {
  async getProducts(search = '', category = '') {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    const res = await fetch(`${API_BASE_URL}/api/products?${params}`);
    if (!res.ok) throw new Error('Erro ao buscar produtos');
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${API_BASE_URL}/api/products/stats`);
    if (!res.ok) throw new Error('Erro ao buscar estatísticas');
    return res.json();
  },

  async createProduct(data) {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao criar produto');
    return res.json();
  },

  async updateProduct(id, data) {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao atualizar produto');
    return res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erro ao deletar produto');
  },
};
