import { useParams } from 'react-router-dom';
import React, { useRef,  useState, useEffect  } from 'react';
import { Star, Truck, ShieldCheck, ArrowLeft, Eye, Flame, Heart, ShoppingCart, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../AppContext';
import { Product } from '../types';
import SEO from '../components/SEO';

export default function ProductView() {
  const { id } = useParams();
  const { navigate, addToCart, products, wishlist, toggleWishlist, setIsCartDrawerOpen } = useAppContext();
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const product = products.find(p => p.id === id) || products[0];
  
  const productReviews = React.useMemo(() => {
    if (!product) return [];
    let currentSeed = Array.from(product.id).reduce((s: number, c: any) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0) as number;
    const rng = () => {
      let x = Math.sin(currentSeed++) * 10000;
      return x - Math.floor(x);
    };
    
    const names = ['Aarav Patel', 'Priya Sharma', 'Rahul Kumar', 'Sneha Gupta', 'Vikram Singh', 'Ananya Desai', 'Rohan Verma', 'Kavita Reddy', 'Amit Joshi', 'Neha Mishra'];
    const texts = [
      'Absolutely love this! The quality is amazing.',
      'Exceeded my expectations. Highly recommended.',
      'Good value for money. Very satisfied.',
      'Perfect exactly what I was looking for.',
      'Delivery was fast and the product is great.',
      'Premium feel and looks fantastic.',
      'Five stars! Would definitely buy again.',
      'Very happy with this purchase.',
      'The best I have ever used in this category.',
      'Fantastic product, highly recommend to everyone.'
    ];
    
    const generateReview = () => ({
      id: Math.random().toString(36).substr(2, 9),
      name: names[Math.floor(rng() * names.length)],
      rating: Math.floor(rng() * 2) + 4, // 4 or 5
      text: texts[Math.floor(rng() * texts.length)],
      date: new Date(Date.now() - Math.floor(rng() * 10000000000)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    return [generateReview(), generateReview(), generateReview()];
  }, [product?.id]);

  const [viewers, setViewers] = useState(74);
  const [sold, setSold] = useState(42);
  const [hours, setHours] = useState(8);
  const [rating, setRating] = useState('4.7');
  const [reviewCount, setReviewCount] = useState(128);
  
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    if (!product) return;
    
    // Generate consistent random values based on product id
    const seed = Array.from(product.id).reduce((s: number, c: any) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0) as number;
    const rng = () => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    setRating((rng() * (4.9 - 4.0) + 4.0).toFixed(1));
    setReviewCount(Math.floor(rng() * (199 - 100 + 1)) + 100);
    setViewers(Math.floor(rng() * (99 - 50 + 1)) + 50);
    setSold(Math.floor(rng() * (70 - 30 + 1)) + 30);
    setHours(Math.floor(rng() * (24 - 1 + 1)) + 1);

    // Handle recently viewed in localStorage
    try {
      const stored = localStorage.getItem('recentlyViewed');
      let viewedIds: string[] = stored ? JSON.parse(stored) : [];
      
      // Remove current product if exists to move it to front
      viewedIds = viewedIds.filter(id => id !== product.id);
      viewedIds.unshift(product.id);
      
      // Keep only last 8
      if (viewedIds.length > 10) viewedIds = viewedIds.slice(0, 10);
      
      localStorage.setItem('recentlyViewed', JSON.stringify(viewedIds));
      
      // Populate recently viewed products
      const viewedProducts = viewedIds
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => p !== undefined && p.id !== product.id);
        
      setRecentlyViewed(viewedProducts);
    } catch (e) {
      console.error('Error with localStorage', e);
    }

  }, [product, products]);

  const handleAddToCart = () => {
    if (product) addToCart(product, 1);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, 1);
      navigate('checkout');
    }
  };

  if (!product) return null;

  // Real images if available, otherwise fallback
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const hasMultipleImages = productImages.length > 1;
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 8);

  return (
    <>
      <SEO 
        title={`${product?.name || 'Product'} | ZIBBO`} 
        description={product?.description || 'Buy premium products at ZIBBO.'} 
        type="product" 
        url={`https://zibbo.com/product/${product.id}`}
        image={productImages[0]}
        product={{
          name: product.name,
          image: productImages[0],
          description: product.description,
          price: product.price,
          currency: 'INR'
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://zibbo.com' },
          { name: 'Products', url: 'https://zibbo.com/collections' },
          { name: product.name, url: `https://zibbo.com/product/${product.id}` }
        ]}
      />
    <div className="bg-white min-h-screen pb-32">
      <SEO 
        title={product.name}
        description={product.description}
        image={productImages[0]}
        product={{
          name: product.name,
          image: productImages[0],
          description: product.description,
          price: product.price,
          currency: "INR"
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate('home')} className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-navy mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div 
              ref={imageScrollRef}
              className="relative aspect-[4/5] md:aspect-square bg-gray-50 rounded-2xl overflow-x-auto snap-x snap-mandatory scrollbar-hide flex shadow-sm"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth;
                const index = Math.round(scrollLeft / width);
                if (index !== mainImageIndex && index >= 0 && index < productImages.length) {
                  setMainImageIndex(index);
                }
              }}
            >
              {productImages.map((media, i) => (
                <div key={i} className="w-full h-full shrink-0 snap-center relative">
                  {media.toLowerCase().includes('.mp4') || media.toLowerCase().includes('streamable') ? (
                    <video
                      src={media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setIsFullScreen(true)}
                    />
                  ) : (
                    <img 
                      src={media} 
                      alt={`${product.name} ${i+1}`} 
                      className="w-full h-full object-cover cursor-pointer" 
                      onClick={() => setIsFullScreen(true)}
                    />
                  )}
                  {i === 0 && (
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 rounded text-brand-navy font-bold text-xs px-2 py-1 flex items-center z-10">
                      {rating} <Star className="w-3 h-3 text-brand-navy fill-brand-navy ml-0.5 mr-1" /> | {reviewCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {hasMultipleImages && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {productImages.map((media, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      setMainImageIndex(i);
                      if (imageScrollRef.current) {
                        imageScrollRef.current.scrollTo({ left: i * imageScrollRef.current.clientWidth, behavior: 'smooth' });
                      }
                    }}
                    className={`snap-start flex-none w-20 h-20 rounded-xl overflow-hidden border-2 ${i === mainImageIndex ? 'border-brand-navy' : 'border-transparent'} transition-colors relative`}
                  >
                    {media.toLowerCase().includes('.mp4') || media.toLowerCase().includes('streamable') ? (
                      <video src={media} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <img src={media} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
            
            <AnimatePresence>
              {isFullScreen && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
                >
                  <button onClick={() => setIsFullScreen(false)} className="absolute top-6 right-6 text-white bg-black/50 p-2 rounded-full z-10"><ArrowLeft className="w-6 h-6 rotate-180" /></button>
                  {productImages[mainImageIndex].toLowerCase().includes('.mp4') || productImages[mainImageIndex].toLowerCase().includes('streamable') ? (
                    <video src={productImages[mainImageIndex]} autoPlay loop playsInline controls className="max-w-full max-h-full object-contain" />
                  ) : (
                    <img src={productImages[mainImageIndex]} alt={product.name} className="max-w-full max-h-full object-contain" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col">

          {/* Details */}
          <div className="mt-4">
            
            
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-navy mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-3xl font-black text-brand-navy">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Live Stats */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center text-sm font-medium text-gray-600">
                <motion.span 
                  className="text-xl mr-2 inline-block origin-center"
                  animate={{ scaleY: [1, 0.1, 1, 1, 1, 1, 1, 1, 1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  👀
                </motion.span>
                <span className="font-bold text-brand-navy mr-1">{viewers}</span> people viewing this product right now
              </div>
              <div className="flex items-center text-sm font-medium text-gray-600">
                <span className="text-lg mr-2">🔥</span>
                <span className="font-bold text-black mr-1">{sold} sold</span> in the last {hours} hours
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 text-sm max-w-2xl">
              {product.description || `Experience premium quality and modern design with the ${product.name}. Carefully crafted to elevate your daily routine and provide exceptional performance.`}
            </p>

            {/* Desktop Add to Cart */}
            <div className="space-y-4 mb-8 hidden md:block max-w-md">
              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 h-[56px] rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest border border-gray-200 text-brand-navy hover:bg-gray-50 transition-colors">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="flex-1 h-[56px] rounded-xl flex items-center justify-center bg-brand-navy text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-8 max-w-md mb-12 text-center">
              <div className="flex flex-col items-center justify-center text-xs font-semibold text-brand-navy gap-2">
                <Truck className="w-6 h-6 text-gray-700" /> Free delivery
              </div>
              <div className="flex flex-col items-center justify-center text-xs font-semibold text-brand-navy gap-2">
                <ShieldCheck className="w-6 h-6 text-gray-700" /> Secure payment
              </div>
              <div className="flex flex-col items-center justify-center text-xs font-semibold text-brand-navy gap-2">
                <Banknote className="w-6 h-6 text-gray-700" /> Cod available
              </div>
            </div>
            
          </div>
        </div>

            {/* Reviews */}
            <div className="mt-16">
              <h3 className="text-xl font-black text-brand-navy mb-6">Customer Reviews</h3>
              <div className="grid gap-4">
                {productReviews.map(review => (
                  <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-brand-navy">{review.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center">
                            <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-black text-brand-navy mb-6">Related Products</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                  {relatedProducts.map(rp => (
                    <div key={rp.id} onClick={() => navigate('product', rp.id)} className="group cursor-pointer flex-none w-[160px] md:w-[200px] snap-start">
                      <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden mb-3 relative">
                        <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="font-bold text-sm text-brand-navy line-clamp-1">{rp.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 font-bold">₹{rp.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-brand-navy mb-6">Recently Viewed Products</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                  {recentlyViewed.slice(0, 10).map(rv => (
                    <div key={rv.id} onClick={() => navigate('product', rv.id)} className="group cursor-pointer flex-none w-[160px] md:w-[200px] snap-start">
                      <div className="aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden mb-3 relative">
                        <img src={rv.image} alt={rv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="font-bold text-sm text-brand-navy line-clamp-1">{rv.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 font-bold">₹{rv.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Sticky Purchase Bar for Mobile */}
      <div className="md:hidden fixed bottom-[64px] left-0 right-0 bg-white border-t border-gray-100 z-40 p-3 pb-4">
        <div className="flex gap-3">
          <button onClick={handleAddToCart} className="flex-1 h-[56px] rounded-xl flex items-center justify-center bg-white text-brand-navy text-xs font-bold uppercase tracking-widest border border-gray-200 active:bg-gray-50 transition-colors">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="flex-1 h-[56px] rounded-xl flex items-center justify-center bg-[#1a2138] text-white text-xs font-bold uppercase tracking-widest active:opacity-90 transition-opacity">
            Buy Now
          </button>
        </div>
      </div>
        </>
  );
}