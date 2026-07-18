const fs = require('fs');
let code = fs.readFileSync('src/views/ProductView.tsx', 'utf8');

const modalImport = `import { Star, Truck, ShieldCheck, ArrowLeft, Eye, Flame, Heart, ShoppingCart, Banknote, X, CheckCircle2 } from 'lucide-react';`;
code = code.replace(/import \{ Star.*\} from 'lucide-react';/, modalImport);

const stateVars = `
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', mobile: '', address: '', pincode: '' });
  const { addOrder } = useAppContext();
`;
code = code.replace(/const productReviews = React.useMemo/, stateVars + "\n  const productReviews = React.useMemo");

const newHandleBuyNow = `
  const handleBuyNow = () => {
    setIsQuickOrderOpen(true);
  };
  
  const submitQuickOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !product) return;
    setIsSubmitting(true);
    try {
      await addOrder({
        customerName: formData.fullName,
        mobile: formData.mobile,
        email: '',
        address: \`\${formData.address}, Pincode: \${formData.pincode}\`,
        productNames: product.name,
        items: [{ product: product, quantity: 1 }],
        quantity: 1,
        paymentStatus: 'Advance Paid (COD)',
        orderStatus: 'Processing',
        dateTime: new Date().toLocaleString(),
        total: product.price,
        status: 'Processing',
        createdAt: Date.now()
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Order failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };
`;
code = code.replace(/const handleBuyNow = \(\) => \{[\s\S]*?\};/, newHandleBuyNow);

const quickOrderModal = `
      {/* Quick Order Modal */}
      <AnimatePresence>
        {isQuickOrderOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
              onClick={() => setIsQuickOrderOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%', opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 w-full md:max-w-md bg-white z-[101] shadow-2xl rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-brand-navy">Quick Order</h2>
                <button onClick={() => setIsQuickOrderOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="p-4">
                {isSuccess ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                    <h2 className="text-xl font-black text-brand-navy mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-6 font-medium text-sm">Thank you for shopping with ZIBBO.<br/>Your order will be delivered soon.</p>
                    <button onClick={() => { setIsSuccess(false); setIsQuickOrderOpen(false); }} className="px-8 py-3 bg-brand-navy text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors w-full">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitQuickOrder} className="space-y-4">
                    <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                        <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy line-clamp-1">{product?.name}</h4>
                        <p className="text-sm font-black text-brand-navy mt-1">₹{product?.price.toLocaleString()} <span className="text-[10px] text-gray-500 font-medium">Qty: 1</span></p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">Full Name</label>
                      <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy focus:bg-white text-sm transition-all" placeholder="Enter your full name" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">Mobile Number</label>
                      <input required type="tel" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy focus:bg-white text-sm transition-all" placeholder="10-digit mobile number" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">Delivery Address</label>
                      <textarea required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy focus:bg-white text-sm transition-all resize-none" rows={3} placeholder="House no, Street, Landmark, City"></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">PIN Code</label>
                      <input required type="text" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy focus:bg-white text-sm transition-all" placeholder="6-digit PIN code" />
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-yellow-600 shrink-0" />
                      <p className="text-xs font-bold text-yellow-800">Cash on Delivery selected.</p>
                    </div>
                    
                    <button type="submit" disabled={isSubmitting} className="w-full h-14 bg-[#1a2138] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50">
                      {isSubmitting ? 'Processing...' : \`Confirm Order • ₹\${product?.price.toLocaleString()}\`}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
`;
code = code.replace(/<\/div>\s*\{\/\* Sticky Purchase Bar for Mobile \*\/\}/, quickOrderModal + "\n      </div>\n      {/* Sticky Purchase Bar for Mobile */}");

fs.writeFileSync('src/views/ProductView.tsx', code);
