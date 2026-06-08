import "server-only";
import { backendClient } from "@/sanity/lib/backendClient";

interface ServerFetchOptions {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number | false;
}

export async function serverFetch<T>({ 
  query, 
  params = {}, 
  revalidate = 0 
}: ServerFetchOptions): Promise<T> {
  try {
    const data = await backendClient.fetch<T>(query, params, {
      next: { revalidate }
    });
    return data;
  } catch (error) {
    console.error("Server fetch error:", error);
    throw error;
  }
}