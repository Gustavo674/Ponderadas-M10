// Script para gerar um arquivo db.json com 10.000 produtos falsos

// Importa módulo fs (File System) do Node.js → para escrever arquivo
const fs = require('fs');

// Importa biblioteca faker → para gerar dados falsos
const faker = require('faker');

// Array onde serão armazenados os produtos gerados
const products = [];

// Loop para gerar 10.000 produtos
for (let i = 1; i <= 10000; i++) {
  products.push({
    id: i, // ID sequencial
    name: faker.commerce.productName(), // Nome do produto (ex: "Incredible Soft Mouse")
    price: parseFloat(faker.commerce.price()), // Preço (float)
    description: faker.commerce.productDescription(), // Descrição do produto
    image: `https://picsum.photos/seed/${i}/400/200` // URL de imagem aleatória (usando seed = id)
  });
}

// Cria objeto db com os produtos → formato esperado pelo json-server
const db = { products };

// Escreve o arquivo db.json com indentação de 2 espaços
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));

// Exibe mensagem de sucesso no console
console.log('db.json com 10.000 produtos gerado com imagens!');
