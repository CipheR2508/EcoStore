import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20 border-t-8 border-brutal-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="text-4xl font-black tracking-tighter uppercase mb-4">
              EcoStore
            </div>
            <div className="text-sm font-bold uppercase tracking-widest text-brutal-yellow space-y-2">
              <p>Email: ishan250@example.com</p>
              <p>Phone: +919511552111</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-lg font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-brutal-yellow transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-brutal-yellow transition-colors">Products</Link>
            <Link to="/cart" className="hover:text-brutal-yellow transition-colors">Cart</Link>
            <Link to="/profile" className="hover:text-brutal-yellow transition-colors">Profile</Link>
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-brutal-yellow">
            © 2026 EcoStore. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
