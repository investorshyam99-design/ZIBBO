import React, { useState, useEffect } from 'react';
import { Star, Truck, ShieldCheck, ArrowLeft, Eye, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../AppContext';
import { products } from '../data';

export default function ProductView() {
  const { selectedProductId, selectedProductObj, navigate, addToCart } = useAppContext();
  const product = selectedProductObj || products.find(p => p.id === selectedProductId) || products[0];
  
  const [viewers, setViewers] = useState(0);
  const [sold, setSold] = useState(0);
  const [hours, setHours] = useState(0);
  const [rating, setRating] = useState('4.0');
  const [reviewCount, setReviewCount] = useState(50);
  const [showViewingPopup, setShowViewingPopup] = useState(false);
  const [showSalesPopup, setShowSalesPopup] = useState(false);

  useEffect(() => {
    // Generate consistent random values
    setRating((Math.random() * (4.9 - 4.0) + 4.0).toFixed(1));
    setReviewCount(Math.floor(Math.random() * (199 - 50 + 1)) + 50);
    
    // Live popups data
    const generateViewingData = () => {
      setViewers(Math.floor(Math.random() * (99 - 50 + 1)) + 50);
      setShowViewingPopup(true);
      setTimeout(() => setShowViewingPopup(false), 5000);
    };

    const generateSalesData = () => {
      setSold(Math.floor(Math.random() * (70 - 30 + 1)) + 30);
      setHours(Math.floor(Math.random() * (24 - 1 + 1)) + 1);
      setShowSalesPopup(true);
      setTimeout(() => setShowSalesPopup(false), 5000);
    };

    generateViewingData();
    
    const viewingInterval = setInterval(generateViewingData, 15000);
    
    setTimeout(() => {
      generateSalesData();
      setInterval(generateSalesData, 20000);
    }, 7500);

    return () => {
      clearInterval(viewingInterval);
    };
  }, [selectedProductId]);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('checkout');
  };

  // Mock additional images
  const additionalImages = [
    product.image,
    product.image.replace('w=800', 'w=801'),
    product.image.replace('w=800', 'w=802'),
    product.image.replace('w=800', 'w=803')
  ];

  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate('home')} className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-navy mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="flex flex-col gap-6">
          {/* Main Image */}
          <div className="relative aspect-square bg-brand-offwhite rounded-2xl overflow-hidden border border-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            
            {/* Rating Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center shadow-lg">
              <span className="text-yellow-500 text-sm tracking-widest mr-2">★★★★★</span>
              <span className="text-xs font-bold text-brand-navy">| {reviewCount}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-hide">
            {additionalImages.map((img, i) => (
              <div key={i} className="flex-none w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden snap-start cursor-pointer border border-gray-100 hover:border-gray-300 transition-colors">
                <img src={img} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="mt-4">
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              {product.category}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-navy mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline space-x-3 mb-8">
              <span className="text-3xl font-black text-brand-navy">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 text-sm max-w-2xl">
              Experience premium quality and modern design with the {product.name}. Carefully crafted to elevate your daily routine and provide exceptional performance.
            </p>

            <div className="space-y-4 mb-8 hidden md:block max-w-md">
              <button onClick={handleAddToCart} className="w-full pill-btn border-2 border-brand-navy text-brand-navy py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="w-full pill-btn bg-brand-navy text-white py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 shadow-premium transition-opacity">
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8 max-w-md">
              <div className="flex items-center text-sm font-semibold text-brand-navy">
                <Truck className="w-5 h-5 mr-2" /> Free Delivery
              </div>
              <div className="flex items-center text-sm font-semibold text-brand-navy">
                <ShieldCheck className="w-5 h-5 mr-2" /> 1 Year Warranty
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Popups */}
      <div className="fixed bottom-[80px] md:bottom-6 left-4 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {showViewingPopup && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-brand-navy text-white px-4 py-3 rounded-xl shadow-2xl flex items-center text-sm font-medium border border-gray-800"
            >
              <Eye className="w-4 h-4 mr-3 text-blue-400 shrink-0" />
              <span>👁 {viewers} people are viewing this product right now</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSalesPopup && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-brand-navy text-white px-4 py-3 rounded-xl shadow-2xl flex items-center text-sm font-medium border border-gray-800"
            >
              <Flame className="w-4 h-4 mr-3 text-orange-400 shrink-0" />
              <span>🔥 {sold} sold in the last {hours} hours</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Purchase Bar for Mobile */}
      <div className="md:hidden fixed bottom-[60px] left-0 right-0 bg-white border-t border-gray-100 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex space-x-3">
          <button onClick={handleAddToCart} className="flex-1 pill-btn border-2 border-brand-navy text-brand-navy py-3.5 text-[10px] font-bold uppercase tracking-widest">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="flex-1 pill-btn bg-brand-navy text-white py-3.5 text-[10px] font-bold uppercase tracking-widest shadow-premium">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
