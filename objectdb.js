const Datastore = require('nedb');
const db = new Datastore({ filename: './data/products.db', autoload: true });


const produtos = [
  { nome: 'Camiseta', categoria: 'Roupas', preco: 50.0, estoque: 100 },
  { nome: 'Tênis', categoria: 'Calçados', preco: 200.0, estoque: 40 },
  { nome: 'Calça Jeans', categoria: 'Roupas', preco: 120.0, estoque: 60 },
  { nome: 'Boné', categoria: 'Acessórios', preco: 35.0, estoque: 80 },
  { nome: 'Relógio', categoria: 'Acessórios', preco: 300.0, estoque: 25 },
  { nome: 'Jaqueta', categoria: 'Roupas', preco: 250.0, estoque: 30 },
  { nome: 'Meias', categoria: 'Roupas', preco: 15.0, estoque: 200 },
  { nome: 'Óculos de Sol', categoria: 'Acessórios', preco: 150.0, estoque: 45 },
  { nome: 'Sandália', categoria: 'Calçados', preco: 90.0, estoque: 70 },
  { nome: 'Bermuda', categoria: 'Roupas', preco: 60.0, estoque: 50 },
];


db.count({}, (err, count) => {
  if (count === 0) {
    db.insert(produtos, (err, newDocs) => {
      if (!err) console.log('Produtos inseridos no NeDB (ObjectDB simulado).');
    });
  }
});


function getProducts() {
  return new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      if (err) reject(err);
      else resolve(docs);
    });
  });
}

module.exports = { getProducts };
