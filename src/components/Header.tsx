import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, LogOut, ShoppingBag, Menu, X, Heart, ChevronRight } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { navigate, cart, products, user, login, logout, wishlist, isAdmin } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAuthAction = () => {
    setIsDrawerOpen(false);
    if (!user) {
      login();
    } else {
      logout();
    }
  };

  const drawerLinks = user ? [
    { label: 'My Account', action: () => { setIsDrawerOpen(false); isAdmin ? navigate('admin') : navigate('home'); } },
    { label: 'My Orders', action: () => { setIsDrawerOpen(false); navigate('home'); } }, // Replace with real view later
    { label: 'Wishlist', action: () => { setIsDrawerOpen(false); navigate('wishlist'); } },
    { label: 'Logout', action: handleAuthAction },
  ] : [
    { label: 'Sign In', action: handleAuthAction },
  ];

  const commonLinks = [
    { label: 'Collections', action: () => { setIsDrawerOpen(false); navigate('collections'); } },
    { label: 'Track Order', action: () => { setIsDrawerOpen(false); } },
    { label: 'Contact Us', action: () => { setIsDrawerOpen(false); } },
    { label: 'Shipping Policy', action: () => { setIsDrawerOpen(false); } },
    { label: 'Refund Policy', action: () => { setIsDrawerOpen(false); } },
    { label: 'Privacy Policy', action: () => { setIsDrawerOpen(false); } },
    { label: 'Terms & Conditions', action: () => { setIsDrawerOpen(false); } },
  ];

  const allLinks = [...drawerLinks, ...commonLinks];

  return (
    <>
      <header 
        className={`transition-all duration-300 w-full z-40 relative ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-4' : 'bg-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LEFT: Logo and Brand Name */}
            <div className="flex items-center space-x-3">
               <button onClick={() => navigate('home')} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                 <img src="https://i.imgur.com/GmP5uNs.png" alt="ZIBBO Logo" className="h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                 <span className="text-2xl font-black tracking-tighter italic text-brand-navy">
                   ZIBBO
                 </span>
               </button>
            </div>

            {/* RIGHT: Icons */}
            <div className="flex items-center space-x-5">
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

              <button onClick={() => setIsDrawerOpen(true)} className="text-brand-navy hover:opacity-70 transition-opacity pl-1">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SIDE DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="font-black tracking-tighter italic text-brand-navy text-xl">ZIBBO</div>
                <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-brand-navy">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6">
                <nav className="flex flex-col">
                  {allLinks.map((link, idx) => (
                    <button 
                      key={idx}
                      onClick={link.action}
                      className="flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors group"
                    >
                      <span className={`font-bold uppercase tracking-widest text-xs ${link.label === 'Logout' ? 'text-red-500' : 'text-brand-navy'}`}>
                        {link.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-navy transition-colors" />
                    </button>
                  ))}
                </nav>
              </div>
              {user && (
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Logged in as</div>
                  <div className="text-sm font-bold text-brand-navy truncate">{user.email}</div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
