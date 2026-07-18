const fs = require('fs');

const code = `import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function CartDrawer() {
  const { isCartDrawerOpen, setIsCartDrawerOpen, cart, updateQuantity, removeFromCart, navigate, products } = useAppContext();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  // Recommended Products (random)
  const recommendedProducts = products.filter(p => !cart.find(c => c.product.id === p.id)).sort(() => 0.5 - Math.random()).slice(0, 4);

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      setTimeLeft(600); // Reset timer when opened
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);

  useEffect(() => {
    let timer: any;
    if (isCartDrawerOpen && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCartDrawerOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return \`\${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            onClick={() => setIsCartDrawerOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-medium text-black">Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
              <button onClick={() => setIsCartDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto flex flex-col">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Trash2 className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-black mb-2">Your cart is empty</h3>
                  <button onClick={() => setIsCartDrawerOpen(false)} className="mt-4 px-6 py-3 bg-[#0f172a] text-white rounded-lg text-sm font-bold uppercase tracking-widest">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-4 space-y-4">
                    {/* Progress Bar */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-brand-navy font-semibold text-center mb-2">
                        {progress >= 100 
                          ? '✨ You have unlocked Free Shipping!' 
                          : \`Add ₹\${(freeShippingThreshold - subtotal).toLocaleString()} more for Free Shipping\`}
                      </p>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full transition-all duration-500" style={{ width: \`\${progress}%\` }}></div>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-xl flex items-start gap-3">
                      <div className="text-xl">⚡</div>
                      <div>
                        <p className="text-xs text-yellow-800 font-medium leading-tight">
                          <span className="font-bold">This item is in high demand.</span><br/>
                          We've reserved your cart for the next <span className="font-bold text-red-600">{formatTime(timeLeft)}</span> minutes to help secure your order.
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-xl relative border border-gray-100 shadow-sm">
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex justify-between items-start">
                              <div className="pr-6">
                                <h3 className="text-sm font-bold text-brand-navy line-clamp-2 leading-snug">{item.product.name}</h3>
                                {item.product.variants && item.product.variants.length > 0 && (
                                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-semibold">Variant: {item.product.variants[0].title}</p>
                                )}
                              </div>
                              <button onClick={() => removeFromCart(item.product.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-brand-navy">₹{item.product.price.toLocaleString()}</span>
                                {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                                  <span className="text-xs text-gray-400 line-through">₹{item.product.originalPrice.toLocaleString()}</span>
                                )}
                              </div>
                              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:text-gray-600 text-gray-400">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-6 text-center text-brand-navy">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:text-gray-600 text-gray-400">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Trust & Info */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy bg-gray-50 p-3 rounded-lg justify-center">
                        <Truck className="w-4 h-4 text-gray-500" /> Fast Dispatch
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy bg-gray-50 p-3 rounded-lg justify-center">
                        <ShieldCheck className="w-4 h-4 text-green-600" /> Secure Checkout
                      </div>
                    </div>
                  </div>

                  {/* You May Also Like */}
                  {recommendedProducts.length > 0 && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                      <h3 className="text-sm font-black text-brand-navy mb-4 uppercase tracking-wider">You May Also Like</h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                        {recommendedProducts.map(rp => (
                          <div key={rp.id} onClick={() => { setIsCartDrawerOpen(false); navigate('product', rp.id); }} className="group cursor-pointer flex-none w-[140px] snap-start bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="aspect-square bg-gray-50 overflow-hidden relative">
                              <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-3">
                              <h4 className="font-bold text-xs text-brand-navy line-clamp-1 mb-1">{rp.name}</h4>
                              <div className="flex items-center text-[10px] font-bold text-gray-500 mb-1">
                                <span className="text-yellow-500 mr-1">★</span> {rp.rating} ({rp.reviews})
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="font-black text-xs text-brand-navy">₹{rp.price.toLocaleString()}</span>
                                {rp.originalPrice && rp.originalPrice > rp.price && (
                                  <span className="text-[10px] text-gray-400 line-through">₹{rp.originalPrice.toLocaleString()}</span>
                                )}
                              </div>
                              <button className="w-full mt-2 py-1.5 border border-gray-200 rounded text-[10px] font-bold text-brand-navy hover:bg-gray-50 transition-colors uppercase">
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-black text-brand-navy">
                    <span>Total</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('checkout');
                  }} 
                  className="w-full bg-[#0f172a] text-white h-14 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center shadow-lg hover:bg-black transition-colors"
                >
                  <ShieldCheck className="w-5 h-5 mr-2 text-green-400" />
                  SECURE CHECKOUT <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                
                <div className="mt-4 text-center">
                  <div className="flex justify-center gap-2">
                    <div className="w-10 h-6 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400">VISA</div>
                    <div className="w-10 h-6 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400">MC</div>
                    <div className="w-10 h-6 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400">UPI</div>
                    <div className="w-10 h-6 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400">AMEX</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
`;

fs.writeFileSync('src/components/CartDrawer.tsx', code);
