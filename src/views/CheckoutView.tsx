import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { CheckCircle2, ShieldCheck, Truck, Lock, CreditCard, Banknote } from 'lucide-react';
import SEO from '../components/SEO';

export default function CheckoutView() {
  const { cart, addOrder, navigate } = useAppContext();
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const [paymentMode, setPaymentMode] = useState<'prepaid' | 'cod'>('prepaid');

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
    pincode: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const placeOrder = async (productNames: string, totalQty: number, finalTotal: number) => {
    await addOrder({
      customerName: formData.fullName,
      mobile: formData.mobile,
      email: '',
      address: `${formData.address}, Pincode: ${formData.pincode}`,
      productNames,
      items: cart,
      quantity: totalQty,
      paymentStatus: paymentMode === 'cod' ? 'Advance Paid (COD)' : 'Prepaid',
      orderStatus: 'Processing',
      dateTime: new Date().toLocaleString(),
      total: finalTotal,
      status: 'Processing',
      createdAt: Date.now()
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const productNames = cart.map(i => `${i.product.name} (x${i.quantity})`).join(', ');
    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    
    const codCharge = paymentMode === 'cod' ? 50 : 0;
    const finalTotal = subtotal + codCharge;
    const amountToPay = paymentMode === 'cod' ? advanceAmount : finalTotal;

    try {
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountToPay * 100 })
      });
      const orderData = await res.json();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_StypktCPqE3yKw',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ZIBBO',
        description: 'Purchase from ZIBBO',
        order_id: orderData.id,
        handler: async function (response: any) {
          await placeOrder(productNames, totalQty, finalTotal);
        },
        prefill: {
          name: formData.fullName,
          contact: formData.mobile,
        },
        theme: {
          color: '#0f172a'
        },
        modal: {
          ondismiss: function() {
            setIsSubmitting(false);
          }
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert('Payment failed: ' + response.error.description);
        setIsSubmitting(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Failed to initialize payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-gray-50">
        <SEO title="Order Confirmed | ZIBBO" />
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-6 mx-auto" />
          <h1 className="text-2xl font-black tracking-tight text-brand-navy mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8 text-sm">Your order has been placed successfully. You will receive an SMS shortly.</p>
          <div className="flex flex-col gap-3">
              <button onClick={() => navigate('home')} className="w-full h-12 rounded-xl border border-gray-200 text-brand-navy font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors">
              Back to Home
              </button>
              <button onClick={() => navigate('admin')} className="w-full h-12 rounded-xl bg-brand-navy text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
              View Order Status
              </button>
          </div>
        </div>
      </div>
    );
  }

  const codCharge = paymentMode === 'cod' ? 50 : 0;
  const orderTotal = subtotal + codCharge;
  const advanceAmount = 150;
  const payOnDelivery = orderTotal - advanceAmount;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO title="Secure Checkout | ZIBBO" description="Secure one-page checkout." />
      
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 text-center sticky top-0 z-40 shadow-sm flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-bold text-brand-navy">Secure Checkout</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
        <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Customer Information */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="font-bold text-lg text-brand-navy mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs flex items-center justify-center mr-3">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Mobile Number *</label>
                  <input required type="tel" placeholder="10-digit mobile number" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="font-bold text-lg text-brand-navy mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center mr-3">2</span>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Full Name *</label>
                  <input required type="text" placeholder="First and Last Name" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Address *</label>
                  <input required type="text" placeholder="House/Flat No, Street, Area, City, State" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Pincode *</label>
                  <input required type="text" placeholder="6 digits" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-colors" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="font-bold text-lg text-brand-navy mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center mr-3">3</span>
                Payment Options
              </h2>
              <div className="space-y-3">
                <div onClick={() => setPaymentMode('prepaid')} className={`p-4 border-2 rounded-xl flex items-center cursor-pointer transition-colors ${paymentMode === 'prepaid' ? 'border-brand-navy bg-blue-50/50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                  <div className={`w-4 h-4 rounded-full mr-3 ${paymentMode === 'prepaid' ? 'bg-brand-navy border-4 border-white shadow-[0_0_0_1px_#0F172A]' : 'border border-gray-300'}`}></div>
                  <div className="flex-1">
                    <div className="font-bold text-brand-navy text-sm">Pay via UPI / Cards / Netbanking</div>
                    <div className="text-xs text-green-600 mt-0.5 font-semibold">Free Delivery</div>
                  </div>
                  <CreditCard className={`w-5 h-5 ${paymentMode === 'prepaid' ? 'text-brand-navy' : 'text-gray-400'}`} />
                </div>
                
                <div onClick={() => setPaymentMode('cod')} className={`p-4 border-2 rounded-xl flex flex-col cursor-pointer transition-colors ${paymentMode === 'cod' ? 'border-brand-navy bg-blue-50/50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                   <div className="flex items-center">
                     <div className={`w-4 h-4 rounded-full mr-3 ${paymentMode === 'cod' ? 'bg-brand-navy border-4 border-white shadow-[0_0_0_1px_#0F172A]' : 'border border-gray-300'}`}></div>
                     <div className="flex-1">
                       <div className="font-bold text-brand-navy text-sm">Cash on Delivery (COD)</div>
                       <div className="text-xs text-gray-500 mt-0.5 font-medium">+ ₹50 COD Handling Charge</div>
                     </div>
                     <Banknote className={`w-5 h-5 ${paymentMode === 'cod' ? 'text-brand-navy' : 'text-gray-400'}`} />
                   </div>
                   
                   {paymentMode === 'cod' && (
                     <div className="mt-4 ml-7 bg-white p-3 rounded-lg border border-blue-100 text-sm text-brand-navy space-y-2">
                       <div className="flex justify-between">
                         <span className="text-gray-600">Total Order Value:</span>
                         <span className="font-bold">₹{orderTotal.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between text-blue-700 bg-blue-50 p-2 rounded">
                         <span className="font-semibold">Advance Payment (Pay Now):</span>
                         <span className="font-black">₹{advanceAmount.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-600">Pay on Delivery:</span>
                         <span className="font-bold">₹{payOnDelivery.toLocaleString()}</span>
                       </div>
                     </div>
                   )}
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-6">
            
            {/* Order Summary Sticky */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-20">
              
              <h2 className="font-bold text-lg text-brand-navy mb-4">Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                {cart.map(item => (
                   <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="relative shrink-0">
                        <img src={item.product.image} className="w-16 h-16 rounded-xl object-cover bg-gray-50 border border-gray-100" />
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold text-brand-navy leading-tight line-clamp-2">{item.product.name}</h4>
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
                {paymentMode === 'cod' ? (
                  <div className="flex justify-between text-gray-600">
                    <span>COD Handling</span>
                    <span className="font-semibold text-brand-navy">₹50</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600 uppercase tracking-wider text-[10px]">Free Delivery</span>
                  </div>
                )}
                
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="font-bold text-gray-600">Total Order Value</span>
                  <span className="font-black text-brand-navy text-xl">₹{orderTotal.toLocaleString()}</span>
                </div>

                {paymentMode === 'cod' && (
                  <div className="bg-blue-50 p-3 rounded-lg mt-2 flex justify-between items-center border border-blue-100">
                    <span className="font-bold text-blue-800">To Pay Now (Advance)</span>
                    <span className="font-black text-blue-800 text-xl">₹{advanceAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <button type="submit" className="w-full h-14 rounded-xl bg-brand-navy text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center shadow-lg hover:bg-black transition-colors disabled:opacity-50" disabled={cart.length === 0 || isSubmitting}>
                <Lock className="w-4 h-4 mr-2" /> 
                {isSubmitting ? 'Processing...' : `Proceed to Checkout`}
              </button>
              
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Secure Checkout
                </div>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
}
