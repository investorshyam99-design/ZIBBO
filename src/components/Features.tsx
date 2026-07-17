import React from 'react';
import { Truck, CreditCard, Zap, ShieldCheck } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-brand-navy" />,
      title: 'Free Delivery',
      description: 'On all prepaid orders across India'
    },
    {
      icon: <CreditCard className="w-8 h-8 text-brand-navy" />,
      title: 'Cash on Delivery Available',
      description: 'Pay when you receive your order'
    },
    {
      icon: <Zap className="w-8 h-8 text-brand-navy" />,
      title: 'Fast Dispatch',
      description: 'Orders shipped within 24 hours'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-navy" />,
      title: 'Secure Checkout',
      description: '100% encrypted & safe payments'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-brand-navy text-center mb-8 uppercase tracking-tight">
          Why Shop From Zibbo
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-brand-offwhite rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-brand-navy mb-2 text-sm md:text-base">{feature.title}</h3>
              <p className="text-xs text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
