
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/store/useUserStore";
import { Loader, LogOut, ShoppingBag, BarChart2, User2 } from "lucide-react";
import { Link } from "react-router-dom";

export function PopoverDemo() {
  const { user, signOut, isLoading } = useUserStore();
  
  const handleLogout = () => {
    signOut();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative rounded-full text-xl flex items-center justify-center font-bold  hover:bg-gray-100 text-white cursor-pointer h-10 w-10 border-gray-200 shadow-sm transition-colors">
          {user?.username[0].toUpperCase()}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 rounded-xl shadow-lg border border-gray-200">
        <div className="grid gap-4">
          {/* User Profile Section */}
          <div className="flex gap-3 items-center p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white h-10 w-10 text-xl font-bold">
              {user?.username[0].toUpperCase()}
            </div>
            <div className="grid">
              <p className="text-md font-bold text-gray-900">
                {user?.username}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="grid gap-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
              Quick Actions
            </h3>
            
            {/* Daily Sales */}
            {/* Daily History */}
            <Link 
              to="/profile" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="p-2 rounded-md bg-purple-100 text-purple-600">
                <User2 size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Profile</p>
                <p className="text-xs text-gray-500">View your Profile </p>
              </div>
            </Link>
            <Link 
              to="/daily-sales" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="p-2 rounded-md bg-blue-100 text-blue-600">
                <BarChart2 size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Daily Sales</p>
                <p className="text-xs text-gray-500">View today's sales report</p>
              </div>
            </Link>
            
            {/* Product History */}
            <Link 
              to="/product-history" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="p-2 rounded-md bg-green-100 text-green-600">
                <ShoppingBag size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Product History</p>
                <p className="text-xs text-gray-500">View product transactions</p>
              </div>
            </Link>
            
          </div>

          {/* Logout Button */}
          {user && (
            <motion.button
              onClick={handleLogout}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 transition-all disabled:opacity-50 shadow-sm"
            >
              {isLoading ? (
                <Loader className="animate-spin" size={16} />
              ) : (
                <LogOut size={16} />
              )}
              <span>Sign Out</span>
            </motion.button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}