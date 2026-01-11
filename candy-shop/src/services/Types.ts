export interface CandyLocation {
  pathname: string;
  search: string;
  hash: string;
  state: {
    id?: number;
    tagParam?: string;
    queryString?: string; // <-- add this
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

type CartCandy = Pick<Candy, "id" | "name" | "price" | "on_sale">;

export type CartItem = {
  candy: CartCandy;
  quantity: number;
};

export type CartContextType = {
  cart: Candy[];
  isOpen: boolean;
  addToCart: (candy: Candy) => void;
  toggleCart: () => void;
};

interface OrderItem {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

export type Order = {
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

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type TagSlug = "gelatinfri" | "palmoljefri" | "vegansk" | "nyhet";

export interface TagFiltersProps {
  availableTags: TagSlug[]; 
}