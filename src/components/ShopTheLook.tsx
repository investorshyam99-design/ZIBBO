import React from 'react';
import { useAppContext } from '../AppContext';

const productVideos: Record<string, string> = {
  'p1': 'https://cdn-cf-east.streamable.com/video/mp4/q06ssn.mp4?Expires=1784418824279&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=m1uu9nmG94cha3Og6gMlh1GaAhRNg0OEk6eMw~fCeM2IqXJpyAh0QOcS-KpIl1Ba2IA4dfBKCgXSxEa86ZKz82KGPiqr9MLeagTjjeFN~T4lHzI-ZI4yc1uhBPG9oQ~1MLcSHN6rnLFxyOl8hZysuwgM1KCTzqMol9kY-NlfevZIaGJclXt8F8XcMp-3nN4JhJoLz9JMWjJrTUmQdPTU1Lk8unaWrEfvN8UXqNYD5k1upO9vmDC8Krp-VSfSKeNYgOLZWxhn7JrO3-QuEbEeZx9HcorUIQ4cRspXhydB8mN-21udOPRe8c6QbYDXy-P2Y3-VPo1iT1~h59jTUoof4w__', // PLANETARIUM
  'p2': 'https://cdn-cf-east.streamable.com/video/mp4/vus5jg.mp4?Expires=1784419026377&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=i~tp6850TrVjJXtYaZoSKHzX8-J0EiIjlWh9hbWb2QPtJuIiGSgRKWtjmV9S5mVOD9oXlIU0TM4xFZ2BoZfmocJZ7wTbaciYp6q4axxi5BQ~dka8iS49eZJHy3ZfCEH1BPG8qrz2J8Qdi7kzoJxy9RHhN61zu9gJ~8f34400D9h7Mq9g7Z6YrNEXwKLL~Mj6gTvkSCmbETWbJT4sKdKbA3K7GLBv8-e0a7Nl~iUBfIffLqmmt2Lc7WsYsOpTnxcJ~71Kfrs5-o5MN8K4HjvujDHPKD51gTwT9kZnZSXZoEp0uyX~Dnv6EMZOPV~t9PK0wNgzxbJ~9f3FvgFHTiWvZA__', // FIGHTER PLANE
  'p3': 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', // RC CAR
  'p4': 'https://www.w3schools.com/html/mov_bbb.mp4', // PROJECTOR
  'p5': 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' // BATTLE CARS
};

export default function ShopTheLook() {
  const { products, navigate } = useAppContext();
  
  if (!products || products.length === 0) return null;
  
  const displayProducts = products.slice(0, 5);
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x scrollbar-hide">
          {displayProducts.map((product, i) => (
            <div key={product.id} className="flex-none w-[280px] md:w-[320px] snap-start bg-brand-offwhite rounded-2xl overflow-hidden flex flex-col group cursor-pointer" onClick={() => navigate('product', product.id)}>
              <div className="aspect-[9/16] relative bg-black overflow-hidden group">
                <video 
                   src={productVideos[product.id] || productVideos['p1']}
                   autoPlay 
                   loop 
                   muted 
                   playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 flex flex-col justify-end p-5">
                  {product.badges && product.badges.length > 0 && (
                    <div className="mb-auto mt-2 self-start bg-brand-navy text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm">
                      {product.badges[0]}
                    </div>
                  )}
                  <h3 className="font-bold text-white text-sm md:text-base leading-snug mb-2 line-clamp-2 drop-shadow-md">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-3 mb-4 drop-shadow-md">
                    <span className="font-black text-white text-lg">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-300 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button className="w-full bg-white text-brand-navy py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
