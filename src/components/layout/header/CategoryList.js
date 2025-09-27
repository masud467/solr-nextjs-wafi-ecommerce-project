"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryList() {
  const [productGroups, setProductGroups] = useState([]);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [productCategories, setProductCategories] = useState({});
  // fetch product groups
  useEffect(() => {
    async function fetchProductGroups() {
      try {
        const res = await fetch("/api/product-groups");
        const result = await res.json();
        console.log(result?.data);
        setProductGroups(result?.data);
      } catch (error) {
        console.error("Failed to fetch product groups:", error);
      }
    }
    fetchProductGroups();
  }, []);

  // fetch product categories base on hover product group
  async function handleProductCategories(slug) {
    setHoveredGroup(slug);
    if (productCategories[slug]) return;
    try {
      const res = await fetch(`/api/product-categories/${slug}`);
      const result = await res.json();
      setProductCategories((prev) => ({ ...prev, [slug]: result?.data || [] }));
    } catch (error) {
      console.error(`Failed to fetch categories for ${slug}:`, err);
      setProductCategories((prev) => ({ ...prev, [slug]: [] }));
    }
  }
  return (
    <div
      className="relative w-full"
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        scrollbarWidth: "thin",
      }}
    >
      <ul className="cat-menu__list space-y-1">
        {productGroups.map((productGroup) => (
          <li
            key={productGroup.id}
            className={`${
              productCategories[productGroup.slug]?.length
                ? "menu-item-has-children"
                : ""
            }`}
            onMouseEnter={() => handleProductCategories(productGroup.slug)}
            onMouseLeave={() => setHoveredGroup(null)}
          >
            <Link href={`productGroup/${productGroup.slug}`}>
              <Image
                src={
                  productGroup.iconUrl || "/assets/img/icon/product-det-3.png"
                }
                width={24}
                height={24}
                alt={productGroup.name}
              />
              {productGroup.name}
            </Link>
            {hoveredGroup === productGroup.slug &&
              productCategories[productGroup.slug]?.length > 0 && (
                <ul className=" submenu">
                  {productCategories[productGroup.slug]?.map(
                    (productCategory) => (
                      <li key={productCategory.id}>
                        <Link href={`/productCategory/${productGroup.slug}`}>
                          {productCategory.name}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
