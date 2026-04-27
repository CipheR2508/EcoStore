const pool = require('../../src/database/db');

const attributes = [
  { name: 'Color', slug: 'color', type: 'select', is_filterable: true },
  { name: 'Size', slug: 'size', type: 'select', is_filterable: true },
  { name: 'Material', slug: 'material', type: 'text', is_filterable: true },
  { name: 'Brand', slug: 'brand', type: 'text', is_filterable: true },
  { name: 'Weight', slug: 'weight', type: 'number', is_filterable: true },
];

const attributeValues = {
  'color': ['Red', 'Blue', 'Green', 'Black', 'White', 'Silver', 'Gold'],
  'size': ['S', 'M', 'L', 'XL', 'One Size'],
  'material': ['Cotton', 'Polyester', 'Leather', 'Aluminum', 'Plastic', 'Wood', 'Glass'],
};

async function seedAttributes() {
  console.log('Seeding attributes...');
  try {
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.query('TRUNCATE TABLE product_attribute_values');
    await pool.query('TRUNCATE TABLE product_attributes');
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    for (const attr of attributes) {
      const [result] = await pool.query(
        'INSERT INTO product_attributes (name, slug, type, is_filterable) VALUES (?, ?, ?, ?)',
        [attr.name, attr.slug, attr.type, attr.is_filterable]
      );
      const attrId = result.insertId;

      // We will assign values to products in a separate step or randomly here
      // For simplicity, we'll leave them to be populated by the product loop if needed,
      // but since the user wants it "simple", let's just seed the attribute definitions.
    }

    // Let's randomly assign some attributes to products to make it look "alive"
    const [products] = await pool.query('SELECT product_id FROM products');
    const [allAttrs] = await pool.query('SELECT attribute_id, slug FROM product_attributes');

    for (const prod of products) {
      const randomAttr = allAttrs[Math.floor(Math.random() * allAttrs.length)];
      let valueText = null, valueNum = null, valueBool = null;

      if (randomAttr.slug === 'color') valueText = attributeValues.color[Math.floor(Math.random() * attributeValues.color.length)];
      else if (randomAttr.slug === 'size') valueText = attributeValues.size[Math.floor(Math.random() * attributeValues.size.length)];
      else if (randomAttr.slug === 'material') valueText = attributeValues.material[Math.floor(Math.random() * attributeValues.material.length)];
      else if (randomAttr.slug === 'brand') valueText = 'Premium Brand';
      else if (randomAttr.slug === 'weight') valueNum = (Math.random() * 5).toFixed(2);

      await pool.query(
        'INSERT INTO product_attribute_values (product_id, attribute_id, value_text, value_number, value_boolean) VALUES (?, ?, ?, ?, ?)',
        [prod.product_id, randomAttr.attribute_id, valueText, valueNum, valueBool]
      );
    }

    console.log('Attributes seeded successfully!');
  } catch (error) {
    console.error('Error seeding attributes:', error);
    throw error;
  }
}

module.exports = seedAttributes;
