import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import dayjs from "dayjs";

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  total: number;
}

interface User {
  role?: 'user' | 'admin' | 'employee';
}

interface UserWithProducts {
  username: string;
  role: string;
  products: Product[];
}

interface ProductsState {
  products: Product[];
  username: string | null;
  user: User | null;
  date: string | null;
  isLoading: boolean;
  usersWithProducts: UserWithProducts[];
  addProduct: (productData: { name: string; description: string; price: number }) => Promise<void>;
  getProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, productData: { name: string; description: string; price: number }) => Promise<void>;
  getDailyproducts: () => Promise<void>;
  getMyDailyProducts: () => Promise<void>;
  getUsersDailyProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  username: null,
  user: null,
  isLoading: false,
  date: null,
  usersWithProducts: [],
  getProducts: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axios.get("/products/getAll");
      set({ products: data, isLoading: false });
      toast.success("Products fetched successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching products");
      set({ isLoading: false });
    }
  },

  getMyDailyProducts: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get("/products/getMydaily");
      set({
        products: data.products || [],
        isLoading: false,
        date: dayjs().format("DD-MM-YYYY"),
      });
      toast.success("My Daily Products fetched successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching daily products");
      set({ isLoading: false, products: [] });
    }
  },

  addProduct: async (productData) => {
    try {
      set({ isLoading: true });
      const { data } = await axios.post("/products/addProduct", productData);
      set((state) => ({
        products: [...state.products, data],
        isLoading: false,
      }));
      toast.success("Product added successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ isLoading: true });
      await axios.delete(`/products/delete/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        isLoading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error deleting product");
      set({ isLoading: false });
    }
  },

  updateProduct: async (id, productData) => {
    try {
      set({ isLoading: true });
      const { data } = await axios.put(`/products/update/${id}`, productData);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data : product
        ),
        isLoading: false,
      }));
      toast.success("Product updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error updating product");
      set({ isLoading: false });
    }
  },

  getUsersDailyProducts: async () => {
    try {
      set({ isLoading: true });
      const response  = await axios.get("/products/getAllUserProducts");
      set({ usersWithProducts: response.data.data, isLoading: false });
      toast.success("Users' daily products fetched successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching users' daily products");
      set({ isLoading: false });
    }
  },

  getDailyproducts: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/products/getAlldaily");
      set({ products: response.data.products || [], isLoading: false });
      toast.success("Daily products fetched successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching daily products");
      set({ isLoading: false, products: [] });
    }
  },
}));
