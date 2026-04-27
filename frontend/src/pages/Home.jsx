import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

function Home() {
  const [sampleProducts, setSampleProducts] = useState([]);
  const [lovedProducts, setLovedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const [samples, loved, sales] = await Promise.all([
          api.getProducts({ page: 1, limit: 8 }),
          api.getProducts({ page: 1, limit: 8, sort: 'rating' }),
          api.getProducts({ page: 1, limit: 8, on_sale: 'true' })
        ]);
        setSampleProducts(samples);
        setLovedProducts(loved);
        setSaleProducts(sales);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const renderProductGrid = (products) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border-4 border-black p-4 shadow-brutal animate-pulse">
              <div className="bg-slate-200 aspect-square mb-4 border-2 border-black"></div>
              <div className="bg-slate-200 h-6 w-3/4 mb-2 border-2 border-black"></div>
              <div className="bg-slate-200 h-4 w-1/2 mb-4 border-2 border-black"></div>
              <div className="bg-slate-200 h-10 w-1/3 border-2 border-black"></div>
            </div>
          ))}
        </div>
      );
    }

    if (products.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-8 border-4 border-black bg-white shadow-brutal p-8">
        <p className="text-black font-black uppercase text-xl">No products found.</p>
      </div>
    );
  };

  return (
    <div className="flex-1">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Sample Products */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-2">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Featured Hardware</h2>
            <Link to="/shop" className="text-black bg-brutal-yellow border-2 border-black px-4 py-2 font-bold uppercase tracking-widest hover:shadow-brutal-sm hover:-translate-y-1 transition-all">
              VIEW ALL →
            </Link>
          </div>
          {renderProductGrid(sampleProducts)}
        </section>

        {/* Customers Most Loved */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-2">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Top Rated 🔥</h2>
            <Link to="/shop?sort=rating" className="text-black bg-brutal-pink border-2 border-black px-4 py-2 font-bold uppercase tracking-widest hover:shadow-brutal-sm hover:-translate-y-1 transition-all">
              VIEW TOP RATED →
            </Link>
          </div>
          {renderProductGrid(lovedProducts)}
        </section>

        {/* 50% Off Products */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-2">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Mega Sale 💸</h2>
            <Link to="/shop?on_sale=true" className="text-black bg-brutal-green border-2 border-black px-4 py-2 font-bold uppercase tracking-widest hover:shadow-brutal-sm hover:-translate-y-1 transition-all">
              SHOP DEALS →
            </Link>
          </div>
          {renderProductGrid(saleProducts)}
        </section>

      </div>
    </div>
  );
}

export default Home;
