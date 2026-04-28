let allProducts = [];
let editingId = null;

// ── Bootstrap ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initCharts();
  await loadAll();
  bindEvents();
});

async function loadAll() {
  try {
    showLoading(true);
    const [products, stats] = await Promise.all([api.getProducts(), api.getStats()]);
    allProducts = products;
    renderStats(stats);
    renderTable(products);
    updateCharts(stats, products);
  } catch (err) {
    showToast('Erro ao conectar com a API. Verifique a URL em api.js.', 'error');
    console.error(err);
  } finally {
    showLoading(false);
  }
}

// ── Stats Cards ─────────────────────────────────────────────────────────────
function renderStats(stats) {
  document.getElementById('stat-total').textContent = stats.totalProducts;
  const categories = Object.keys(stats.totalByCategory).length;
  document.getElementById('stat-categories').textContent = categories;
  const avgAll = Object.values(stats.averagePriceByCategory);
  const globalAvg = avgAll.length ? (avgAll.reduce((a, b) => a + b, 0) / avgAll.length).toFixed(2) : '0.00';
  document.getElementById('stat-avg-price').textContent = `R$ ${globalAvg}`;
  document.getElementById('stat-low-stock').textContent = stats.lowStockCount;
}

// ── Table ───────────────────────────────────────────────────────────────────
function renderTable(products) {
  const tbody = document.getElementById('products-tbody');
  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Nenhum produto encontrado</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${p.id}</td>
      <td><strong>${escHtml(p.name)}</strong></td>
      <td><span class="badge badge-${p.category.toLowerCase()}">${escHtml(p.category)}</span></td>
      <td>${escHtml(p.brand)}</td>
      <td>R$ ${p.price.toFixed(2)}</td>
      <td class="${p.stockQuantity < 50 ? 'low-stock' : ''}">${p.stockQuantity}</td>
      <td class="actions">
        <button class="btn-icon btn-edit" onclick="openEditModal(${p.id})" title="Editar">✏️</button>
        <button class="btn-icon btn-delete" onclick="confirmDelete(${p.id}, '${escHtml(p.name)}')" title="Excluir">🗑️</button>
      </td>
    </tr>
  `).join('');
}

// ── Search & Filter ─────────────────────────────────────────────────────────
function bindEvents() {
  document.getElementById('search-input').addEventListener('input', filterProducts);
  document.getElementById('category-filter').addEventListener('change', filterProducts);
  document.getElementById('btn-new').addEventListener('click', openCreateModal);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('product-form').addEventListener('submit', handleSubmit);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
}

function filterProducts() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-filter').value;
  const filtered = allProducts.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search);
    const matchCategory = !category || p.category === category;
    return matchSearch && matchCategory;
  });
  renderTable(filtered);
}

// ── Modal ───────────────────────────────────────────────────────────────────
function openCreateModal() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'Novo Produto';
  document.getElementById('product-form').reset();
  document.getElementById('modal-overlay').classList.add('active');
}

function openEditModal(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  editingId = id;
  document.getElementById('modal-title').textContent = 'Editar Produto';
  document.getElementById('field-name').value = product.name;
  document.getElementById('field-category').value = product.category;
  document.getElementById('field-brand').value = product.brand;
  document.getElementById('field-price').value = product.price;
  document.getElementById('field-stock').value = product.stockQuantity;
  document.getElementById('field-description').value = product.description;
  document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  editingId = null;
}

async function handleSubmit(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('field-name').value,
    category: document.getElementById('field-category').value,
    brand: document.getElementById('field-brand').value,
    price: parseFloat(document.getElementById('field-price').value),
    stockQuantity: parseInt(document.getElementById('field-stock').value),
    description: document.getElementById('field-description').value,
  };

  try {
    if (editingId) {
      await api.updateProduct(editingId, data);
      showToast('Produto atualizado com sucesso!');
    } else {
      await api.createProduct(data);
      showToast('Produto criado com sucesso!');
    }
    closeModal();
    await loadAll();
  } catch (err) {
    showToast('Erro ao salvar produto.', 'error');
  }
}

async function confirmDelete(id, name) {
  if (!confirm(`Confirmar exclusão de "${name}"?`)) return;
  try {
    await api.deleteProduct(id);
    showToast('Produto excluído.');
    await loadAll();
  } catch {
    showToast('Erro ao excluir produto.', 'error');
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'flex' : 'none';
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast toast-${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
