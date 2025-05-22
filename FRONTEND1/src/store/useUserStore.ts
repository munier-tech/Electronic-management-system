import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios'

interface User {
  username: string;
  id: string;            // Add this line
  email: string;
  password: string;
  createdAt : Date;
  role?: 'user' | 'admin' | 'employee';
}

interface AuthState {
  user: User | null;
  isAuthorized: boolean;
  isLoading: boolean;
  authChecked: boolean;
  signUp: (credentials: {
    username: string;
    password: string;
    email: string;
    createdAt : Date;
    confirmPassword: string;
  }) => Promise<void>;
  signIn: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  isAdmin: () => boolean;
  checkAuth: () => Promise<void>;
  signOut : () => Promise<void>;
  dashboardAdmin : () => boolean;
  getUserProfile : () => Promise<void>;
}

export const useUserStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthorized: false,
  isLoading: false,
  authChecked: false,

  isAdmin: () => {
    const { user } = get();
    return user?.role === 'admin' || user?.role === 'employee';
  },

  dashboardAdmin : () => {
    const { user } = get();
    return user?.role === 'admin';
  },

  getUserProfile: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axios.get("/user/getUserProfile");
  
      const currentUser = get().user;
      if (JSON.stringify(currentUser) !== JSON.stringify(data.user)) {
        set({ user: data.user });
      }
  
      toast.success("User profile fetched successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching user profile");
    } finally {
      set({ isLoading: false });
    }
  },
  

  signUp: async ({ username, password, email, confirmPassword }) => {
    if (confirmPassword !== password) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      set({ isLoading: true });
      const { data } = await axios.post('/auth/signUp', {
        username,
        password,
        email,
      });

      set({
        user: data.user,
        isAuthorized: true,
        isLoading: false,
        authChecked: true,
      });

      toast.success('User created successfully');
    } catch (error: any) {
      set({ isLoading: false });
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  },

  signIn: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.post('/auth/signIn', {
        email,
        password,
      });
      set({
        user: data.user,
        isAuthorized: true,
        isLoading: false,
        authChecked: true,
      });
      toast.success("Login successful");
    } catch (error: any) {
      set({ isLoading: false });
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("SignIn Error:", error.response.data.message);
    }
  },
  signOut: async () => {
    set({ isLoading: true });
    try {
      await axios.post('/auth/logOut');
      set({
        user: null,
        isAuthorized: false,
        isLoading: false,
        authChecked: true,
      });
      toast.success('Logged out successfully');
    } catch (error: any) {
      set({ isLoading: false });
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  },
  checkAuth: async () => {
    try {
      const { data } = await axios.get('/auth/getProfile');
      console.log("checkAuth response:", data); // 👈 Log the response
      if (data.user) {
        set({ isAuthorized: true, user: data.user });
      } else {
        set({ isAuthorized: false, user: null });
      }
    } catch (error: any) {
      console.error("checkAuth Error:", error.response.data.message);
      set({ isAuthorized: false, user: null });
    } finally {
      set({ authChecked: true });
    }
  }
}));  