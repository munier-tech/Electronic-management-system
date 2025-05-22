import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Users,
  Home,
  FileText,
  TrendingUp,
  DollarSign,
  Package,
  User,
  BarChart2,
  CreditCard,
  Menu
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Link } from "react-router-dom";
import { useProductsStore } from "@/store/useProductsStore";

const lineData = [
  { name: "Jan", sales: 2400, revenue: 2100 },
  { name: "Feb", sales: 2200, revenue: 1800 },
  { name: "Mar", sales: 2800, revenue: 2500 },
  { name: "Apr", sales: 3000, revenue: 2800 },
  { name: "May", sales: 2700, revenue: 2400 },
  { name: "Jun", sales: 3200, revenue: 2900 },
  { name: "Jul", sales: 3500, revenue: 3200 },
];

const barData = [
  { name: "M", value: 20 },
  { name: "T", value: 35 },
  { name: "W", value: 25 },
  { name: "T", value: 40 },
  { name: "F", value: 30 },
  { name: "S", value: 15 },
  { name: "S", value: 10 },
];

const pieData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home Goods", value: 20 },
  { name: "Other", value: 20 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

const Dashboard: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const { products } = useProductsStore();

  const totalSales = products.reduce((sum, product) => {
    const quantity = product.quantity ?? 1;
    return sum + product.price * quantity;
  }, 0);

  return (
    <motion.div
      className="min-h-screen mt-14 rounded-md bg-transparent backdrop-blur-2xl p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <div className="text-xl font-bold text-gray-900 flex items-center">
            <BarChart2 size={24} className="text-indigo-600 mr-2" /> 
            Dashboard
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white shadow-sm border border-gray-200"
          >
            <Menu className="text-gray-600" size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Hidden on mobile unless toggled */}
          {(isMobileMenuOpen || window.innerWidth >= 768) && (
            <motion.div
              className="w-full md:w-64 bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="hidden md:block p-4 text-2xl font-bold text-gray-900  items-center gap-2">
                <BarChart2 size={28} className="text-indigo-600" /> Dashboard
              </div>
              <nav className="flex flex-col gap-1 mt-2 md:mt-6">
                {[
                  { icon: Home, label: "Home", path: "/" },
                  { icon: FileText, label: "Today Sales", path: "/DailySales" },
                  { icon: FileText, label: "HistorySalesByDate", path: "/HistorySalesDate" },
                  { icon: User, label: "Staff-products", path: "/UserProducts" },
                  { icon: CreditCard, label: "todayLiability", path: "/DialyLiability" },
                  { icon: CreditCard, label: "HistoryLiability", path: "/HistoryLiability" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon size={20} className="text-gray-600" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Cards - Stacked on mobile */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[
                {
                  icon: ShoppingCart,
                  label: "Today Sales",
                  value: totalSales.toFixed(1),
                  change: "+12%",
                  color: "bg-emerald-100",
                  iconColor: "text-emerald-600",
                  textColor: "text-emerald-800",
                  path: "/DailySales"
                },
                {
                  icon: Users,
                  label: "Employees",
                  value: "3",
                  change: "+5%",
                  color: "bg-blue-100",
                  iconColor: "text-blue-600",
                  textColor: "text-blue-800",
                  path: "/UserProducts"
                },
                {
                  icon: Package,
                  label: "Products",
                  value: products.length,
                  change: "+8%",
                  color: "bg-purple-100",
                  iconColor: "text-purple-600",
                  textColor: "text-purple-800"
                },
                {
                  icon: DollarSign,
                  label: "Revenue",
                  value: totalSales / 2,
                  change: "+23%",
                  color: "bg-pink-100",
                  iconColor: "text-pink-600",
                  textColor: "text-pink-800"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`${item.color} rounded-xl md:rounded-2xl shadow-sm md:shadow-md overflow-hidden border border-gray-100 p-4 md:p-6`}
                >
                  {item.path ? (
                    <Link to={item.path} className="block">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`${item.textColor} text-sm md:text-base font-medium`}>{item.label}</p>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{item.value}</h3>
                          <p className={`${item.textColor} text-xs md:text-sm mt-2 flex items-center`}>
                            <TrendingUp size={14} className="mr-1" />
                            {item.change} from last week
                          </p>
                        </div>
                        <div className={`bg-white p-2 md:p-3 rounded-lg shadow-xs md:shadow-sm`}>
                          <item.icon className={`${item.iconColor}`} size={20} />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`${item.textColor} text-sm md:text-base font-medium`}>{item.label}</p>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{item.value}</h3>
                          <p className={`${item.textColor} text-xs md:text-sm mt-2 flex items-center`}>
                            <TrendingUp size={14} className="mr-1" />
                            {item.change} from last week
                          </p>
                        </div>
                        <div className={`bg-white p-2 md:p-3 rounded-lg shadow-xs md:shadow-sm`}>
                          <item.icon className={`${item.iconColor}`} size={20} />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Charts - Stacked on mobile */}
            <div className="grid grid-cols-1 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Sales Trend - Full width on mobile */}
              <motion.div
                className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-4 md:p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-0">Sales Trend</h2>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 md:px-3 md:py-1 bg-indigo-600 text-white rounded-lg text-xs md:text-sm shadow-xs md:shadow-sm">
                      Monthly
                    </button>
                    <button className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 text-gray-700 rounded-lg text-xs md:text-sm border border-gray-200">
                      Weekly
                    </button>
                  </div>
                </div>
                <div className="h-52 md:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lineData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#4b5563" 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#4b5563" 
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'rgba(255, 255, 255, 0.96)',
                          borderColor: '#e5e7eb',
                          borderRadius: '0.5rem',
                          color: '#111827',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          fontSize: '14px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSales)"
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Categories and Weekly Activity - Stacked on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Categories */}
                <motion.div
                  className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-4 md:p-6 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Categories</h2>
                  <div className="h-52 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((_entry, index) => (
                            <Cell key={`cell-${index}` } fill={COLORS[index % COLORS.length]} />
                            
                          ))}
                        </Pie>
                        <Tooltip 
                          
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.96)',
                            borderColor: '#e5e7eb',
                            borderRadius: '0.5rem',
                            color: '#111827',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            fontSize: '14px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Weekly Activity */}
                <motion.div
                  className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-4 md:p-6 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Weekly Activity</h2>
                  <div className="h-52 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="name" 
                          stroke="#4b5563" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          stroke="#4b5563" 
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.96)',
                            borderColor: '#e5e7eb',
                            borderRadius: '0.5rem',
                            color: '#111827',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            fontSize: '14px'
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#8b5cf6" 
                          radius={[2, 2, 0, 0]} 
                          stroke="#7c3aed"
                          strokeWidth={1}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;