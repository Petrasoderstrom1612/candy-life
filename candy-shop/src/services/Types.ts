export type CandyLocationState = {
  id: number;
}

export interface CandyImage {
  thumbnail: string;
  large: string;
}

export interface Tag {
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