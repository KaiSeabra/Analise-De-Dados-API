# Analise De Dados API 📊🛍️

API de análise de dados de varejo usando múltiplos paradigmas de banco de dados: objeto-relacional, NoSQL e Data Warehouse.

## Funcionalidades ✨

* 📦 Cadastro e listagem de produtos (modelo objeto-relacional com NeDB)  
* 💬 Armazenamento de comentários de clientes (MongoDB)  
* 📈 Data Warehouse com histórico de vendas (SQLite)  
* ⏳ Análise temporal de preços e estoque ao longo do tempo  
* 🔗 API REST com Express para acesso aos dados  
* 🖥️ Dashboard web simples para visualização rápida dos dados  

## Tecnologias 🛠️

* Node.js  
* Express.js  
* NeDB (substituto leve do ObjectDB)  
* MongoDB  
* SQLite (Data Warehouse)  
* sqlite3  

## Instalação ⚙️

1. **Clone o repositório**

```bash
git clone https://github.com/KaiSeabra/Analise-De-Dados-API
cd Analise-De-Dados-API
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o MongoDB**

* Usando Docker (recomendado):

  ```bash
  docker run -d -p 27017:27017 --name mongodb mongo
  ```

* Ou instalação local: [MongoDB Community](https://www.mongodb.com/try/download/community)

4. **Popule o banco MongoDB**

```bash
node mongo-seed.js
```

5. **Inicie o servidor**

```bash
node app.js
```

6. **Acesse a dashboard**

Abra no navegador:

```
http://localhost:3000/dashboard.html
```

---

## Uso da API ⚙️

### 🟨 Produtos (NeDB - objeto-relacional)

```http
GET /products
```

📋 Lista todos os produtos cadastrados

---

### 🟪 Comentários (MongoDB - dados não estruturados)

```http
GET /comments
```

💬 Retorna comentários de clientes vinculados a produtos

---

### 🟦 Relatório de Vendas (SQLite - Data Warehouse)

```http
GET /sales-report
```

📊 Retorna vendas agregadas por produto

---

### ⏳ Histórico Temporal (SQLite)

```http
GET /historic
```

📈 Retorna variação de preço e estoque por produto ao longo do tempo

---

## Dashboard Web 🖥️

Além da API, o projeto inclui uma **dashboard simples e leve** para facilitar a visualização dos dados em formato textual.

### Como acessar:

- Inicie o servidor (`node app.js`)
- Abra no navegador o endereço:  
  `http://localhost:3000/dashboard.html`

### O que a dashboard mostra:

- **Lista de Produtos**: com detalhes de id, nome, categoria, preço e estoque  
- **Comentários dos Clientes**: exibindo o cliente, produto relacionado e comentário  
- **Relatório de Vendas**: resumo das vendas por produto, mês e total vendido  
- **Histórico de Preços e Estoque**: mostrando a variação mensal de preços e estoque por produto

### Por que usar a dashboard?

- Visualização rápida sem necessidade de consumir a API manualmente  
- Interface leve, sem gráficos pesados para performance rápida  
- Útil para quem quer acompanhar o estado do sistema em tempo real durante desenvolvimento ou demonstração  

---

## Estrutura dos Dados 🗃️

### Produto (NeDB)

```json
{
  "id": 1,
  "nome": "Tênis Esportivo",
  "categoria": "Calçados",
  "preco": 199.99,
  "estoque": 20
}
```

---

### Comentário (MongoDB)

```json
{
  "produtoId": 1,
  "comentario": "Produto excelente!",
  "cliente": "Maria"
}
```

---

### Fato de Venda (SQLite)

```sql
CREATE TABLE fatos_vendas (
  data TEXT,
  produto_id INTEGER,
  quantidade INTEGER,
  preco_unitario REAL,
  estoque INTEGER
);
```

---

## Sobre o Projeto 📘

Este sistema foi desenvolvido com fins didáticos e acadêmicos, para demonstrar a integração de diferentes paradigmas de banco de dados em um único sistema Node.js funcional, simples e didático, com foco em análise de dados de vendas e comportamento do consumidor.

---
