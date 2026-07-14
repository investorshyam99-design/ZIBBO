import React, { useState, useEffect } from 'react';
import { Star, Truck, ShieldCheck, ArrowLeft, Eye, Flame, Heart, ShoppingCart, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../AppContext';
import { Product } from '../types';
import SEO from '../components/SEO';

export default function ProductView() {
  const { selectedProductId, selectedProductObj, navigate, addToCart, products, wishlist, toggleWishlist } = useAppContext();
  const product = selectedProductObj || products.find(p => p.id === selectedProductId) || products[0];
  
  const [viewers, setViewers] = useState(74);
  const [sold, setSold] = useState(42);
  const [hours, setHours] = useState(8);
  const [rating, setRating] = useState('4.7');
  const [reviewCount, setReviewCount] = useState(128);
  
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    if (!product) return;
    
    // Generate consistent random values based on product id
    const seed = Array.from(product.id).reduce((s: number, c: any) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0) as number;
    const rng = () => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    setRating((rng() * (4.9 - 4.0) + 4.0).toFixed(1));
    setReviewCount(Math.floor(rng() * (199 - 50 + 1)) + 50);
    setViewers(Math.floor(rng() * (99 - 50 + 1)) + 50);
    setSold(Math.floor(rng() * (70 - 30 + 1)) + 30);
    setHours(Math.floor(rng() * (24 - 1 + 1)) + 1);

    // Handle recently viewed in localStorage
    try {
      const stored = localStorage.getItem('recentlyViewed');
      let viewedIds: string[] = stored ? JSON.parse(stored) : [];
      
      // Remove current product if exists to move it to front
      viewedIds = viewedIds.filter(id => id !== product.id);
      viewedIds.unshift(product.id);
      
      // Keep only last 8
      if (viewedIds.length > 8) viewedIds = viewedIds.slice(0, 8);
      
      localStorage.setItem('recentlyViewed', JSON.stringify(viewedIds));
      
      // Populate recently viewed products
      const viewedProducts = viewedIds
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => p !== undefined && p.id !== product.id);
        
      setRecentlyViewed(viewedProducts);
    } catch (e) {
      console.error('Error with localStorage', e);
    }

  }, [product, products]);

  const handleAddToCart = () => {
    if (product) addToCart(product, 1);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, 1);
      navigate('checkout');
    }
  };

  if (!product) return null;

  // Real images if available, otherwise fallback
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const hasMultipleImages = productImages.length > 1;
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen pb-32">
      <SEO 
        title={product.name}
        description={product.description}
        image={productImages[0]}
        product={{
          name: product.name,
          image: productImages[0],
          description: product.description,
          price: product.price,
          currency: "INR"
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate('home')} className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-navy mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="flex flex-col gap-6">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <img src={productImages[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Image Gallery */}
          {hasMultipleImages && (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-hide">
              {productImages.map((img, i) => (
                <div key={i} className="flex-none w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden snap-start cursor-pointer border border-gray-100 hover:border-gray-300 transition-colors">
                  <img src={img} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="mt-4">
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              {product.category}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-navy mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-3xl font-black text-brand-navy">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Live Stats */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center text-sm font-medium text-gray-600">
                <motion.span 
                  className="text-lg mr-2"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  👁
                </motion.span>
                <span className="font-bold text-brand-navy mr-1">{viewers}</span> people are viewing this product right now
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 text-sm max-w-2xl">
              {product.description || `Experience premium quality and modern design with the ${product.name}. Carefully crafted to elevate your daily routine and provide exceptional performance.`}
            </p>

            {/* Desktop Add to Cart */}
            <div className="space-y-4 mb-8 hidden md:block max-w-md">
              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest border border-gray-200 text-brand-navy hover:bg-gray-50 transition-colors">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="flex-1 bg-brand-navy text-white py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-8 max-w-md mb-12 text-center">
              <div className="flex flex-col items-center justify-center text-xs font-semibold text-brand-navy gap-2">
                <Truck className="w-6 h-6 text-gray-700" /> Free delivery
              </div>
              <div className="flex flex-col items-center justify-center text-xs font-semibold text-brand-navy gap-2">
                <ShieldCheck className="w-6 h-6 text-gray-700" /> Secure payment
              </div>
              <div className="flex flex-col items-center justify-center text-xs font-semibold text-brand-navy gap-2">
                <Banknote className="w-6 h-6 text-gray-700" /> Cod available
              </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-black text-brand-navy mb-6">Related Products</h3>
                <div className="grid grid-cols-2 gap-4">
                  {relatedProducts.map(rp => (
                    <div key={rp.id} onClick={() => navigate('product', rp.id)} className="group cursor-pointer">
                      <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden mb-3 relative">
                        <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="font-bold text-sm text-brand-navy line-clamp-1">{rp.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 font-bold">₹{rp.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-brand-navy mb-6">Recently Viewed Products</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentlyViewed.slice(0, 8).map(rv => (
                    <div key={rv.id} onClick={() => navigate('product', rv.id)} className="group cursor-pointer">
                      <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden mb-3 relative">
                        <img src={rv.image} alt={rv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="font-bold text-sm text-brand-navy line-clamp-1">{rv.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 font-bold">₹{rv.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Sticky Purchase Bar for Mobile */}
      <div className="md:hidden fixed bottom-[56px] left-0 right-0 bg-white border-t border-gray-100 z-40">
        <div className="flex">
          <button onClick={handleAddToCart} className="flex-1 bg-white text-brand-navy py-4 text-xs font-bold uppercase tracking-widest border-r border-gray-100 active:bg-gray-50 transition-colors">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="flex-1 bg-[#1a2138] text-white py-4 text-xs font-bold uppercase tracking-widest active:opacity-90 transition-opacity">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
