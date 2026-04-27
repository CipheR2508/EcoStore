import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const onSale = searchParams.get('on_sale');
  const sort = searchParams.get('sort');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const params = { page: 1, limit: 50 };
        if (category) params.category = category;
        if (search) params.search = search;
        if (onSale) params.on_sale = onSale;
        if (sort) params.sort = sort;

        const data = await api.getProducts(params);
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [category, search, onSale, sort]);

  let title = "ALL PRODUCTS";
  if (category) title = `CATEGORY: ${category.toUpperCase()}`;
  if (search) title = `SEARCH: "${search.toUpperCase()}"`;
  if (onSale) title = "MEGA SALE";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-black mb-8 uppercase tracking-tighter border-b-8 border-black pb-4 inline-block bg-brutal-yellow px-4">{title}</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white border-4 border-black p-4 shadow-brutal animate-pulse">
              <div className="bg-slate-200 aspect-square mb-4 border-2 border-black"></div>
              <div className="bg-slate-200 h-6 w-3/4 mb-2 border-2 border-black"></div>
              <div className="bg-slate-200 h-4 w-1/2 mb-4 border-2 border-black"></div>
              <div className="bg-slate-200 h-10 w-1/3 border-2 border-black"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-4 border-black bg-white shadow-brutal">
          <p className="text-2xl font-black uppercase tracking-wider">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
