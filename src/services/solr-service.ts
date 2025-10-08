import { SOLR_CORES } from "../constants/solrCores";
import type { ProductCategory } from "../types/productCategory";
import type { ProductGroup } from "../types/productGroup";
import type { Products } from "../types/products";
import { querySolr } from "../util/solr";

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface SolrProductGroup {
  id: string;
  name_s: string;
  slug_s: string;
  icon_url_s?: string;
  image_url_s?: string;
  discount_percent_d?: number;
  display_order_i?: number;
  is_active_b?: boolean;
  is_with_all_product_b?: boolean;
}

interface SolrProductCategory {
  id: string;
  name_s: string;
  slug_s: string;
  icon_url_s?: string;
  image_url_s?: string;
  discount_percent_d?: number;
  display_order_i?: number;
  is_active_b?: boolean;
  product_group_name_s?: string;
  product_group_slug_s?: string;
  product_group_icon_url_s?: string;
  product_group_image_url_s?: string;
  product_group_is_active_b?: boolean;
}

// for task 2
interface SolrProduct {
  id: string;
  name_s: string;
  slug_s: string;
  sale_price_d?: number;
  regular_price_d?: number;
  discount_percent_d?: number;
  image_urls_ss?: string[];
  group_name_s?: string;
  group_slug_s?: string;
  category_name_s?: string;
  category_slug_s?: string;
  is_active_b?: boolean;
}

export class SolrService {
  static async getProductGroups(
    params?: PaginationParams
  ): Promise<PaginatedResult<ProductGroup> | null> {
    try {
      const result = await querySolr<SolrProductGroup>({
        core: SOLR_CORES.PRODUCT_GROUPS,
        query: "*:*",
        pageSize: params?.pageSize || 10,
        page: params?.page || 1,
      });

      // Map  ProductGroup.

      const mappedProductGroup: ProductGroup[] = result.docs.map((doc) => ({
        id: doc.id,
        name: doc.name_s || "",
        slug: doc.slug_s || "",
        iconUrl: doc.icon_url_s || "",
        imageUrl: doc.image_url_s || "",
        discountPercent: doc.discount_percent_d ?? 0,
        displayOrder: doc.display_order_i ?? 0,
        isActive: doc.is_active_b ?? false,
        isWithAllProduct: doc.is_with_all_product_b ?? false,
      }));
      return {
        data: mappedProductGroup,
        pagination: {
          total: result.total,
          pageSize: result.pageSize,
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
        },
      };
    } catch (error) {
      console.error("Error fetching product groups:", error);
      return null;
    }
  }

  // Create getCategoriesByProductGroup

  static async getCategoriesByProductGroup(
    productGroupSlug: string,
    params?: PaginationParams
  ): Promise<PaginatedResult<ProductCategory> | null> {
    try {
      const result = await querySolr<SolrProductCategory>({
        core: SOLR_CORES.PRODUCT_CATEGORIES,
        query: `product_group_slug_s:"${productGroupSlug}"`,
        pageSize: params?.pageSize || 10,
        page: params?.page || 1,
      });

      // map ProductCategory
      const mappedProductCategory: ProductCategory[] = result.docs.map(
        (doc) => ({
          id: doc.id,
          name: doc.name_s || "",
          slug: doc.slug_s || "",
          iconUrl: doc.icon_url_s || "",
          imageUrl: doc.image_url_s || "",
          discountPercent: doc.discount_percent_d ?? 0,
          displayOrder: doc.display_order_i ?? 0,
          isActive: doc.is_active_b ?? false,
          productGroupName: doc.product_group_name_s || "",
          productGroupSlug: doc.product_group_slug_s || "",
          productGroupIconUrl: doc.product_group_icon_url_s || "",
          productGroupImageUrl: doc.product_group_image_url_s || "",
          productGroupIsActive: doc.product_group_is_active_b ?? false,
        })
      );
      return {
        data: mappedProductCategory,
        pagination: {
          total: result.total,
          pageSize: result.pageSize,
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
        },
      };
    } catch (error) {
      console.error(
        `Error fetching categories for product group ${productGroupSlug}:`,
        error
      );
      return null;
    }
  }

  // for task 2

  // fetch products by product groups
  static async getProductsByGroup(
    groupSlug: string,
    params?: PaginationParams
  ): Promise<PaginatedResult<Products> | null> {
    try {
      const result = await querySolr<SolrProduct>({
        core: SOLR_CORES.PRODUCT_DETAILS,
        query: `group_slug_s:"${groupSlug}"`,
        pageSize: params?.pageSize || 10,
        page: params?.page || 1,
      });
      const mappedProducts = result.docs.map((doc) => ({
        id: doc.id,
        name: doc.name_s || "",
        slug: doc.slug_s || "",
        imageUrls: doc.image_urls_ss || [],
        salePrice: doc.sale_price_d ?? 0,
        regularPrice: doc.regular_price_d ?? 0,
        discountPercent: doc.discount_percent_d ?? 0,
        groupName: doc.group_name_s || "",
        groupSlug: doc.group_slug_s || "",
        categoryName: doc.category_name_s || "",
        categorySlug: doc.category_slug_s || "",
        isActive: doc.is_active_b ?? false,
      }));
      return {
        data: mappedProducts,
        pagination: {
          total: result.total,
          pageSize: result.pageSize,
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
        },
      };
    } catch (error) {
      console.log(`Error fetching products by group ${groupSlug}:`, error);
      return null;
    }
  }

  // fetch products by product categories
  static async getProductsByCategory(
    categorySlug: string,
    params?: PaginationParams
  ): Promise<PaginatedResult<Products> | null> {
    try {
      const result = await querySolr<SolrProduct>({
        core: SOLR_CORES.PRODUCT_DETAILS,
        query: `category_slug_s:"${categorySlug}"`,
        pageSize: params?.pageSize || 10,
        page: params?.page || 1,
      });
      const mappedProducts = result.docs.map((doc) => ({
        id: doc.id,
        name: doc.name_s || "",
        slug: doc.slug_s || "",
        imageUrls: doc.image_urls_ss || [],
        salePrice: doc.sale_price_d ?? 0,
        regularPrice: doc.regular_price_d ?? 0,
        discountPercent: doc.discount_percent_d ?? 0,
        groupName: doc.group_name_s || "",
        groupSlug: doc.group_slug_s || "",
        categoryName: doc.category_name_s || "",
        categorySlug: doc.category_slug_s || "",
        isActive: doc.is_active_b ?? false,
      }));
      return {
        data: mappedProducts,
        pagination: {
          total: result.total,
          pageSize: result.pageSize,
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
        },
      };
    } catch (error) {
      console.log(
        `Error fetching products by category ${categorySlug}:`,
        error
      );
      return null;
    }
  }
}
