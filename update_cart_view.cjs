const fs = require('fs');
let code = fs.readFileSync('src/views/CartView.tsx', 'utf8');

code = code.replace(
  /cart\.map\(item => \([\s\S]*?\}\)\n                      <\/div>\n                    <\/div>/,
  `cart.map(item => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl relative shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div className="pr-8">
                      <h3 className="font-bold text-brand-navy text-sm md:text-base uppercase line-clamp-2 leading-tight">{item.product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Variant: Default</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-brand-navy">₹{item.product.price.toLocaleString()}</span>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <span className="text-xs text-gray-400 line-through">₹{item.product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-lg px-1 py-1 border border-gray-100">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-gray-500 transition-colors">
                          <Minus className="w-3 h-3 text-brand-navy" />
                        </button>
                        <span className="text-xs font-bold w-6 text-center text-brand-navy">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-gray-500 transition-colors">
                          <Plus className="w-3 h-3 text-brand-navy" />
                        </button>
                      </div>
                    </div>`
);

code = code.replace(
  /                  <\/div>\n                  <button onClick=\{\(\) => removeFromCart\(item\.product\.id\)\} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">\n                    <Trash2 className="w-4 h-4" \/>\n                  <\/button>\n                <\/div>\n              \)\)/,
  `                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))`
);

fs.writeFileSync('src/views/CartView.tsx', code);
