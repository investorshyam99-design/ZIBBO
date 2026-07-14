import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { products } from '../data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { navigate, cart } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <header 
        className={`transition-all duration-300 w-full z-40 relative ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-4' : 'bg-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LEFT: Logo mark */}
            <div className="flex-1 flex justify-start">
               <button onClick={() => navigate('home')} className="w-8 h-8 bg-brand-navy text-white flex items-center justify-center font-bold italic tracking-tighter rounded">
                 Z
               </button>
            </div>

            {/* CENTER: Brand name */}
            <div className="flex-1 flex justify-center">
              <button onClick={() => navigate('home')} className="text-2xl font-black tracking-tighter italic text-brand-navy hover:opacity-70 transition-opacity">
                ZIBBO
              </button>
            </div>

            {/* RIGHT: Icons */}
            <div className="flex-1 flex items-center justify-end space-x-4">
              <button onClick={() => { setIsSearchOpen(!isSearchOpen); setSearchQuery(''); }} className="text-brand-navy hover:opacity-70 transition-opacity">
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <button onClick={() => navigate('cart')} className="text-brand-navy hover:opacity-70 transition-opacity relative">
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-navy text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button className="text-brand-navy hover:opacity-70 transition-opacity">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[80px] left-0 w-full bg-white border-t border-gray-100 shadow-xl z-30"
          >
            <div className="max-w-3xl mx-auto p-4 md:p-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search premium products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  autoFocus
                />
              </div>

              {searchQuery && (
                <div className="mt-8 max-h-[60vh] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.map(product => (
                        <div
                          key={product.id}
                          onClick={() => {
                            navigate('product', product.id);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100"
                        >
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100" />
                          <div>
                            <h4 className="text-sm font-bold text-brand-navy">{product.name}</h4>
                            <p className="text-xs text-gray-500 font-medium mt-1">₹{product.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <p>No products found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
