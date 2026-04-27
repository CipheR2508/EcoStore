import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const primaryImage = product.image_url;
  
  return (
    <Link to={`/product/${product.slug}`} className="block card-brutal overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-brutal-yellow relative border-b-4 border-black p-4">
        {primaryImage ? (
          <img 
            src={primaryImage} 
            alt={product.name}
            className="w-full h-full object-cover border-4 border-black shadow-brutal bg-white group-hover:-translate-y-2 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder.svg';
            }}
          />
        ) : (
          <img 
            src="/placeholder.svg"
            alt={product.name}
            className="w-full h-full object-cover border-4 border-black shadow-brutal bg-white group-hover:-translate-y-2 transition-transform duration-300"
          />
        )}
        {product.stock_quantity < 10 && product.stock_quantity > 0 && (
          <span className="absolute top-2 right-2 bg-brutal-pink text-black border-2 border-black shadow-brutal-sm text-xs font-black px-2 py-1 uppercase tracking-wider z-10">
            LOW STOCK
          </span>
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-black text-black mb-1 uppercase tracking-tight truncate">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-slate-600 mb-4 uppercase tracking-widest truncate">
          {product.brand || 'BRANDLESS'}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-black bg-brutal-green px-2 py-1 border-2 border-black shadow-brutal-sm">
              ${parseFloat(product.price || 0).toFixed(2)}
            </span>
            {product.compare_at_price && (
              <span className="text-lg font-bold text-slate-500 line-through decoration-2 decoration-brutal-pink px-1">
                ${parseFloat(product.compare_at_price).toFixed(2)}
              </span>
            )}
          </div>
          <button className="w-full mt-2 bg-black text-white p-3 font-black uppercase tracking-widest border-2 border-black hover:bg-brutal-blue hover:text-black transition-colors">
            VIEW DETAILS
          </button>
        </div>
        
        {product.rating_count > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t-4 border-black">
            <div className="flex text-black">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={i < Math.floor(product.rating_average) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-black border-2 border-black px-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-brutal-yellow">{product.rating_average} ({product.rating_count})</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
