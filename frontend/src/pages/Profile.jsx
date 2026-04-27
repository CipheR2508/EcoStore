import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  
  // Dummy Orders
  const [orders] = useState([]);

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-black mb-8 uppercase tracking-tighter border-b-8 border-black pb-4 inline-block bg-brutal-blue px-4">YOUR PROFILE</h1>
      
      <div className="border-4 border-black p-8 bg-white shadow-brutal mb-8">
        <div className="flex items-center gap-6 mb-8 border-b-4 border-black pb-8">
          <div className="w-24 h-24 bg-brutal-yellow border-4 border-black flex items-center justify-center text-5xl font-black shadow-brutal-sm">
            {user.first_name ? user.first_name[0] : 'U'}
          </div>
          <div>
            <h2 className="text-4xl font-black uppercase">{user.first_name} {user.last_name}</h2>
            <p className="text-xl font-bold text-slate-600">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-12">
          {/* Order History */}
          <div className="border-4 border-black p-6 bg-brutal-pink">
            <h3 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">ORDER HISTORY</h3>
            {orders.length === 0 ? (
              <div className="text-xl font-bold p-6 bg-white border-4 border-black text-center">
                NO ORDERS YET
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border-4 border-black bg-white p-4 flex justify-between items-center">
                    <div>
                      <p className="font-black">ORDER #{order.id}</p>
                      <p className="font-bold text-slate-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xl">${order.total}</p>
                      <p className="font-bold uppercase bg-brutal-green px-2 border-2 border-black inline-block mt-1">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Address */}
          <div className="border-4 border-black p-6 bg-brutal-green">
            <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-2">
              <h3 className="text-3xl font-black uppercase">SAVED ADDRESS</h3>
              {!isEditingAddress && (
                <button 
                  onClick={() => setIsEditingAddress(true)}
                  className="bg-black text-white px-4 py-2 font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-colors"
                >
                  EDIT
                </button>
              )}
            </div>

            {isEditingAddress ? (
              <div className="bg-white border-4 border-black p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black uppercase mb-1">Full Name</label>
                    <input type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-brutal-yellow" />
                  </div>
                  <div>
                    <label className="block font-black uppercase mb-1">Phone Number</label>
                    <input type="text" name="phone" value={address.phone} onChange={handleAddressChange} className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-brutal-yellow" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-black uppercase mb-1">Street Address</label>
                    <input type="text" name="street" value={address.street} onChange={handleAddressChange} className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-brutal-yellow" />
                  </div>
                  <div>
                    <label className="block font-black uppercase mb-1">City</label>
                    <input type="text" name="city" value={address.city} onChange={handleAddressChange} className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-brutal-yellow" />
                  </div>
                  <div>
                    <label className="block font-black uppercase mb-1">State</label>
                    <input type="text" name="state" value={address.state} onChange={handleAddressChange} className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-brutal-yellow" />
                  </div>
                  <div>
                    <label className="block font-black uppercase mb-1">Pincode</label>
                    <input type="text" name="pincode" value={address.pincode} onChange={handleAddressChange} className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:bg-brutal-yellow" />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={saveAddress} className="flex-1 bg-black text-white px-4 py-3 font-black uppercase border-4 border-black hover:bg-brutal-yellow hover:text-black transition-colors">
                    SAVE ADDRESS
                  </button>
                  <button onClick={() => setIsEditingAddress(false)} className="px-4 py-3 font-black uppercase border-4 border-black bg-white hover:bg-brutal-pink transition-colors">
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border-4 border-black p-6 font-bold text-lg leading-relaxed">
                {address.fullName ? (
                  <>
                    <p className="font-black text-xl uppercase mb-2">{address.fullName}</p>
                    <p>{address.phone}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                  </>
                ) : (
                  <p className="text-slate-500 italic">No address saved yet. Click edit to add one.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={logout}
          className="mt-12 w-full bg-black text-white px-8 py-4 text-xl font-black uppercase tracking-widest border-4 border-black hover:bg-red-500 hover:text-black hover:-translate-y-1 hover:shadow-brutal transition-all"
        >
          LOGOUT FROM THIS DEVICE
        </button>
      </div>
    </div>
  );
};

export default Profile;
