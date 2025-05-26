const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'varejo';

async function populate() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);

  const comentarios = [
    { produtoId: 1, comentario: "Ótima qualidade!", cliente: "Maria" },
    { produtoId: 2, comentario: "Muito confortável.", cliente: "João" },
    { produtoId: 3, comentario: "Veste bem!", cliente: "Ana" },
    { produtoId: 1, comentario: "Poderia ser mais barato.", cliente: "Carlos" },
    { produtoId: 2, comentario: "Durável e estiloso.", cliente: "Bruna" },
    { produtoId: 3, comentario: "Entrega rápida!", cliente: "Pedro" },
    { produtoId: 2, comentario: "Ficou pequeno, mas bonito.", cliente: "Lucia" },
    { produtoId: 1, comentario: "Uso no dia a dia.", cliente: "Renato" }
  ];

  await db.collection('comentarios').deleteMany({}); 
  await db.collection('comentarios').insertMany(comentarios);
  console.log('MongoDB populado com comentários!');
  await client.close();
}

populate();
