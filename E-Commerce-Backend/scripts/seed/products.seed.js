const pool = require('../../src/database/db');

const productData = {
  'laptops': {
    brand: 'TechGear',
    names: ['UltraBook Pro', 'Gaming Beast X', 'Slimline Air', 'WorkStation Elite', 'Student Lite'],
    basePrice: 800,
    desc: 'High performance computing for every need.'
  },
  'smartphones': {
    brand: 'Phono',
    names: ['Nova 10', 'Apex S23', 'Lite Z', 'Prime Fold', 'Edge Max'],
    basePrice: 500,
    desc: 'Stay connected with the latest mobile technology.'
  },
  'audio': {
    brand: 'SoundWave',
    names: ['NoiseCancel 500', 'BassBoom Speaker', 'AirBuds Pro', 'Studio Monitor', 'EarPods Max'],
    basePrice: 100,
    desc: 'Immersive sound experiences.'
  },
  'accessories': {
    brand: 'ConnectIt',
    names: ['USB-C Hub', 'Mechanical Keyboard', 'Gaming Mouse', 'Laptop Stand', 'HD Webcam'],
    basePrice: 50,
    desc: 'Essential peripherals for your setup.'
  },
  'menswear': {
    brand: 'UrbanFit',
    names: ['Classic White Tee', 'Slim Fit Chinos', 'Denim Jacket', 'Oxford Shirt', 'Wool Blazer'],
    basePrice: 40,
    desc: 'Modern style for the contemporary man.'
  },
  'womenswear': {
    brand: 'FemmeStyle',
    names: ['Floral Summer Dress', 'High-Waist Jeans', 'Silk Blouse', 'Cashmere Sweater', 'Pleated Skirt'],
    basePrice: 50,
    desc: 'Elegant and comfortable fashion for women.'
  },
  'footwear': {
    brand: 'Stride',
    names: ['Air Runners', 'Leather Loafers', 'Casual Sneakers', 'Hiking Boots', 'Formal Oxfords'],
    basePrice: 80,
    desc: 'Quality footwear for every journey.'
  },
  'clothing-accessories': {
    brand: 'Accents',
    names: ['Leather Belt', 'Woolen Scarf', 'Classic Fedora', 'Aviator Sunglasses', 'Silk Tie'],
    basePrice: 20,
    desc: 'The perfect finishing touch to any outfit.'
  },
  'furniture': {
    brand: 'HomeComfort',
    names: ['Ergonomic Office Chair', 'Minimalist Coffee Table', 'Queen Size Bed', 'Velvet Sofa', 'Bookshelf'],
    basePrice: 200,
    desc: 'Beautiful and functional furniture for your home.'
  },
  'kitchen': {
    brand: 'ChefMaster',
    names: ['Air Fryer Pro', 'Stainless Steel Pan', 'Electric Kettle', 'Blender Max', 'Knife Set'],
    basePrice: 60,
    desc: 'Professional tools for the home chef.'
  },
  'decor': {
    brand: 'ArtHaus',
    names: ['Abstract Canvas', 'Scented Candle Set', 'Ceramic Vase', 'Wall Mirror', 'Table Lamp'],
    basePrice: 30,
    desc: 'Unique accents to personalize your space.'
  },
  'gardening': {
    brand: 'GreenThumb',
    names: ['Pruning Shears', 'Self-Watering Pot', 'Garden Hoe', 'Organic Fertilizer', 'Seed Starter Kit'],
    basePrice: 25,
    desc: 'Grow your dream garden with our tools.'
  },
  'fitness': {
    brand: 'IronCore',
    names: ['Adjustable Dumbbells', 'Yoga Mat Pro', 'Resistance Bands', 'Kettlebell Set', 'Jump Rope'],
    basePrice: 40,
    desc: 'Everything you need for a home gym.'
  },
  'camping': {
    brand: 'WildTrail',
    names: ['4-Person Tent', 'Sleeping Bag', 'Portable Stove', 'Hiking Backpack', 'Camping Lantern'],
    basePrice: 70,
    desc: 'Adventure-ready gear for the great outdoors.'
  },
  'cycling': {
    brand: 'Veloci',
    names: ['Mountain Bike', 'Road Bike', 'Cycling Helmet', 'Bike Lock', 'Water Bottle Cage'],
    basePrice: 300,
    desc: 'Ride further and faster with our gear.'
  },
  'team-sports': {
    brand: 'GameDay',
    names: ['Professional Soccer Ball', 'Basketball Hoop', 'Tennis Racket', 'Baseball Glove', 'Volleyball Net'],
    basePrice: 50,
    desc: 'Top quality equipment for team athletes.'
  },
  'skincare': {
    brand: 'PureGlow',
    names: ['Hyaluronic Acid Serum', 'Moisturizing Cream', 'Facial Cleanser', 'Sunscreen SPF 50', 'Night Repair Oil'],
    basePrice: 30,
    desc: 'Science-backed skincare for a healthy glow.'
  },
  'makeup': {
    brand: 'VividHue',
    names: ['Matte Lipstick', 'Liquid Eyeliner', 'Foundation Palette', 'Blush Kit', 'Mascara Volumizer'],
    basePrice: 20,
    desc: 'Express yourself with bold colors.'
  },
  'fragrance': {
    brand: 'Essence',
    names: ['Midnight Jasmine', 'Ocean Breeze', 'Sandalwood Oud', 'Citrus Fresh', 'Vanilla Bean'],
    basePrice: 60,
    desc: 'Captivating scents for every mood.'
  },
  'wellness': {
    brand: 'ZenLife',
    names: ['Omega-3 Supplements', 'Vitamin C Complex', 'Protein Powder', 'Meditation Cushion', 'Aromatherapy Diffuser'],
    basePrice: 40,
    desc: 'Holistic tools for a balanced life.'
  },
};

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

