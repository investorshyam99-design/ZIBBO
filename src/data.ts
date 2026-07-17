import { Product, Category, Feature, Review } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'PLANETARIUM GALAXY PROJECTOR',
    price: 3499,
    originalPrice: 5999,
    rating: 4.9,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800', 'https://cdn-cf-east.streamable.com/video/mp4/q06ssn.mp4?Expires=1784418824279&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=m1uu9nmG94cha3Og6gMlh1GaAhRNg0OEk6eMw~fCeM2IqXJpyAh0QOcS-KpIl1Ba2IA4dfBKCgXSxEa86ZKz82KGPiqr9MLeagTjjeFN~T4lHzI-ZI4yc1uhBPG9oQ~1MLcSHN6rnLFxyOl8hZysuwgM1KCTzqMol9kY-NlfevZIaGJclXt8F8XcMp-3nN4JhJoLz9JMWjJrTUmQdPTU1Lk8unaWrEfvN8UXqNYD5k1upO9vmDC8Krp-VSfSKeNYgOLZWxhn7JrO3-QuEbEeZx9HcorUIQ4cRspXhydB8mN-21udOPRe8c6QbYDXy-P2Y3-VPo1iT1~h59jTUoof4w__'],
    category: 'Galaxy Projectors',
    badges: ['Bestseller', 'Trending'],
  },
  {
    id: 'p2',
    name: 'UNBREAKABLE FIGHTER PLANE',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1512411993416-8344654cb6c5?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1512411993416-8344654cb6c5?auto=format&fit=crop&q=80&w=800', 'https://cdn-cf-east.streamable.com/video/mp4/vus5jg.mp4?Expires=1784419026377&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=i~tp6850TrVjJXtYaZoSKHzX8-J0EiIjlWh9hbWb2QPtJuIiGSgRKWtjmV9S5mVOD9oXlIU0TM4xFZ2BoZfmocJZ7wTbaciYp6q4axxi5BQ~dka8iS49eZJHy3ZfCEH1BPG8qrz2J8Qdi7kzoJxy9RHhN61zu9gJ~8f34400D9h7Mq9g7Z6YrNEXwKLL~Mj6gTvkSCmbETWbJT4sKdKbA3K7GLBv8-e0a7Nl~iUBfIffLqmmt2Lc7WsYsOpTnxcJ~71Kfrs5-o5MN8K4HjvujDHPKD51gTwT9kZnZSXZoEp0uyX~Dnv6EMZOPV~t9PK0wNgzxbJ~9f3FvgFHTiWvZA__'],
    category: 'Smart Gadgets',
    badges: ['Selling Fast'],
  },
  {
    id: 'p3',
    name: 'MOTION SENSOR RC CAR',
    price: 2499,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'],
    category: 'Smart Gadgets',
    isNew: true,
  },
  {
    id: 'p4',
    name: 'MINI LED ANDROID PROJECTOR',
    price: 6999,
    rating: 4.6,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800', 'https://www.w3schools.com/html/mov_bbb.mp4'],
    category: 'Home Essentials',
    badges: ['Premium'],
  },
  {
    id: 'p5',
    name: 'CRASH CLASH RC BATTLE CARS 2 PLAYERS',
    price: 12999,
    originalPrice: 15999,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'],
    category: 'Trending Toys',
  },
  {
    id: 'p6',
    name: 'Retro Pixel Art Display',
    price: 3999,
    originalPrice: 4999,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1614272895697-393273e9ebdb?auto=format&fit=crop&q=80&w=800',
    category: 'Gifts',
    badges: ['Viral'],
  },
  {
    id: 'p7',
    name: 'Smart Posture Corrector Pro',
    price: 1999,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    category: 'Home Essentials',
  },
  {
    id: 'p8',
    name: 'Holographic Display Fan 3D',
    price: 14999,
    originalPrice: 19999,
    rating: 4.7,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800',
    category: 'Trending Toys',
    isNew: true,
  }
];

export const categories: Category[] = [
  { id: 'c1', name: 'Galaxy Projectors', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=600' },
  { id: 'c2', name: 'Smart Gadgets', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=600' },
  { id: 'c3', name: 'Trending Toys', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600' },
  { id: 'c4', name: 'Home Essentials', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' },
  { id: 'c5', name: 'Premium Gifts', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600' }
];

export const features: Feature[] = [
  { id: 'f1', title: 'Premium Quality', description: 'Curated selection of high-end viral products.', icon: 'Star' },
  { id: 'f2', title: 'Fast Shipping', description: 'Express delivery within 24-48 hours.', icon: 'Truck' },
  { id: 'f3', title: 'Secure Checkout', description: '100% encrypted & safe payments.', icon: 'ShieldCheck' },
  { id: 'f4', title: 'Easy Returns', description: '7-day no questions asked return policy.', icon: 'RefreshCcw' }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Rahul Sharma',
    rating: 5,
    content: 'The Nebula Pro completely transformed my room. The quality is unreal compared to cheap knockoffs.',
    product: 'Nebula Pro Galaxy Projector',
    date: '2 days ago'
  },
  {
    id: 'r2',
    author: 'Priya Patel',
    rating: 5,
    content: 'Fast shipping and premium packaging. The levitating moon lamp makes for a perfect gift!',
    product: 'Levitating Smart Moon Lamp',
    date: '1 week ago'
  },
  {
    id: 'r3',
    author: 'Aditya Singh',
    rating: 4,
    content: 'Looks exactly like the Instagram ads. Very satisfied with the ambient light bars.',
    product: 'Aura Sync Ambient Light Bar',
    date: '2 weeks ago'
  }
];
