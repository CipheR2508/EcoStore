import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [viewingInvoice, setViewingInvoice] = useState(null);

  // Dummy Orders for demonstration
  const [orders] = useState([
    {
      id: 'ORD-109283',
      date: 'Oct 12, 2026',
      total: 129.99,
      status: 'Delivered',
      estimatedArrival: 'Oct 15, 2026',
      items: [
        { name: 'Premium Essential Tee', price: 45.00, qty: 2, image: '/placeholder.svg' },
        { name: 'Minimalist Cap', price: 39.99, qty: 1, image: '/placeholder.svg' }
      ]
    },
    {
      id: 'ORD-109305',
      date: 'Oct 28, 2026',
      total: 89.50,
      status: 'Processing',
      estimatedArrival: 'Nov 2, 2026',
      items: [
        { name: 'Everyday Hoodie', price: 89.50, qty: 1, image: '/placeholder.svg' }
      ]
    }
  ]);

  // Address State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    const savedAddress = localStorage.getItem('userAddress');
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const saveAddress = () => {
    localStorage.setItem('userAddress', JSON.stringify(address));
    setIsEditingAddress(false);
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const activeOrders = orders.filter(o => o.status !== 'Delivered');
  const pastOrders = orders.filter(o => o.status === 'Delivered');

  if (viewingInvoice) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <button onClick={() => setViewingInvoice(null)} className="text-sm font-medium text-blue-600 hover:text-blue-800">&larr; Back to Orders</button>
        </div>
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
            </div>
            <div className="text-right">
              <div className="mb-4">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Invoice Number</p>
                <p className="font-medium text-zinc-900">{viewingInvoice.id}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Date of Issue</p>
                <p className="font-medium text-zinc-900">{viewingInvoice.date}</p>
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
              {viewingInvoice.items.map((item, idx) => (
                <tr key={idx} className="border-b border-zinc-100">
                  <td className="py-4 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border border-zinc-200" />
                    <span className="font-medium text-zinc-900">{item.name}</span>
                  </td>
                  <td className="py-4 text-center text-zinc-600">{item.qty}</td>
                  <td className="py-4 text-right text-zinc-600">₹{item.price.toFixed(2)}</td>
                  <td className="py-4 text-right font-medium text-zinc-900">₹{(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-3 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>₹{viewingInvoice.total.toFixed(2)}</span>
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
                <span>₹{viewingInvoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mb-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-zinc-100 text-zinc-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              {user.first_name ? user.first_name[0] : 'U'}
            </div>
            <h2 className="text-xl font-bold text-zinc-900">{user.first_name} {user.last_name}</h2>
            <p className="text-sm text-zinc-500">{user.email}</p>
          </div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100">
            <nav className="flex flex-col">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`text-left px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-zinc-50 text-zinc-900 border-l-4 border-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 border-l-4 border-transparent'}`}
              >
                My Orders
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`text-left px-6 py-4 text-sm font-medium transition-colors border-t border-zinc-100 ${activeTab === 'addresses' ? 'bg-zinc-50 text-zinc-900 border-l-4 border-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 border-l-4 border-transparent'}`}
              >
                Addresses
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`text-left px-6 py-4 text-sm font-medium transition-colors border-t border-zinc-100 ${activeTab === 'settings' ? 'bg-zinc-50 text-zinc-900 border-l-4 border-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 border-l-4 border-transparent'}`}
              >
                Account Settings
              </button>
              <button 
                onClick={logout}
                className="text-left px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 border-t border-zinc-100 transition-colors"
              >
                Log Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">My Orders</h1>
              
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                    <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-100 flex flex-wrap gap-4 justify-between items-center text-sm">
                      <div className="flex gap-8">
                        <div>
                          <p className="text-zinc-500 mb-1">Order Placed</p>
                          <p className="font-medium text-zinc-900">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 mb-1">Total</p>
                          <p className="font-medium text-zinc-900">₹{order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 mb-1">Ship To</p>
                          <p className="font-medium text-blue-600 hover:underline cursor-pointer">{user.first_name}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-zinc-500 mb-1">Order # {order.id}</p>
                        <div className="flex justify-end gap-3 text-blue-600 font-medium">
                          <button className="hover:text-blue-800">View Details</button>
                          <span>|</span>
                          <button onClick={() => setViewingInvoice(order)} className="hover:text-blue-800">Invoice</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-zinc-900">
                          {order.status === 'Delivered' ? (
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500"></span>
                              Delivered on {order.estimatedArrival}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                              Arriving {order.estimatedArrival}
                            </span>
                          )}
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border border-zinc-100 bg-zinc-50 mix-blend-multiply" />
                            <div className="flex-1">
                              <h4 className="font-medium text-zinc-900">{item.name}</h4>
                              <p className="text-zinc-500 text-sm mt-1">Qty: {item.qty} • ₹{item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col justify-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                              <button onClick={() => { addToCart({ id: Math.random().toString(), name: item.name, price: item.price, images: [{image_url: item.image}] }, 1); navigate('/cart'); }} className="px-5 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center shadow-sm">
                                Buy it again
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Your Addresses</h1>
                {!isEditingAddress && (
                  <button 
                    onClick={() => setIsEditingAddress(true)}
                    className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    Add New
                  </button>
                )}
              </div>

              {isEditingAddress ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100">
                  <h3 className="text-lg font-bold text-zinc-900 mb-6">Edit Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">Full Name</label>
                      <input type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">Phone Number</label>
                      <input type="text" name="phone" value={address.phone} onChange={handleAddressChange} className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-zinc-700 mb-2">Street Address</label>
                      <input type="text" name="street" value={address.street} onChange={handleAddressChange} className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">City</label>
                      <input type="text" name="city" value={address.city} onChange={handleAddressChange} className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">State</label>
                      <input type="text" name="state" value={address.state} onChange={handleAddressChange} className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">ZIP / Pincode</label>
                      <input type="text" name="pincode" value={address.pincode} onChange={handleAddressChange} className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={saveAddress} className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors">
                      Save Address
                    </button>
                    <button onClick={() => setIsEditingAddress(false)} className="bg-white text-zinc-700 border border-zinc-300 px-6 py-3 rounded-xl font-medium text-sm hover:bg-zinc-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {address.fullName ? (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative">
                      <div className="absolute top-6 right-6">
                        <button onClick={() => setIsEditingAddress(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                      <p className="font-bold text-zinc-900 mb-2">{address.fullName}</p>
                      <div className="text-zinc-600 text-sm space-y-1">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.pincode}</p>
                        <p className="pt-2">Phone: {address.phone}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-zinc-50 rounded-2xl p-8 border border-dashed border-zinc-300 text-center text-zinc-500 flex flex-col items-center justify-center">
                      <p className="mb-4">No addresses saved yet.</p>
                      <button onClick={() => setIsEditingAddress(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Add an address</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Account Settings</h1>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">Personal Information</h3>
                    <p className="text-sm text-zinc-500 mb-4">Update your basic profile details here.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">First Name</label>
                        <input type="text" value={user.first_name || ''} readOnly className="w-full border border-zinc-300 rounded-lg p-3 text-sm bg-zinc-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Last Name</label>
                        <input type="text" value={user.last_name || ''} readOnly className="w-full border border-zinc-300 rounded-lg p-3 text-sm bg-zinc-50" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Email Address</label>
                        <input type="email" value={user.email || ''} readOnly className="w-full border border-zinc-300 rounded-lg p-3 text-sm bg-zinc-50" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-100">
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">Password</h3>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Change your password</button>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-100 text-right">
                    <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
