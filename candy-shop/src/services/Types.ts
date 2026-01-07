export interface CandyLocation {
  pathname: string;
  search: string;
  hash: string;
  state: {id: number} | null;
  key: string;
}

export interface CandyImage {
  thumbnail: string;
  large: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
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
  description: string
}