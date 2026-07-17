import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function CartDrawer() {
  const { isCartDrawerOpen, setIsCartDrawerOpen, cart, updateQuantity, removeFromCart, navigate } = useAppContext();
  
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);


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
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-medium text-black">Your Cart ({cart.length})</h2>
              <button onClick={() => setIsCartDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Trash2 className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-black mb-2">Your cart is empty</h3>
                  <button onClick={() => setIsCartDrawerOpen(false)} className="mt-4 px-6 py-3 bg-[#0f172a] text-white rounded-lg text-sm font-bold uppercase tracking-widest">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-xl relative border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-medium text-black line-clamp-2 pr-8">{item.product.name}</h3>
                        <button onClick={() => removeFromCart(item.product.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base font-medium text-black">₹{item.product.price.toLocaleString()}</span>
                        <div className="flex items-center bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1.5 hover:bg-gray-50 text-black">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center text-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1.5 hover:bg-gray-50 text-black">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-4 bg-gray-50/50">
                <div className="flex justify-between items-center mb-6 text-black">
                  <span className="text-lg font-medium">Subtotal</span>
                  <span className="text-xl font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('checkout');
                  }} 
                  className="w-full bg-[#0f172a] text-white h-14 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center hover:bg-opacity-90 transition-opacity"
                >
                  PROCEED TO CHECKOUT <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
