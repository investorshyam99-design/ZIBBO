import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function CheckoutView() {
  const { cart, clearCart, addOrder, navigate, user, login } = useAppContext();
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '', mobile: '', email: user?.email || '', houseFlat: '', address: '', city: '', state: '', pincode: ''
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to place an order.");
      login();
      return;
    }

    setIsSubmitting(true);
    const productNames = cart.map(c => `${c.product.name} (x${c.quantity})`).join(', ');
    const totalQty = cart.reduce((sum, c) => sum + c.quantity, 0);
    
    await addOrder({
      orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: user.uid,
      customerName: formData.fullName,
      mobile: formData.mobile,
      address: `${formData.houseFlat}, ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      productNames,
      items: cart,
      quantity: totalQty,
      paymentStatus: 'Prepaid',
      orderStatus: 'Processing',
      dateTime: new Date().toLocaleString(),
      total: subtotal,
      status: 'Processing',
      createdAt: Date.now()
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
    // clearCart is handled in addOrder context
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <SEO title="Order Confirmed | ZIBBO" />
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
        <h1 className="text-3xl font-black tracking-tight text-brand-navy mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">Your order has been placed successfully and is now being processed. You can track it in the Admin Dashboard.</p>
        <div className="flex gap-4">
            <button onClick={() => navigate('home')} className="pill-btn border-2 border-brand-navy text-brand-navy px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
            Back to Home
            </button>
            <button onClick={() => navigate('admin')} className="pill-btn bg-brand-navy text-white px-8 py-3 text-xs font-bold uppercase tracking-widest shadow-premium hover:opacity-90 transition-opacity">
            View in Admin
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen pb-32">
      <SEO title="Checkout | ZIBBO" description="Securely checkout your premium items." />
      <h1 className="text-3xl font-black tracking-tight text-brand-navy mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center text-sm font-semibold mb-6">
            <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" /> Free Delivery Applied
          </div>
          
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-bold text-lg text-brand-navy mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="Full Name" className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              <input required type="tel" placeholder="Mobile Number" className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
            </div>
            <input type="email" placeholder="Email (optional)" className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="House / Flat" className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.houseFlat} onChange={e => setFormData({...formData, houseFlat: e.target.value})} />
              <input required type="text" placeholder="Address" className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input required type="text" placeholder="City" className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
              <input required type="text" placeholder="State" className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
              <input required type="text" placeholder="Pincode" className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
               <h2 className="font-bold text-lg text-brand-navy mb-4">Payment Method</h2>
               <div className="p-4 border-2 border-brand-navy rounded-lg bg-slate-50 flex items-center font-semibold text-brand-navy text-sm">
                   <div className="w-4 h-4 rounded-full bg-brand-navy mr-3 border-4 border-white shadow-[0_0_0_1px_#0F172A]"></div>
                   Secure Online Payment (Credit Card / UPI)
               </div>
               <p className="text-xs text-gray-500 mt-2 font-medium uppercase tracking-wider">* Cash on Delivery is not available for this order.</p>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 sticky top-24">
            <h2 className="font-bold text-lg text-brand-navy mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                 <div key={item.product.id} className="flex gap-4 items-center">
                    <img src={item.product.image} className="w-16 h-16 rounded-md object-cover bg-gray-50 border border-gray-100" />
                    <div className="flex-1">
                       <h4 className="text-sm font-bold text-brand-navy leading-tight line-clamp-2">{item.product.name}</h4>
                       <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-black text-brand-navy shrink-0">
                       ₹{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                 </div>
              ))}
            </div>
            
            <div className="space-y-3 mb-6 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-navy">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600 uppercase tracking-wider text-[10px]">Free Delivery</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-brand-navy text-lg">
                <span>Total to Pay</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
            
            <button form="checkout-form" type="submit" className="w-full pill-btn bg-brand-navy text-white py-4 text-xs font-bold uppercase tracking-widest shadow-premium hover:opacity-90 transition-opacity disabled:opacity-50" disabled={cart.length === 0 || isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Place Order & Pay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
