export interface Product {
  description?: string;
  video?: string;
  collections?: string[];
  variants?: any[];
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  category: string;
  badges?: string[];
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  product: string;
  date: string;
}
