export interface ProductGroup{
  id: string;
  name:string;
  slug:string;
  iconUrl?:string;
  imageUrl?:string;
  discountPercent?: number;
  displayOrder: number;
  isActive: boolean;
  isWithAllProduct?: boolean;

}