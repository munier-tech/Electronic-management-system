import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import dayjs from "dayjs";

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  user?: string;        // Add user field to product for sold-by info
  soldAt?: string;      // Add soldAt for display
}

interface HistoryState {
  date: string | null;
  products: Product[];
  history: any[];
  isLoading: boolean;

  getMyDailySales: () => Promise<void>;
  getAllHistory: () => Promise<void>;

  // New method to fetch products sold on a specific date
  getProductsSoldByDate: (date: string) => Promise<void>;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  date: null,
  products: [],
  history: [],
  isLoading: false,

  getMyDailySales: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axios.get("/history/MyDailySales");

      set({
        date: dayjs(data.date).format("DD-MM-YYYY"),
        products: data.products,
        isLoading: false,
      });
      toast.success("Daily sales fetched successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "No sales found for today");
      set({ isLoading: false, products: [] });
    }
  },

  getAllHistory: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("/history/myHistory");

      set({
        history: response.data.history,
        isLoading: false,
      });
      toast.success("History fetched successfully");
    } catch (error) {
      toast.error("Error fetching history");
      set({ isLoading: false });
    }
  },

  // New method to fetch products sold by a specific date
  getProductsSoldByDate: async (date: string) => {
    try {
      set({ isLoading: true });

      // Make API call to your backend endpoint for products sold by date
      const { data } = await axios.get(`/history/product-date/${date}`);

      // data.data contains array of products with user and soldAt fields
      set({
        products: data.data,
        date: dayjs(date).format("DD-MM-YYYY"),
        isLoading: false,
      });

      toast.success(`Products sold on ${dayjs(date).format("DD-MM-YYYY")} fetched successfully`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "No products sold on this date");
      set({ isLoading: false, products: [] });
    }
  },
}));
