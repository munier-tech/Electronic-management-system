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
import { useLiabilityStore } from "@/store/useLiabilityStore";
import DeleteButtonWithDialog1 from "../liabilitydialog";

const DialyLiability: React.FC = () => {
  const { date, liabilities, isLoading, getDialyLiabilities } = useLiabilityStore();

  useEffect(() => {
    getDialyLiabilities();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-emerald-500" size={48} />
      </div>
    );

  return (
    <div className="md:w-full w-[90%] max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
          Today's Sales <span className="text-emerald-400">{date}</span>
        </h2>
        {liabilities?.length > 0 && (
          <Link
            to="/iibi"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
          >
            Add New Liability
          </Link>
        )}
      </div>

      {liabilities.length > 0 ? (
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-emerald-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {liabilities.map((Liabilities) =>
                  Liabilities._id ? (
                    <tr key={Liabilities._id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-medium text-white">
                          {Liabilities.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300 max-w-xs truncate">
                          {Liabilities.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-lg leading-5 font-semibold rounded-full bg-emerald-900/50 text-emerald-400">
                          ${Liabilities.price}
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
                                Liability Actions
                              </DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Choose an action for this Liabilities
                              </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col space-y-3 mt-4">
                              <DeleteButtonWithDialog1 LiabilityId={Liabilities._id} />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl shadow-lg p-8 text-center">
          <div className="max-w-md mx-auto">
            <svg
              className="w-16 h-16 mx-auto text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-white">
              No liabilities Recorded Today
            </h3>
            <p className="mt-2 text-gray-400">
              You haven't made any liabilities today. Start adding liabilities to track your
              daily Liability.
            </p>
            <div className="mt-6">
              <Link
                to="/daymi"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
              >
                Add First Liability
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialyLiability;