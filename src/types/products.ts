export interface Products {
  id: string;
  name: string;
  slug: string;
  sale_price?: number;
  regular_price?: number;
  discount_percent?: number;
  image_urls?: string[];
  group_name?: string;
  group_slug?: string;
  category_name?: string;
  category_slug?: string;
  is_active?: boolean;
}
