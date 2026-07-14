import React from 'react';
import { useAppContext } from '../AppContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function CartView() {
  const { cart, updateQuantity, removeFromCart, navigate } = useAppContext();
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen pb-32">
      <h1 className="text-3xl font-black tracking-tight text-brand-navy mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500 mb-6 font-semibold">Your cart is currently empty.</p>
          <button onClick={() => navigate('home')} className="pill-btn bg-brand-navy text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:opacity-90">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="bg-white rounded-xl p-4 flex gap-4 border border-gray-100 items-center">
                <div className="w-24 h-24 bg-brand-offwhite rounded-lg overflow-hidden shrink-0 border border-gray-100">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-brand-navy text-sm line-clamp-1">{item.product.name}</h3>
                  <div className="text-brand-navy font-black text-sm mt-1">₹{item.product.price.toLocaleString()}</div>
                  <div className="flex items-center mt-3 bg-brand-offwhite w-fit rounded-full px-2 py-1 border border-gray-200">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-gray-500 transition-colors">
                      <Minus className="w-3 h-3 text-brand-navy" />
                    </button>
                    <span className="text-xs font-bold w-6 text-center text-brand-navy">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-gray-500 transition-colors">
                      <Plus className="w-3 h-3 text-brand-navy" />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 h-fit">
            <h2 className="font-bold text-lg text-brand-navy mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-navy">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600 uppercase tracking-wider text-[10px]">Free Delivery</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-brand-navy text-lg">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => navigate('checkout')} className="w-full pill-btn bg-brand-navy text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center shadow-premium hover:opacity-90 transition-opacity">
              Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
