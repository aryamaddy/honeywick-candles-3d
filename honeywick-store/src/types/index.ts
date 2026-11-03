export type ProductCategory = 'all' | 'jar' | 'floral' | 'bubble' | 'festive';

export type FragranceMode = 'with_fragrance' | 'without_fragrance' | 'ladoo';

export interface FragranceOption {
  id: string;
  name: string;
  description: string;
  notes: string;
  badge?: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  twClass?: string;
}

export interface ProductVariant {
  pack: 'Single' | 'Set of 2';
  fragranceMode: FragranceMode;
  price: number; // in INR
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  basePrice: number;
  hasPriceRange: boolean;
  minPrice: number;
  maxPrice: number;
  description: string;
  longDescription: string;
  images: string[];
  has3DModel?: boolean;
  default3DType?: 'jar' | 'bubble';
  availablePacks: ('Single' | 'Set of 2')[];
  fragranceModes: FragranceMode[];
  availableColors: ColorOption[];
  variants: ProductVariant[];
  burnTime: string;
  waxType: string;
  weight: string;
  dimensions: string;
  careTips: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id = product.id + pack + fragranceMode + fragrance + color
  productId: string;
  productName: string;
  slug: string;
  image: string;
  pack: 'Single' | 'Set of 2';
  fragranceMode: FragranceMode;
  fragranceName?: string;
  color: ColorOption;
  unitPrice: number;
  quantity: number;
}

export interface CustomEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  quantity: number;
  requiredDate: string;
  message: string;
  referenceImage?: string;
  status: 'new' | 'reviewed' | 'quoted' | 'confirmed';
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}
