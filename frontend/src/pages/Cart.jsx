import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-black mb-8 uppercase tracking-tighter border-b-8 border-black pb-4 inline-block bg-brutal-green px-4">YOUR CART</h1>
      
      {cartItems.length === 0 ? (
        <div className="border-4 border-black p-12 bg-white shadow-brutal text-center">
          <h2 className="text-3xl font-black uppercase mb-6">Cart is empty</h2>
          <p className="text-xl font-bold mb-8">You haven't added any products to your cart yet.</p>
          <Link to="/shop" className="inline-block bg-black text-white px-8 py-4 text-2xl font-black uppercase tracking-widest border-4 border-black hover:bg-brutal-yellow hover:text-black hover:-translate-y-1 hover:shadow-brutal transition-all">
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row border-4 border-black bg-white shadow-brutal p-4 gap-6 items-center">
                <img 
                  src={item.product.images?.find(img => img.is_primary)?.image_url || item.product.images?.[0]?.image_url || '/placeholder.svg'} 
                  alt={item.product.name} 
                  className="w-32 h-32 object-cover border-2 border-black"
                />
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="text-2xl font-black uppercase">{item.product.name}</h3>
                  <p className="text-lg font-bold text-slate-600 uppercase">
                    ${parseFloat(item.product.price).toFixed(2)} {item.size && `| Size: ${item.size}`}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-4 border-black bg-white">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-xl font-black hover:bg-brutal-pink transition-colors border-r-4 border-black"
                    >
                      -
                    </button>
                    <div className="w-12 h-10 flex items-center justify-center text-xl font-black">
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-xl font-black hover:bg-brutal-green transition-colors border-l-4 border-black"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="p-2 border-4 border-black bg-brutal-pink hover:bg-red-500 hover:text-white transition-colors group"
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="border-4 border-black bg-brutal-yellow p-6 shadow-brutal sticky top-24">
              <h3 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-4">ORDER SUMMARY</h3>
              <div className="flex justify-between items-center text-xl font-bold mb-4 uppercase">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold mb-4 uppercase text-slate-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between items-center text-3xl font-black mt-6 pt-6 border-t-4 border-black uppercase">
                <span>TOTAL</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <button className="w-full mt-8 bg-black text-white px-8 py-4 text-2xl font-black uppercase tracking-widest border-4 border-black hover:bg-brutal-green hover:text-black hover:-translate-y-1 hover:shadow-brutal transition-all">
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
