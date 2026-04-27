import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const { user, logout, openAuthModal } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      navigate(`/shop?search=${encodeURIComponent(e.target.value.trim())}`);
    }
  };

  return (
    <div className="bg-brutal-bg border-b-4 border-black sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-black uppercase tracking-tighter bg-brutal-yellow px-2 py-1 border-2 border-black shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all">
              EcoStore
            </Link>
          </div>

          {/* Search Bar (Middle) */}
          <div className="flex-1 flex justify-center px-8">
            <div className="w-full max-w-lg relative">
              <input 
                type="text" 
                className="w-full bg-white border-4 border-black text-black font-bold px-4 py-3 pl-12 focus:outline-none focus:bg-brutal-pink transition-colors shadow-brutal-sm"
                placeholder="SEARCH... (PRESS ENTER)"
                onKeyDown={handleSearch}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black absolute left-4 top-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Cart and Profile */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-black font-black uppercase tracking-widest hover:bg-black hover:text-white border-2 border-transparent hover:border-black px-2 py-1 transition-colors relative flex items-center">
              CART
              <span className="ml-2 bg-brutal-green text-black border-2 border-black text-xs px-2 py-0.5 shadow-brutal-sm">
                {getCartCount()}
              </span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-black font-black uppercase tracking-widest hover:bg-black hover:text-white border-2 border-transparent hover:border-black px-2 py-1 transition-colors">
                  {user.first_name || 'PROFILE'}
                </Link>
                <button onClick={logout} className="text-black text-sm font-bold border-b-2 border-black hover:text-red-600 hover:border-red-600">
                  LOGOUT
                </button>
              </div>
            ) : (
              <button onClick={openAuthModal} className="text-black bg-brutal-yellow border-2 border-black font-black uppercase tracking-widest hover:bg-black hover:text-white px-2 py-1 transition-colors shadow-brutal-sm">
                LOGIN / SIGNUP
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Categories Bar Below Navbar */}
      <div className="bg-white border-t-4 border-black border-b-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 overflow-x-auto py-3 no-scrollbar items-center">
            <span className="font-black uppercase tracking-widest bg-black text-white px-2 py-1 mr-2 shrink-0">CATEGORIES</span>
            <Link to="/shop" className="text-sm font-black uppercase text-black hover:bg-brutal-yellow px-2 py-1 border-2 border-transparent hover:border-black transition-colors shrink-0">
              ALL
            </Link>
            {categories.filter(c => c.parent_category_id === null).map((mainCat) => (
              <React.Fragment key={mainCat.category_id}>
                <div className="flex items-center space-x-2 shrink-0 border-l-4 border-black pl-4 ml-2">
                  <Link 
                    to={`/shop?category=${mainCat.slug}`}
                    className="text-sm font-black uppercase text-black bg-brutal-yellow hover:bg-brutal-pink px-2 py-1 border-2 border-black transition-colors shadow-brutal-sm"
                  >
                    {mainCat.name}
                  </Link>
                  {categories.filter(sub => sub.parent_category_id === mainCat.category_id).map(subCat => (
                    <Link 
                      key={subCat.category_id}
                      to={`/shop?category=${subCat.slug}`}
                      className="text-xs font-bold uppercase text-slate-700 hover:text-black hover:bg-brutal-blue px-2 py-1 border-2 border-transparent hover:border-black transition-colors"
                    >
                      {subCat.name === 'Accessories' ? `${mainCat.name.split(' ')[0]} Accs` : subCat.name}
                    </Link>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
