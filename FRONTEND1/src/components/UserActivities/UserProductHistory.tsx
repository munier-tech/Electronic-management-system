import React, { useEffect } from "react";
import { Loader, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHistoryStore } from "@/store/useHistoryStore";

const UserProductHistory: React.FC = () => {
  const { history, isLoading, getAllHistory } = useHistoryStore();

  useEffect(() => {
    getAllHistory();
  }, [getAllHistory]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  return (
    <div className="md:w-full w-[90%] max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
          Purchase History <span className="text-emerald-400"></span>
        </h2>
      </div>

      {history && history.length > 0 ? (
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {history.flatMap((transaction) =>
                  transaction.products.map((product : any) => (
                    <tr key={product._id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-300">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-medium text-white">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300 max-w-xs truncate">
                          {product.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-lg leading-5 font-semibold rounded-full bg-emerald-900/50 text-emerald-400">
                          ${product.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white"
                            >
                              <BsThreeDotsVertical size={20} />
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="bg-gray-800 border-gray-700 rounded-lg max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-white text-xl">
                                Product Actions
                              </DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Choose an action for this product
                              </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col space-y-3 mt-4">
                              {/* Add your action buttons here */}
                              <Button variant="outline" className="text-white bg-gray-700 hover:bg-gray-600">
                                View Details
                              </Button>
                              <Button variant="destructive">
                                Return Product
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl shadow-lg p-8 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-600" />
            <h3 className="mt-4 text-xl font-medium text-white">
              No Purchase History Found
            </h3>
            <p className="mt-2 text-gray-400">
              You haven't made any purchases yet. Start shopping to see your history here.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProductHistory;