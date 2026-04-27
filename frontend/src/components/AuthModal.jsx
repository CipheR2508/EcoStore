import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const fetchAndLogin = async (loginEmail, loginPassword) => {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
    const result = await res.json();

    // Backend returns { status: "success" } not { success: true }
    if (result.status === 'success') {
      const token = result.data.access_token;
      // Try to fetch profile; fall back to email-derived name
      let userData = { email: loginEmail, first_name: loginEmail.split('@')[0] };
      try {
        const profileRes = await fetch('/api/v1/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const profileResult = await profileRes.json();
        if (profileResult.status === 'success' && profileResult.data) {
          userData = profileResult.data;
        }
      } catch (_) {}
      login(userData, token);
    } else {
      const msg = result.message || result.error?.message || 'Login failed';
      setError(msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await fetchAndLogin(email, password);
      } else {
        const res = await fetch('/api/v1/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            first_name: firstName.trim() || 'User',
            last_name: lastName.trim() || 'User'
          })
        });
        const result = await res.json();

        if (result.status === 'success') {
          // Auto login after successful signup
          await fetchAndLogin(email, password);
        } else {
          // Show Joi validation details or message
          if (Array.isArray(result.data)) {
            setError(result.data.map(d => d.message).join(' | '));
          } else {
            setError(result.message || result.error?.message || 'Signup failed');
          }
        }
      }
    } catch (err) {
      setError('Network error — is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black shadow-brutal p-8 max-w-md w-full relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-3 right-3 bg-brutal-yellow border-2 border-black font-black px-3 py-1 hover:bg-brutal-pink shadow-brutal-sm"
        >
          ✕
        </button>

        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {error && (
          <div className="bg-brutal-pink border-2 border-black p-3 mb-4 font-bold text-black text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block font-black mb-1 uppercase text-xs tracking-wider">First Name</label>
                <input
                  type="text"
                  required
                  className="w-full border-4 border-black p-3 focus:outline-none focus:bg-brutal-yellow transition-colors font-bold"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block font-black mb-1 uppercase text-xs tracking-wider">Last Name</label>
                <input
                  type="text"
                  required
                  className="w-full border-4 border-black p-3 focus:outline-none focus:bg-brutal-yellow transition-colors font-bold"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-black mb-1 uppercase text-xs tracking-wider">Email</label>
            <input
              type="email"
              required
              className="w-full border-4 border-black p-3 focus:outline-none focus:bg-brutal-yellow transition-colors font-bold"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-black mb-1 uppercase text-xs tracking-wider">Password</label>
            <input
              type="password"
              required
              className="w-full border-4 border-black p-3 focus:outline-none focus:bg-brutal-yellow transition-colors font-bold"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {!isLogin && (
              <p className="text-xs font-bold mt-1 text-slate-600">
                Min 8 chars · uppercase · lowercase · number · special char (e.g. @$!%*?&)
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brutal-green border-4 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all p-4 font-black uppercase text-xl mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'PLEASE WAIT...' : isLogin ? 'LOGIN' : 'SIGN UP'}
          </button>
        </form>

        <div className="mt-6 text-center font-bold uppercase tracking-wider text-sm">
          {isLogin ? "No account? " : "Have an account? "}
          <button
            onClick={switchMode}
            className="text-black bg-brutal-blue border-2 border-black hover:bg-black hover:text-white px-2 py-1 shadow-brutal-sm ml-1 transition-colors"
          >
            {isLogin ? 'SIGN UP' : 'LOGIN'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
