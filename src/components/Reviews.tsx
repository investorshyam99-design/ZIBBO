import React from 'react';
import { motion } from 'motion/react';
import { reviews } from '../data';
import { Star } from 'lucide-react';

export default function Reviews() {
  return (
    <section className="py-24 bg-brand-navy text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Loved by Thousands</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">Don't just take our word for it. Here's what our customers have to say about their ZIBBO experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                  />
                ))}
              </div>
              <p className="text-lg text-gray-200 mb-6 font-light leading-relaxed">"{review.content}"</p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-medium text-white">{review.author}</h4>
                  <p className="text-sm text-gray-400">Verified Buyer</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{review.date}</p>
                  <p className="text-xs text-brand-offwhite font-medium mt-1 truncate max-w-[120px]" title={review.product}>{review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
