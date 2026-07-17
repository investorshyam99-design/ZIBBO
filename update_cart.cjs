const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf8');

code = code.replace(
  '            <div className="p-4 border-b border-gray-100 flex items-center justify-between">\n              <h2 className="text-lg font-black text-brand-navy">Your Cart ({cart.length})</h2>',
  '            <div className="p-4 border-b border-gray-100 flex items-center justify-between">\n              <h2 className="text-lg font-bold text-brand-navy">Your Cart ({cart.length})</h2>'
);

code = code.replace(
  /cart\.map\(item => \([\s\S]*?\)\)\n              \)}/,
  `cart.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl relative shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="pr-8">
                        <h3 className="font-bold text-brand-navy text-sm uppercase line-clamp-2 leading-tight">{item.product.name}</h3>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-brand-navy text-sm">₹{item.product.price.toLocaleString()}</span>
                        <div className="flex items-center bg-gray-50 rounded-lg px-1 py-1 border border-gray-100">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-gray-500">
                            <Minus className="w-3 h-3 text-brand-navy" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center text-brand-navy">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-gray-500">
                            <Plus className="w-3 h-3 text-brand-navy" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}`
);

code = code.replace(
  /\{cart\.length > 0 && \([\s\S]*?\}\)\n          <\/motion\.div>/,
  `{cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50/80">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-brand-navy">Subtotal</span>
                  <span className="text-xl font-bold text-brand-navy">₹{subtotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('checkout');
                  }} 
                  className="w-full bg-[#111827] text-white h-[52px] rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}
          </motion.div>`
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
