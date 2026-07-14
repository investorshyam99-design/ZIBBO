import React from 'react';
import { motion } from 'motion/react';
import { features } from '../data';
import { Star, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Star: <Star className="w-8 h-8" />,
  Truck: <Truck className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  RefreshCcw: <RefreshCcw className="w-8 h-8" />
};

export default function Features() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 text-brand-navy">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-navy mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-[200px]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
