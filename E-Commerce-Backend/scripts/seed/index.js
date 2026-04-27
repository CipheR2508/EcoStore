require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const seedCategories = require('./categories.seed');
const seedProducts = require('./products.seed');
const seedAttributes = require('./attributes.seed');

async function main() {
  try {
    console.log('--- Starting Database Seeding ---');
    await seedCategories();
    await seedProducts();
    await seedAttributes();
    console.log('--- Seeding Completed Successfully ---');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:');
    console.error(error);
    process.exit(1);
  }
}

main();
