"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryList() {
  const [productGroups, setProductGroups] = useState([]);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [productCategories, setProductCategories] = useState({});

  // Fetch product groups
  useEffect(() => {
    async function fetchProductGroups() {
      try {
        const res = await fetch("/api/product-groups");
        const result = await res.json();
        setProductGroups(result?.data || []);
      } catch (error) {
        console.error("Failed to fetch product groups:", error);
      }
    }
    fetchProductGroups();
  }, []);

  // Fetch categories for a hovered group
  async function handleProductCategories(slug) {
    setHoveredGroup(slug);
    if (productCategories[slug]) return;
    try {
      const res = await fetch(`/api/product-categories/${slug}`);
      const result = await res.json();
      setProductCategories((prev) => ({ ...prev, [slug]: result?.data || [] }));
    } catch (error) {
      console.error(`Failed to fetch categories for ${slug}:`, error);
    }
  }

  return (
    <div className=" w-full overflow-y-auto max-h-[400px]">
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
            <Link href={`/products/group/${productGroup.slug}`}>
              <Image
                src={productGroup.iconUrl}
                width={24}
                height={24}
                alt={productGroup.name}
              />
              {productGroup.name}
            </Link>

            {/* Show category submenu */}
            {hoveredGroup === productGroup.slug &&
              productCategories[productGroup.slug]?.length > 0 && (
                <ul className="submenu">
                  {productCategories[productGroup.slug].map(
                    (productCategory) => (
                      <li key={productCategory.id}>
                        <Link
                          href={`/products/category/${productCategory.slug}`}
                        >
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
