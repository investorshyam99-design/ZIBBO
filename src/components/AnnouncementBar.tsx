import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-navy text-white py-2 text-[10px] font-bold uppercase tracking-widest relative z-50 overflow-hidden">
      <div className="animate-marquee">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="px-8 whitespace-nowrap">🚚 FREE DELIVERY • 💵 COD AVAILABLE</span>
        ))}
      </div>
    </div>
  );
}
