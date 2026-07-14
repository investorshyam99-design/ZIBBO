import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../AppContext';
import SEO from '../components/SEO';

export default function SearchView() {
  const { products, navigate } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchResults = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Auto-focus input on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pb-32">
      <SEO title="Search | ZIBBO" description="Search our premium products." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search premium products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-brand-navy font-medium focus:outline-none focus:ring-2 focus:ring-brand-navy"
            autoFocus
          />
        </div>

        {searchQuery && (
          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Search Results
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map(product => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate('product', product.id);
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100"
                  >
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100" />
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy">{product.name}</h4>
                      <p className="text-xs text-gray-500 font-medium mt-1">₹{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No products found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
        
        {!searchQuery && (
          <div className="mt-8 text-center text-gray-400 py-12">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Start typing to search products...</p>
          </div>
        )}
      </div>
    </div>
  );
}
