"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";

export default async function GroupProductsPage({ params }) {
  const { slug } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/group/${slug}`);
        const result = await res.json();
        console.log(result?.data);
        setProducts(result?.data);
      } catch (error) {
        console.error("Failed to fetch product groups:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={slug}>
        <div className="product-filter-area pt-65 pb-80">
          <div className="container">
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <p>No products found in this group.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border p-3 rounded shadow-sm hover:shadow-md"
                  >
                    <Image
                      src={product.imageUrls[0]}
                      alt={product.name}
                      height={500}
                      width={500}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      ৳ {product.salePrice}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
