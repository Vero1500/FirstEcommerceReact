// services/storeService.ts
import { Product } from "../models/product";

const STORE_BASE_URL = "https://fakestoreapi.com";

const StoreService = {
  // Method to get all products with optional category, sort, and limit
  getAllProducts: async (
    limit: string = "12",
    sort: string = "desc",
    category?: string
  ): Promise<Product[]> => {
    const url = `${STORE_BASE_URL}/products${
      category ? `/category/${category}` : ""
    }?sort=${sort}&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    return products;
  },

  // Method to get all categories
  getAllCategories: async (): Promise<string[]> => {
    const response = await fetch(`${STORE_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    return categories;
  }
};

export default StoreService;
