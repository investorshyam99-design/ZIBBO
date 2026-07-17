const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf8');

const regex = /cart\.map\(item => \([\s\S]*?\)\)\n              \)\}/;

const newItems = `cart.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl relative">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="font-bold text-brand-navy text-sm line-clamp-2 pr-6">{item.product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-black text-brand-navy text-sm">₹{item.product.price.toLocaleString()}</span>
                        <div className="flex items-center bg-white rounded-md px-2 py-1 border border-gray-200 shadow-sm">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-0.5 hover:text-gray-500">
                            <Minus className="w-3 h-3 text-brand-navy" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center text-brand-navy">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-0.5 hover:text-gray-500">
                            <Plus className="w-3 h-3 text-brand-navy" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}`;

code = code.replace(regex, newItems);

code = code.replace(
  '{cart.length > 0 && (\n              <div className="p-4 border-t border-gray-100 bg-gray-50/80">\n                <div className="flex justify-between items-center mb-6">\n                  <span className="font-semibold text-brand-navy">Subtotal</span>\n                  <span className="text-xl font-bold text-brand-navy">₹{subtotal.toLocaleString()}</span>\n                </div>\n                <button \n                  onClick={() => {\n                    setIsCartDrawerOpen(false);\n                    navigate(\'checkout\');\n                  }} \n                  className="w-full bg-[#111827] text-white h-[52px] rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center hover:opacity-90 transition-opacity"\n                >\n                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />\n                </button>\n              </div>\n            )}',
  `{cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4 text-sm font-bold text-brand-navy">
                  <span>Subtotal</span>
                  <span className="text-lg">₹{subtotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('checkout');
                  }} 
                  className="w-full bg-brand-navy text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center hover:bg-opacity-90 transition-opacity"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}`
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
