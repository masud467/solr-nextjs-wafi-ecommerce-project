export interface ProductCategory{
  id:string;
  name:string;
  slug:string;
  iconUrl?:string;
  displayOrder: number;
  discountPercent?: number;
  isActive: boolean;
  productGroupName: string;
  productGroupSlug: string;
  productGroupIconUrl?: string;
  productGroupImageUrl?: string;
  productGroupIsActive?: boolean;
}