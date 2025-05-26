const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  // Tabelas dimensões
  db.run(`CREATE TABLE tempo (id INTEGER PRIMARY KEY, ano INTEGER, mes INTEGER)`);
  db.run(`CREATE TABLE produto (id INTEGER PRIMARY KEY, nome TEXT, categoria TEXT)`);

  // Fato de vendas
  db.run(`
    CREATE TABLE vendas (
      id INTEGER PRIMARY KEY,
      produto_id INTEGER,
      tempo_id INTEGER,
      quantidade INTEGER,
      total REAL,
      FOREIGN KEY(produto_id) REFERENCES produto(id),
      FOREIGN KEY(tempo_id) REFERENCES tempo(id)
    )`);

  // Fato de histórico de estoque e preço
  db.run(`
    CREATE TABLE historico_preco_estoque (
      id INTEGER PRIMARY KEY,
      produto_id INTEGER,
      tempo_id INTEGER,
      preco REAL,
      estoque INTEGER,
      FOREIGN KEY(produto_id) REFERENCES produto(id),
      FOREIGN KEY(tempo_id) REFERENCES tempo(id)
    )`);

  // Dimensão tempo
  db.run(`INSERT INTO tempo VALUES (1, 2024, 1), (2, 2024, 2), (3, 2024, 3), (4, 2024, 4), (5, 2024, 5)`);

  // Produtos
  db.run(`INSERT INTO produto VALUES 
    (1, 'Camiseta', 'Roupas'), 
    (2, 'Tênis', 'Calçados'),
    (3, 'Calça Jeans', 'Roupas')`);

  // Vendas
  db.run(`INSERT INTO vendas VALUES 
    (1, 1, 1, 20, 1000.0),
    (2, 1, 2, 15, 750.0),
    (3, 2, 3, 5, 1000.0),
    (4, 3, 4, 8, 640.0),
    (5, 2, 5, 10, 2000.0)`);

  // Histórico de preço e estoque
  db.run(`INSERT INTO historico_preco_estoque VALUES
    (1, 1, 1, 50.0, 100),
    (2, 1, 2, 50.0, 90),
    (3, 1, 3, 45.0, 70),
    (4, 2, 3, 200.0, 30),
    (5, 3, 4, 80.0, 20),
    (6, 2, 5, 210.0, 25)`);
});

function getSalesReport() {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT p.nome AS produto, t.ano, t.mes, v.quantidade, v.total
      FROM vendas v
      JOIN produto p ON v.produto_id = p.id
      JOIN tempo t ON v.tempo_id = t.id
      ORDER BY t.ano, t.mes
    `, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getHistoricPriceStock() {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT p.nome AS produto, t.ano, t.mes, h.preco, h.estoque
      FROM historico_preco_estoque h
      JOIN produto p ON h.produto_id = p.id
      JOIN tempo t ON h.tempo_id = t.id
      ORDER BY t.ano, t.mes
    `, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { getSalesReport, getHistoricPriceStock };
