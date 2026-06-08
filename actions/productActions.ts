"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ALL_PRODUCTS_QUERY } from "@/sanity/queries/query";
import { ALL_PRODUCTS_QUERYResult } from "@/sanity.types";

export type SearchProduct = ALL_PRODUCTS_QUERYResult[0];

export async function getAllProductsAction(): Promise<SearchProduct[]> {
  try {
    console.log("🔍 Fetching products with query:", ALL_PRODUCTS_QUERY);
    const products = await serverFetch<ALL_PRODUCTS_QUERYResult>({
      query: ALL_PRODUCTS_QUERY,
    });
    console.log("📦 Fetched products count:", products?.length || 0);
    console.log("📦 First product:", products?.[0]);
    return products || [];
  } catch (error) {
    console.error("❌ Error fetching all products:", error);
    return [];
  }
}