export interface CandyLocation {
  pathname: string;
  search: string;
  hash: string;
  state: {
    id?: number;
    tagParam?: string;
    queryString?: string;
  } | null;
  key: string;
}

export interface CandyImage {
  thumbnail: string;
  large: string;
}

export interface Candy {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  images: CandyImage;
  stock_status: string;
  stock_quantity: number;
  tags: Tag[];
}

export type CandyWithDescription = Candy & {
  description: string;
}

export type CartItem = {
  candy: Candy;
  quantity: number;
};

export type CartContextType = {
  addToCart: (candy: Candy) => void;
  cart: CartItem[];
  isOpen: boolean;
  clearCart: () => void;
  removeFromCart: (candyId: number) => void;
  toggleCart: () => void;
};

export interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
  onBack: () => void;
  toggleCart: () => void;
}

export interface OrderItem {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

export interface OrderRequest {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
  order_total: number;
  order_items: OrderItem[];
}

export interface OrderResponse {
  data: {
    id: string;
  }
  status: string;
  message: string; 
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type TagSlug = "gelatinfri" | "palmoljefri" | "vegansk" | "nyhet";

export interface TagFiltersProps {
  availableTags: TagSlug[]; 
}