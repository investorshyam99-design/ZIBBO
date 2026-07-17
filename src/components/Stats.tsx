import React from 'react';
import { Star, Package, Smile, Truck } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />,
      title: '4.7/5',
      description: 'Average Rating'
    },
    {
      icon: <Package className="w-8 h-8 text-brand-navy" />,
      title: '1,000+',
      description: 'Orders Delivered'
    },
    {
      icon: <Smile className="w-8 h-8 text-green-500" />,
      title: '94%',
      description: 'Customer Satisfaction'
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      title: 'Fast Shipping',
      description: 'Across India'
    }
  ];

  return (
    <section className="py-12 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10 uppercase tracking-tight">
          Why Customers Love Zibbo
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="mb-4">
                {stat.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-1">{stat.title}</h3>
              <p className="text-xs md:text-sm text-gray-300 font-medium">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
