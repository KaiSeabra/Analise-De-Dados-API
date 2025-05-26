const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'varejo';

async function getComments() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const comentarios = await db.collection('comentarios').find().toArray();
  await client.close();
  return comentarios;
}

module.exports = { getComments };