async function seedProducts() {
  console.log('Seeding products...');
  try {
    // Clear existing products and images
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.query('TRUNCATE TABLE product_images');
    await pool.query('TRUNCATE TABLE products');
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    // Get all subcategories to distribute products
    const [categories] = await pool.query('SELECT category_id, slug FROM categories WHERE parent_category_id IS NOT NULL');
    
    if (categories.length === 0) {
      throw new Error('No subcategories found. Please seed categories first.');
    }

    let productCount = 0;
    const targetCount = 50;

    while (productCount < targetCount) {
      for (const cat of categories) {
        if (productCount >= targetCount) break;

        const data = productData[cat.slug];
        if (!data) continue;

        const name = data.names[Math.floor(Math.random() * data.names.length)] + ' ' + (Math.floor(Math.random() * 1000));
        const slug = slugify(name) + '-' + Math.random().toString(36).substr(2, 5);
        const sku = `${cat.slug.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
        const price = data.basePrice + (Math.random() * 100);
        const stock = Math.floor(Math.random() * 100);

        const [result] = await pool.query(
          'INSERT INTO products (name, slug, description, short_description, sku, price, stock_quantity, category_id, brand) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [name, slug, data.desc, name + ' - Great quality product.', sku, price, stock, cat.category_id, data.brand]
        );

        const productId = result.insertId;

        // Add images
        const imageKeywords = cat.slug.split('-');
        for (let i = 0; i < 3; i++) {
          const imageUrl = `https://source.unsplash.com/featured/?${imageKeywords[0]},${i === 0 ? 'product' : 'detail'}`;
          await pool.query(
            'INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary) VALUES (?, ?, ?, ?, ?)',
            [productId, imageUrl, `${name} image ${i + 1}`, i, i === 0]
          );
        }

        productCount++;
      }
    }
    console.log(`Successfully seeded ${productCount} products!`);
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

module.exports = seedProducts;
