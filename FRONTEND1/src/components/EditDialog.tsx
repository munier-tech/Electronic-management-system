import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProductsStore } from "@/store/useProductsStore";
import { Loader2 } from "lucide-react";
import { useState } from "react";
interface EditButtonWithDialogProps {
  productId: string;
}
const DialogDemo: React.FC<EditButtonWithDialogProps> = ({productId}) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
  });
  const {   isLoading ,  updateProduct } = useProductsStore();


  const handleUpdate = async () => {

    updateProduct(productId , productData)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer bg-violet-950 text-white px-3 py-2 rounded-md hover:bg-gray-300 duration-300 transition-all ease-in-out">Edit Product</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your Product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input  
            id="name"
            value={productData.name}
            onChange={(e) => setProductData((prev) => ({ ...prev, name: e.target.value }))}
            className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              description
            </Label>
            <Input  
            id="name"
            value={productData.description}
            onChange={(e) => setProductData((prev) => ({ ...prev, description: e.target.value }))}
            className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              price
            </Label>
            <Input  
            id="name"
            value={productData.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductData((prev) => ({
                ...prev,
                price: parseInt(e.target.value) || 0,
              }))
            }
            className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate} type="submit">
            {isLoading ? <Loader2 size={20}/> : "Update"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default DialogDemo