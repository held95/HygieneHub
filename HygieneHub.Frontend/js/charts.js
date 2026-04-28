let categoryChart = null;
let brandsChart = null;
let stockChart = null;

function initCharts() {
  const categoryCtx = document.getElementById('categoryChart').getContext('2d');
  categoryChart = new Chart(categoryCtx, {
    type: 'doughnut',
    data: { labels: [], datasets: [{ data: [], backgroundColor: ['#2563eb', '#7c3aed', '#059669'], borderWidth: 0, hoverOffset: 8 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 12 }, padding: 16 } },
      },
    },
  });

  const brandsCtx = document.getElementById('brandsChart').getContext('2d');
  brandsChart = new Chart(brandsCtx, {
    type: 'bar',
    data: { labels: [], datasets: [{ data: [], backgroundColor: '#2563eb', borderRadius: 6, borderSkipped: false }] },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Inter' } } },
        y: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 12 } } },
      },
    },
  });

  const stockCtx = document.getElementById('stockChart').getContext('2d');
  stockChart = new Chart(stockCtx, {
    type: 'bar',
    data: { labels: [], datasets: [{ label: 'Estoque', data: [], backgroundColor: (ctx) => ctx.raw < 50 ? '#ef4444' : '#2563eb', borderRadius: 6 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 10 }, maxRotation: 45 } },
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Inter' } } },
      },
    },
  });
}

function updateCharts(stats, products) {
  // Donut — por categoria
  const categories = Object.keys(stats.totalByCategory);
  categoryChart.data.labels = categories;
  categoryChart.data.datasets[0].data = categories.map(c => stats.totalByCategory[c]);
  categoryChart.update();

  // Barras horizontais — top marcas
  const brands = stats.topBrands.map(b => b.brand);
  const counts = stats.topBrands.map(b => b.count);
  brandsChart.data.labels = brands;
  brandsChart.data.datasets[0].data = counts;
  brandsChart.update();

  // Barras verticais — estoque por produto (top 10)
  const top10 = [...products].sort((a, b) => b.stockQuantity - a.stockQuantity).slice(0, 10);
  stockChart.data.labels = top10.map(p => p.name.split(' ').slice(0, 2).join(' '));
  stockChart.data.datasets[0].data = top10.map(p => p.stockQuantity);
  stockChart.update();
}
