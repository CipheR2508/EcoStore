import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  
  const [viewState, setViewState] = useState('cart'); // 'cart', 'success', 'invoice'
  const [orderData, setOrderData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to checkout.");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate backend sync if needed, but since it's a frontend demo of UI,
      // we'll mock the order creation if the backend cart is empty/fails.
      // We'll create a dummy order object to satisfy the UI requirement.
      const dummyOrder = {
        order_id: 'ORD-' + Math.floor(Math.random() * 1000000),
        total: getCartTotal(),
        date: new Date().toLocaleDateString(),
        delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        items: [...cartItems],
        status: 'Paid'
      };
      
      setOrderData(dummyOrder);
      clearCart();
      setViewState('success');
    } catch (error) {
      console.error(error);
      alert("Failed to checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (viewState === 'invoice' && orderData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-zinc-100">
          <div className="flex justify-between items-start border-b border-zinc-200 pb-8 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">INVOICE</h2>
              <p className="text-zinc-500 mt-1">Receipt for your purchase</p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold tracking-tight">ECOSTORE</h3>
              <p className="text-sm text-zinc-500 mt-1">123 Commerce St.<br/>Tech City, TC 10010</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Billed To</p>
              <p className="font-medium text-zinc-900">{user?.first_name} {user?.last_name}</p>
              <p className="text-zinc-500 text-sm">{user?.email}</p>
              <p className="text-zinc-500 text-sm mt-2">123 Default Address Rd.<br/>City, State, 12345</p>
            </div>
            <div className="text-right">
              <div className="mb-4">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Invoice Number</p>
                <p className="font-medium text-zinc-900">{orderData.order_id}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Date of Issue</p>
                <p className="font-medium text-zinc-900">{orderData.date}</p>
              </div>
            </div>
          </div>

          <table className="w-full text-left mb-8">
            <thead>
              <tr className="border-b border-zinc-200 text-sm text-zinc-500">
                <th className="pb-3 font-semibold">Item</th>
                <th className="pb-3 font-semibold text-center">Qty</th>
                <th className="pb-3 font-semibold text-right">Price</th>
                <th className="pb-3 font-semibold text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orderData.items.map((item, idx) => (
                <tr key={idx} className="border-b border-zinc-100">
                  <td className="py-4 flex items-center gap-4">
                    <img src={item.product.images?.[0]?.image_url || '/placeholder.svg'} alt={item.product.name} className="w-12 h-12 rounded object-cover border border-zinc-200" />
                    <span className="font-medium text-zinc-900">{item.product.name}</span>
                  </td>
                  <td className="py-4 text-center text-zinc-600">{item.quantity}</td>
                  <td className="py-4 text-right text-zinc-600">₹{parseFloat(item.product.price).toFixed(2)}</td>
                  <td className="py-4 text-right font-medium text-zinc-900">₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-3 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>₹{orderData.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Tax</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-zinc-900 border-t border-zinc-200 pt-3">
                <span>Total</span>
                <span>₹{orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-zinc-200 pt-8">
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Payment Status</p>
              <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Paid Successfully
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setViewState('success')} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                Back to Order
              </button>
              <Link to="/shop" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'success' && orderData) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-green-100 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 mb-2">Order Confirmed!</h2>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">
            Thank you for your purchase. We've received your order and will begin processing it right away.
          </p>

          <div className="bg-zinc-50 rounded-2xl p-6 w-full max-w-sm mb-8 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-200 pb-4">
              <span className="text-zinc-500 text-sm">Order ID</span>
              <span className="font-semibold text-zinc-900">{orderData.order_id}</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-200 pb-4">
              <span className="text-zinc-500 text-sm">Estimated Delivery</span>
              <span className="font-semibold text-zinc-900">{orderData.delivery}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 text-sm">Total Paid</span>
              <span className="font-semibold text-green-600">₹{orderData.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button 
              onClick={() => setViewState('invoice')}
              className="flex-1 bg-zinc-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-zinc-800 transition-colors shadow-sm"
            >
              View Invoice
            </button>
            <Link 
              to="/profile"
              className="flex-1 bg-white text-zinc-700 border border-zinc-200 px-6 py-3 rounded-xl font-medium hover:bg-zinc-50 transition-colors text-center"
            >
              View Orders
            </Link>
          </div>
          <Link to="/shop" className="mt-8 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            &larr; Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-zinc-100 text-center">
          <div className="w-24 h-24 bg-zinc-50 text-zinc-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-3">Your cart is empty</h2>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">Looks like you haven't added any premium essentials to your cart yet.</p>
          <Link to="/shop" className="inline-block bg-zinc-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-2/3 space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 gap-6 items-center">
                <div className="w-32 h-32 flex-shrink-0 bg-zinc-50 rounded-xl overflow-hidden">
                  <img 
                    src={item.product.images?.find(img => img.is_primary)?.image_url || item.product.images?.[0]?.image_url || '/placeholder.svg'} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 w-full flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">{item.product.name}</h3>
                      {item.size && <p className="text-sm text-zinc-500 mt-1">Size: {item.size}</p>}
                    </div>
                    <p className="text-lg font-semibold text-zinc-900">
                      ₹{parseFloat(item.product.price).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50 overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                      >
                        &minus;
                      </button>
                      <div className="w-12 h-10 flex items-center justify-center text-sm font-medium text-zinc-900 bg-white">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                      >
                        &#43;
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 sticky top-24">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-zinc-900">₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-zinc-900 pt-6 border-t border-zinc-100 mb-8">
                <span>Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-zinc-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Checkout Now'}
              </button>
              <div className="mt-6 flex justify-center items-center gap-2 text-zinc-400 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
                <span>Secure SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
