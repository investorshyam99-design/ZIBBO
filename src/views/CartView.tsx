import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ArrowRight, X } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function CartView() {
  const { cart, updateQuantity, removeFromCart, navigate } = useAppContext();
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-black text-brand-navy mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('home')}
          className="px-8 py-4 bg-[#0f172a] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium text-black">Your Cart ({cart.length})</h1>
        <button onClick={() => navigate('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4 mb-32">
        {cart.map(item => (
          <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-xl relative border border-gray-100 shadow-sm">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-medium text-black line-clamp-2 pr-10">{item.product.name}</h3>
                <button onClick={() => removeFromCart(item.product.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-medium text-black">₹{item.product.price.toLocaleString()}</span>
                <div className="flex items-center bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-gray-50 text-black">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium w-8 text-center text-black">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-gray-50 text-black">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-[60px] md:bottom-0 left-0 right-0 bg-gray-50/90 backdrop-blur-md border-t border-gray-200 p-4 z-40">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4 text-black">
            <span className="text-lg font-medium">Subtotal</span>
            <span className="text-xl font-medium">₹{subtotal.toLocaleString()}</span>
          </div>
          <button 
            onClick={() => navigate('checkout')}
            className="w-full bg-[#0f172a] text-white h-14 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center hover:bg-opacity-90 transition-opacity"
          >
            PROCEED TO CHECKOUT <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
