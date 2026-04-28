import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await api.getProductBySlug(slug);
        setProductData(data);
        
        // Size logic will be handled dynamically below
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const { product, images, attributes } = productData || {};

  // Determine available sizes
  const sizes = React.useMemo(() => {
    let computedSizes = [];
    const dbSizes = attributes?.filter(a => a.name.toLowerCase() === 'size').map(a => a.value_text || a.value_number);
    
    if (dbSizes && dbSizes.length > 0) {
      if (dbSizes.length === 1 && typeof dbSizes[0] === 'string' && dbSizes[0].includes(',')) {
        computedSizes = dbSizes[0].split(',').map(s => s.trim());
      } else {
        computedSizes = dbSizes;
      }
    } else if (product) {
      const isClothing = product.category_id === 6 || product.parent_category_id === 6;
      if (isClothing) {
        computedSizes = ['S', 'M', 'L', 'XL'];
      }
    }
    return computedSizes;
  }, [product, attributes]);

  // Set default selected size safely if none selected yet
  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, selectedSize]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center h-96">
        <div className="text-3xl font-black uppercase tracking-widest animate-pulse border-4 border-black p-4 bg-brutal-yellow shadow-brutal">
          LOADING...
        </div>
      </div>
    );
  }

  if (!productData || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-4 border-black p-8 bg-brutal-pink shadow-brutal text-center">
          <h1 className="text-4xl font-black uppercase">PRODUCT NOT FOUND</h1>
        </div>
      </div>
    );
  }

  const primaryImage = images?.find(img => img.is_primary) || images?.[0];
  const imageUrl = primaryImage ? primaryImage.image_url : '/placeholder.svg';

  const handleAddToCart = () => {
    addToCart({ ...product, images }, quantity, selectedSize);
    alert(`Added ${quantity}x ${product.name} (Size: ${selectedSize || 'N/A'}) to cart!`);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, images }, quantity, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="border-4 border-black shadow-brutal bg-white p-4 sticky top-24">
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="w-full h-auto aspect-square object-cover border-2 border-black"
              onError={(e) => { e.target.src = '/placeholder.svg'; }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{product.name}</h1>
            <p className="text-xl font-bold text-slate-600 uppercase tracking-widest">{product.brand}</p>
          </div>

          <div className="flex items-end gap-4 border-b-4 border-black pb-6">
            <span className="text-5xl font-black bg-brutal-green px-3 py-1 border-4 border-black shadow-brutal-sm">
              ₹{parseFloat(product.price).toFixed(2)}
            </span>
            {product.compare_at_price && (
              <span className="text-2xl font-bold text-slate-500 line-through decoration-4 decoration-brutal-pink">
                ₹{parseFloat(product.compare_at_price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="prose prose-lg border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-medium text-lg leading-relaxed">
              {product.description || "No description available for this product. But rest assured, it's absolutely brutal in quality."}
            </p>
          </div>

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider mb-3">SELECT SIZE</h3>
              <div className="flex flex-wrap gap-4">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3.5rem] h-14 border-4 border-black font-black text-xl flex items-center justify-center px-2 transition-transform hover:-translate-y-1 ${selectedSize === size ? 'bg-brutal-yellow shadow-brutal-sm translate-x-1 -translate-y-1' : 'bg-white hover:shadow-brutal-sm'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <h3 className="text-xl font-black uppercase tracking-wider mb-3">QUANTITY</h3>
            <div className="flex items-center border-4 border-black w-max bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-2xl font-black hover:bg-brutal-pink transition-colors border-r-4 border-black"
              >
                -
              </button>
              <div className="w-16 h-12 flex items-center justify-center text-2xl font-black">
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center text-2xl font-black hover:bg-brutal-green transition-colors border-l-4 border-black"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white border-4 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 active:translate-y-0 active:shadow-brutal-sm transition-all py-4 text-2xl font-black uppercase tracking-widest"
            >
              ADD TO CART
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-black text-white border-4 border-black shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 active:translate-y-0 active:shadow-brutal-sm transition-all py-4 text-2xl font-black uppercase tracking-widest hover:bg-brutal-blue hover:text-black"
            >
              BUY NOW
            </button>
          </div>
          
          <div className="mt-8 border-t-4 border-black pt-8">
            <div className="flex justify-between font-black uppercase tracking-widest">
              <span>STOCK STATUS:</span>
              <span className={product.stock_quantity > 0 ? 'text-green-700' : 'text-red-600'}>
                {product.stock_quantity > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
