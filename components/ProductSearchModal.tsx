"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, X } from "lucide-react";
import { getAllProductsAction, SearchProduct } from "@/actions/productActions";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

interface ProductSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductSearchModal: React.FC<ProductSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          console.log("🔄 Modal opened, fetching products...");
          const allProducts = await getAllProductsAction();
          console.log(
            "✅ Products received in modal:",
            allProducts?.length || 0
          );
          setProducts(allProducts);
        } catch (error) {
          console.error("❌ Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    console.log("🔍 Filtering products:", {
      totalProducts: products.length,
      searchQuery: searchQuery,
      hasQuery: !!searchQuery.trim(),
    });

    if (!searchQuery.trim()) {
      const firstEight = products.slice(0, 8);
      console.log("📋 Showing first 8 products:", firstEight.length);
      return firstEight;
    }

    const filtered = products.filter((product) => {
      const nameMatch = product.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryMatch = product.categories?.some((category) =>
        category && typeof category === "string"
          ? category.toLowerCase().includes(searchQuery.toLowerCase())
          : false
      );
      return nameMatch || categoryMatch;
    });

    console.log("🎯 Filtered results:", filtered.length);
    return filtered;
  }, [products, searchQuery]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-20 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[70vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Product Searchbar
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your product here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-shop_light_green transition-colors"
              autoFocus
            />
          </div>
        </div>

        {/* Search Results Header */}
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center gap-2 text-gray-600">
            <Search className="w-4 h-4" />
            <span className="text-sm">
              Search and explore your products from{" "}
            </span>
            <Logo className="scale-75 -ml-4" />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Loading products...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">
                {searchQuery ? "No results found" : "No products available"}
              </div>
            </div>
          ) : (
            <div className="p-2">
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug?.current}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                >
                  <Search className="w-4 h-4 text-gray-400 group-hover:text-shop_light_green transition-colors" />

                  {product.images?.[0] && (
                    <div className="w-10 h-10 relative flex-shrink-0">
                      <Image
                        src={urlFor(product.images[0])
                          .width(40)
                          .height(40)
                          .url()}
                        alt={product.name || "Product"}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-shop_light_green transition-colors">
                      {product.name}
                    </p>
                    {product.categories && product.categories.length > 0 && (
                      <p className="text-xs text-gray-500 truncate">
                        {product.categories
                          .filter((cat) => cat !== null)
                          .join(", ")}
                      </p>
                    )}
                  </div>

                  {product.price && (
                    <div className="text-sm font-semibold text-gray-900">
                      ${product.price}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchModal;
