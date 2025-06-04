const fs = require('fs');
const faker = require('faker');

const products = [];

for (let i = 1; i <= 10000; i++) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription()
  });
}

const db = { products };

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));

console.log('db.json com 10.000 produtos gerado!');
