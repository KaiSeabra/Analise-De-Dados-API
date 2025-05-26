function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatMonthYear(ano, mes) {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return `${meses[mes - 1] || mes}/${ano}`;
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erro ao buscar ${url}: ${response.statusText}`);
  return await response.json();
}

async function loadDashboard() {
  try {
    const products = await fetchData('/products');
    const tbodyProducts = document.querySelector('#products-table tbody');
    tbodyProducts.innerHTML = '';
    products.forEach(p => {
      const id = p.id !== undefined ? p.id : (p._id || 'N/A');
      tbodyProducts.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${id}</td>
          <td>${p.nome || 'N/A'}</td>
          <td>${p.categoria || 'N/A'}</td>
          <td>${formatCurrency(p.preco || 0)}</td>
        </tr>`);
    });

    const comments = await fetchData('/comments');
    const tbodyComments = document.querySelector('#comments-table tbody');
    tbodyComments.innerHTML = '';
    comments.forEach(c => {
      tbodyComments.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${c._id || 'N/A'}</td>
          <td>${c.produtoId || 'N/A'}</td>
          <td>${c.cliente || 'N/A'}</td>
          <td>${c.comentario || ''}</td>
        </tr>`);
    });

    const salesReport = await fetchData('/sales-report');
    const tbodySales = document.querySelector('#sales-report-table tbody');
    tbodySales.innerHTML = '';
    salesReport.forEach(s => {
      const produto = s.produto || 'N/A';
      const data = formatMonthYear(s.ano, s.mes);
      const quantidade = s.quantidade || 0;
      const total = s.total || 0;
      tbodySales.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${produto}</td>
          <td>${data}</td>
          <td>${quantidade}</td>
          <td>${formatCurrency(total)}</td>
        </tr>`);
    });

    const historic = await fetchData('/historic');
    const tbodyHistoric = document.querySelector('#historic-table tbody');
    tbodyHistoric.innerHTML = '';
    historic.forEach(h => {
      const produto = h.produto || 'N/A';
      const data = formatMonthYear(h.ano, h.mes);
      const preco = h.preco || 0;
      const estoque = h.estoque || 0;
      tbodyHistoric.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${produto}</td>
          <td>${data}</td>
          <td>${formatCurrency(preco)}</td>
          <td>${estoque}</td>
        </tr>`);
    });

  } catch (error) {
    alert('Erro ao carregar dados: ' + error.message);
    console.error(error);
  }
}

window.onload = loadDashboard;
