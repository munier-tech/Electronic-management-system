import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useProductsStore } from "@/store/useProductsStore";
import { Loader2, TrendingUp, DollarSign, Package } from "lucide-react";
import DialogDemo from "../EditDialog";
import DeleteButtonWithDialog from "../Dialog";

const DailySales: React.FC = () => {
  const { products, isLoading, getDailyproducts } = useProductsStore();

  useEffect(() => {
    getDailyproducts();
  }, [getDailyproducts]);

  const totalSales = products.reduce((sum, product) => {
    const quantity = product.quantity ?? 1;
    return sum + product.price * quantity;
  }, 0);
  
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Total Products */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 font-medium text-sm md:text-base">Total Products</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1 md:mt-2">
                  {products.length}
                </h3>
              </div>
              <div className="bg-indigo-700 p-2 md:p-3 rounded-lg">
                <Package className="text-white" size={20} />
              </div>
            </div>
          </div>

          {/* Today's Sales */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 font-medium text-sm md:text-base">Today's Sales</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1 md:mt-2">
                  ${totalSales.toFixed(2)}
                </h3>
              </div>
              <div className="bg-purple-700 p-2 md:p-3 rounded-lg">
                <DollarSign className="text-white" size={20} />
              </div>
            </div>
          </div>

          {/* Average Price */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 font-medium text-sm md:text-base">Avg. Price</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1 md:mt-2">
                  ${products.length > 0 ? (totalSales / products.length).toFixed(2) : "0.00"}
                </h3>
              </div>
              <div className="bg-pink-700 p-2 md:p-3 rounded-lg">
                <TrendingUp className="text-white" size={20} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sales Table */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2 flex items-center">
              <TrendingUp className="mr-2 md:mr-3" size={20} /> Today's Sales
            </h2>
            <p className="text-black text-sm md:text-base mb-4 md:mb-6">
              Overview of products sold today
            </p>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-white" size={40} />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="bg-white bg-opacity-20 rounded-full p-3 md:p-4 inline-block">
                  <Package size={32} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl text-red-500 font-bold mt-3 md:mt-4">
                  No sales today
                </h3>
                <p className="text-black mt-1 md:mt-2 text-sm md:text-base">
                  Check back later for updates
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-left text-xs md:text-sm font-medium text-black">
                          Product
                        </th>
                        <th className="py-3 px-4 text-left text-xs md:text-sm font-medium text-black hidden sm:table-cell">
                          Description
                        </th>
                        <th className="py-3 px-4 text-right text-xs md:text-sm font-medium text-black">
                          Qty
                        </th>
                        <th className="py-3 px-4 text-right text-xs md:text-sm font-medium text-black">
                          Price
                        </th>
                        <th className="py-3 px-4 text-right text-xs md:text-sm font-medium text-black">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {products.map((product, index) => (
                        <motion.tr
                          key={product._id}
                          className="hover:bg-white hover:bg-opacity-5 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-indigo-500 rounded-lg p-1 md:p-2 text-xs md:text-sm text-white font-medium truncate max-w-[120px] md:max-w-none">
                                {product.name.toLowerCase()}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-blsck font-bold text-xs md:text-sm hidden sm:table-cell truncate max-w-[150px]">
                            {product.description.toUpperCase()}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <span className="bg-emerald-500 bg-opacity-20 text-white py-0.5 px-2 md:py-1 md:px-3 rounded-full text-xs md:text-sm font-medium">
                              #{product.quantity?.toFixed(0) || 1}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <span className="bg-emerald-500 bg-opacity-20 text-white py-0.5 px-2 md:py-1 md:px-3 rounded-full text-xs md:text-sm font-medium">
                              ${product.price.toFixed(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <div className="flex justify-end gap-1 md:gap-2">
                              <DialogDemo productId={product._id as string} />
                              <DeleteButtonWithDialog productId={product._id as string} />
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DailySales;