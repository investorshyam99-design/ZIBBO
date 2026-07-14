import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Heart, Trash2 } from 'lucide-react';
import { useAppContext } from '../AppContext';
import SEO from '../components/SEO';

export default function WishlistView() {
  const { navigate, addToCart, wishlist, products, toggleWishlist, user } = useAppContext();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="py-24 text-center px-4 max-w-2xl mx-auto min-h-screen">
        <SEO title="Wishlist | ZIBBO" description="Your saved premium products." />
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h2 className="text-2xl font-black text-brand-navy mb-4">Your Wishlist</h2>
        <p className="text-gray-500 mb-8">Please log in to view and manage your wishlist.</p>
        <button onClick={() => navigate('home')} className="pill-btn bg-brand-navy text-white px-8 py-3 text-sm font-bold uppercase tracking-widest shadow-premium hover:opacity-90 transition-opacity">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-offwhite pb-20 md:pb-0">
      <SEO title="Wishlist | ZIBBO" description="Your saved premium products." />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-brand-navy mb-2 flex items-center">
            <Heart className="w-8 h-8 mr-3 text-red-500 fill-red-500" /> My Wishlist
          </h1>
          <p className="text-gray-500 text-sm">Items you've saved for later.</p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-gray-100">
            <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium mb-6">Your wishlist is currently empty.</p>
            <button onClick={() => navigate('collections')} className="pill-btn border-2 border-brand-navy text-brand-navy px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
              Discover Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            <AnimatePresence mode="popLayout">
              {wishlistedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="card-hover bg-white rounded-xl overflow-hidden flex flex-col relative cursor-pointer border border-gray-100"
                  onClick={() => navigate('product', product.id)}
                >
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-md hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  
                  <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative group">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="w-full bg-white/90 backdrop-blur text-brand-navy font-bold text-xs uppercase tracking-widest py-3 rounded-lg shadow-lg hover:bg-brand-navy hover:text-white transition-colors flex items-center justify-center"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      {product.category}
                    </div>
                    <h3 className="font-bold text-brand-navy text-sm md:text-base leading-snug mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-black text-brand-navy text-base md:text-lg">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs md:text-sm text-gray-400 line-through font-medium">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
