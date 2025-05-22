import React, { useEffect } from "react";
import { Loader } from "lucide-react";
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
import DeleteButtonWithDialog from "../Dialog";
import { useProductsStore } from "@/store/useProductsStore";
import DialogDemo from "../EditDialog";

const DailySalesList: React.FC = () => {
  const { date, products, isLoading, getMyDailyProducts } = useProductsStore();

  useEffect(() => {
    getMyDailyProducts();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-emerald-500" size={48} />
      </div>
    );

  return (
    <div className="w-[30rem] m-auto px-2 sm:px-4 py-6">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    <h2 className="text-xl sm:text-2xl font-bold text-white">
      Today's Sales <span className="text-emerald-400">{date}</span>
    </h2>
    {products?.length > 0 && (
      <Link
        to="/iibi"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-semibold transition-all duration-300 shadow hover:shadow-emerald-500/20 whitespace-nowrap"
      >
        Add New Sale
      </Link>
    )}
  </div>

  {products.length > 0 ? (
    <div className="space-y-4">
      {products.map((product) =>
        product._id ? (
          <div
            key={product._id}
            className="bg-gray-900 p-4 rounded-xl shadow-md space-y-2 sm:space-y-0 sm:flex sm:justify-between sm:items-center"
          >
            <div className="text-white space-y-1">
              <div className="flex items-center gap-1 border border-blue-400 rounded-2xl p-3 ">
              <p className="text-emerald-300 text-lg font-bold ">NAME : </p>
              <p className="text-lg font-semibold"> {product.name.toLocaleUpperCase()}</p>
              </div>
              <div className="flex items-center gap-1 border border-emerald-400 rounded-2xl p-3 ">
              <p className="text-emerald-300 text-lg font-bold ">DESCRIPTION : </p>
              <p className="text-lg font-semibold"> {product.description.toLocaleUpperCase()}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm mt-2">
                <span className="bg-emerald-900/40 text-emerald-400 px-2 py-1 rounded-full">
                 <h1> Quantity: {product.quantity}</h1>
                </span>
                <span className="bg-emerald-900/40 text-emerald-400 px-2 py-1 rounded-full">
                  $Price : {product.price}
                </span>
                <span className="bg-emerald-900/40 text-emerald-400 px-2 py-1 rounded-full">
                  $ Total :  {(product.price * (product.quantity ?? 1)).toFixed(1)}
                </span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex justify-end sm:justify-start">
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
                    <DialogTitle className="text-white text-xl">Product Actions</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Choose an action for this product
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col space-y-3 mt-4">
                    <DialogDemo productId={product._id} />
                    <DeleteButtonWithDialog productId={product._id} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : null
      )}
    </div>
  ) : (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 text-center">
      <div className="max-w-md mx-auto">
        <svg
          className="w-16 h-16 mx-auto text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h3 className="mt-4 text-xl font-medium text-white">No Sales Recorded Today</h3>
        <p className="mt-2 text-gray-400">
          You haven't made any sales today. Start adding products to track your daily sales.
        </p>
        <div className="mt-6">
          <Link
            to="/iibi"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
          >
            Add First Sale
          </Link>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default DailySalesList;