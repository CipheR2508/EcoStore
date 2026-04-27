const pool = require('../../src/database/db');

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and electronics', image_url: 'https://images.unsplash.com/photo-1498049794561-778029bc7d5b' },
  { name: 'Clothing', slug: 'clothing', description: 'Trendy apparel for all seasons', image_url: 'https://images.unsplash.com/photo-1445205170230-053b83016050' },
  { name: 'Home & Garden', slug: 'home-garden', description: 'Everything for your living space', image_url: 'https://images.unsplash.com/photo-1484101403633-562f877f9576' },
  { name: 'Sports & Outdoors', slug: 'sports-outdoors', description: 'Gear for every athlete', image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607e806d8' },
  { name: 'Beauty & Health', slug: 'beauty-health', description: 'Care for your body and mind', image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9' },
];

const subCategories = {
  'electronics': [
    { name: 'Laptops', slug: 'laptops', description: 'High performance laptops' },
    { name: 'Smartphones', slug: 'smartphones', description: 'Cutting edge mobile phones' },
    { name: 'Audio', slug: 'audio', description: 'Headphones, speakers, and more' },
    { name: 'Accessories', slug: 'accessories', description: 'Cables, cases, and peripherals' },
  ],
  'clothing': [
    { name: 'Menswear', slug: 'menswear', description: 'Stylish clothes for men' },
    { name: 'Womenswear', slug: 'womenswear', description: 'Elegant clothes for women' },
    { name: 'Footwear', slug: 'footwear', description: 'Shoes for every occasion' },
    { name: 'Accessories', slug: 'clothing-accessories', description: 'Belts, hats, and jewelry' },
  ],
  'home-garden': [
    { name: 'Furniture', slug: 'furniture', description: 'Comfortable and modern furniture' },
    { name: 'Kitchen', slug: 'kitchen', description: 'Essential kitchenware' },
    { name: 'Decor', slug: 'decor', description: 'Art and home accents' },
    { name: 'Gardening', slug: 'gardening', description: 'Tools and seeds for your garden' },
  ],
  'sports-outdoors': [
    { name: 'Fitness', slug: 'fitness', description: 'Gym and workout equipment' },
    { name: 'Camping', slug: 'camping', description: 'Tents, sleeping bags, and gear' },
    { name: 'Cycling', slug: 'cycling', description: 'Bikes and accessories' },
    { name: 'Team Sports', slug: 'team-sports', description: 'Equipment for soccer, basketball, etc.' },
  ],
  'beauty-health': [
    { name: 'Skincare', slug: 'skincare', description: 'Lotions, serums, and creams' },
    { name: 'Makeup', slug: 'makeup', description: 'Cosmetics for every look' },
    { name: 'Fragrance', slug: 'fragrance', description: 'Perfumes and colognes' },
    { name: 'Wellness', slug: 'wellness', description: 'Supplements and health tools' },
  ],
};

async function seedCategories() {
  console.log('Seeding categories...');
  try {
    // Clear existing categories (caution: this will clear everything)
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.query('TRUNCATE TABLE categories');
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    for (const cat of categories) {
      const [result] = await pool.query(
        'INSERT INTO categories (name, slug, description, image_url) VALUES (?, ?, ?, ?)',
        [cat.name, cat.slug, cat.description, cat.image_url]
      );
      const parentId = result.insertId;

      const subs = subCategories[cat.slug] || [];
      for (const sub of subs) {
        await pool.query(
          'INSERT INTO categories (name, slug, description, parent_category_id) VALUES (?, ?, ?, ?)',
          [sub.name, sub.slug, sub.description, parentId]
        );
      }
    }
    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

module.exports = seedCategories;
