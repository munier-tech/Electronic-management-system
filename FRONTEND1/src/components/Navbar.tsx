import { Link } from 'react-router-dom';
import { Lock, UserPlus, LogIn, Home, ShoppingBag } from "lucide-react";
import { useUserStore } from '@/store/useUserStore';
import { PopoverDemo } from './popOver';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, dashboardAdmin  } = useUserStore();

  

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed w-full top-0 bg-white/5 backdrop-blur-xl z-50 border-b border-white/10 shadow-lg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex flex-col">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-white text-transparent bg-clip-text"
                >
                  CASRI
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold bg-white text-transparent bg-clip-text -mt-2"
                >
                  ELECTRONICS
                </motion.p>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/" 
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                <Home className="mr-1" size={18} />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </motion.div>

            {user && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {dashboardAdmin() && (<Link 
                  to="/DailySales" 
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <ShoppingBag className="mr-1" size={18} />
                  <span className="hidden sm:inline">Sales</span>
                </Link>)}
                
              </motion.div>
            )}

            {user && dashboardAdmin() && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/Dashboard" 
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 transition-colors"
                >
                  <Lock className="mr-1" size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              </motion.div>
            )}

            {user && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg cursor-pointer border-2 border-white/20">
                  <PopoverDemo/>
                </div>
              </motion.div>
            )}

            {!user && (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/signup" 
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    <UserPlus className="mr-1" size={18} />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/signin" 
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <LogIn className="mr-1" size={18} />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                </motion.div>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;