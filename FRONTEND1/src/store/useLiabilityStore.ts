import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";

interface Liability {
  _id?: string;
  name: string;
  description: string;
  date: string;
  price: number;
}

interface LiabilityState {
  date: string | null;
  liabilities: Liability[];
  isLoading: boolean;
  addLiablity: (liabilityData: { name: string; description: string; price: number }) => Promise<void>;
  getLiabilities: () => Promise<void>;
  getDialyLiabilities: () => Promise<void>;
  deleteLiability: (id: string) => Promise<void>;
}

export const useLiabilityStore = create<LiabilityState>((set) => ({
  date: null,
  liabilities: [],
  isLoading: false,

  addLiablity: async (liabilityData) => {
    try {
      set({ isLoading: true });
      const { data } = await axios.post("/Liability/addLiability", liabilityData);
      set((state) => ({
        liabilities: [...state.liabilities, data],
        isLoading: false,
      }));
      toast.success("Liability added successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error adding liability");
      set({ isLoading: false });
    }
  },
getLiabilities: async () => {
  try {
    set({ isLoading: true });
    const  response  = await axios.get("/Liability/getAll");
    set({ liabilities: response.data.liabilities || [], isLoading: false });
    toast.success("Liabilities fetched successfully");
    
  } catch (error : any) {
    toast.error(error?.response?.data?.message || "Error fetching liabilities");
    set({ isLoading: false });
  }
},
getDialyLiabilities: async () => {
  try {
    set({ isLoading: true });
    const { data } = await axios.get("/Liability/daily");
    set({
      date: dayjs().format("DD-MM-YYYY"),
      liabilities: data.liabilities || [],
      isLoading: false,
    });
    toast.success("Daily liabilities fetched successfully");
    
  } catch (error : any) {
    toast.error(error?.response?.data?.message || "Error fetching daily liabilities");
    set({ isLoading: false, liabilities: [] });
  }
},

deleteLiability: async (id : any) => {
  try {
    set({ isLoading: true });
    await axios.delete(`/Liability/delete/${id}`);
    set((state) => ({
      liabilities: state.liabilities.filter((liability) => liability._id !== id),
      isLoading: false,
    }));
    toast.success("Liability deleted successfully");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Error deleting liability");
    set({ isLoading: false });
  }
}

}));