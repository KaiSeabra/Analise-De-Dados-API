const express = require('express');
const { getProducts } = require('./objectdb');
const { getComments } = require('./mongodb');
const { getSalesReport, getHistoricPriceStock } = require('./warehouse');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/products', async (req, res) => res.json(await getProducts()));
app.get('/comments', async (req, res) => res.json(await getComments()));
app.get('/sales-report', async (req, res) => res.json(await getSalesReport()));
app.get('/historic', async (req, res) => res.json(await getHistoricPriceStock()));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
