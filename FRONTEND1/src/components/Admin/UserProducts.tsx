import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useProductsStore } from "@/store/useProductsStore";
import { Badge } from "@/components/ui/badge";

const UsersDailyProductsComponent = () => {
  const { usersWithProducts, isLoading, getUsersDailyProducts } = useProductsStore();

  useEffect(() => {
    getUsersDailyProducts();
  }, [getUsersDailyProducts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-white  mx-auto" size={40} />
      </div>
    );
  }

  if (!usersWithProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <svg
          className="w-16 h-16 text-muted-foreground mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <p className="text-xl text-muted-foreground">No daily products found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Check back later for sales updates
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white text-center">Today's Sales Performance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usersWithProducts.map(({ username, role, products }) => (
          <Card key={username} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white  drop-shadow-md mb-1 flex items-center justify-center text-black font-bold text-lg">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <Badge
                    variant='outline'
                    className="absolute flex items-center justify-center -bottom-6  capitalize text-xs px-2 py-0.5"
                  >
                    {role}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-xl">{username}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {products.length} {products.length === 1 ? "sale" : "sales"} today
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 m-2 rounded-md drop-shadow-md">
              {products.length > 0 ? (
                products.map((product) => (
                  <div 
                    key={product._id?.toLocaleUpperCase()}
                    className="flex items-start justify-between p-4 bg-white rounded-lg hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate">{product.name.toLocaleUpperCase()}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <span className="font-bold text-primary text-lg">
                        ${product.price}
                      </span>
                      <Badge variant='destructive' className="mt-1">
                        Sold
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No products sold today
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersDailyProductsComponent;