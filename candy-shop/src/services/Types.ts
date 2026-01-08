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

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type TagSlug = "gelatinfri" | "palmoljefri" | "vegansk" | "nyhet";

export interface TagFiltersProps {
  availableTags: TagSlug[]; 
}