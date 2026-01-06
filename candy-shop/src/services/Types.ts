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
    images: string[];
    stock_status: string;
    stock_quantity: number;
    tags: Tag[];
}

export type CandyWithDescription = Candy & {
    description: string
}