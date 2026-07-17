import React from 'react';
import { useAppContext } from '../AppContext';

const categoryData = [
  { name: 'Galaxy Projectors', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=600' },
  { name: 'Night Lamps', image: 'https://images.unsplash.com/photo-1512411993416-8344654cb6c5?auto=format&fit=crop&q=80&w=600' },
  { name: 'RC Toys', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=600' },
  { name: 'Smart Gadgets', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=600' },
  { name: 'Trending Products', image: 'https://images.unsplash.com/photo-1614272895697-393273e9ebdb?auto=format&fit=crop&q=80&w=600' },
  { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' },
  { name: 'Gifts', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600' }
];

export default function CategoryList() {
  const { navigate } = useAppContext();

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-brand-navy text-center mb-8 uppercase tracking-tight">
          Shop By Category
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {categoryData.map((category, i) => (
            <div 
              key={i} 
              onClick={() => navigate('collections', category.name.toLowerCase().replace(' ', '-'))}
              className="flex-none w-[120px] md:w-[160px] snap-start group cursor-pointer"
            >
              <div className="aspect-square rounded-full overflow-hidden mb-3 border-4 border-gray-50 shadow-sm relative">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <h3 className="text-center font-bold text-sm text-brand-navy leading-tight">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
