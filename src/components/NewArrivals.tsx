import React from 'react';
import { Star } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function NewArrivals() {
  const { products, navigate } = useAppContext();
  
  if (!products || products.length === 0) return null;
  
  // Just use some products for new arrivals
  const displayProducts = products.slice(3, 7);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-brand-navy text-center mb-8 uppercase tracking-tight">
          New Arrivals
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => navigate('product', product.id)}
              className="flex-none w-[200px] md:w-[240px] snap-start bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-2 left-2 bg-brand-navy text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {product.badges[0]}
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col h-[140px] justify-between">
                <div>
                  <h3 className="font-bold text-sm text-brand-navy line-clamp-2 leading-tight mb-1">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-black text-brand-navy text-sm">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
