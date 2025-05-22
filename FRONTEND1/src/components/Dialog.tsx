import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useProductsStore } from "@/store/useProductsStore";
import { useState } from "react";

interface DeleteButtonWithDialogProps {
  productId: string ;
}

const DeleteButtonWithDialog: React.FC<DeleteButtonWithDialogProps> = ({productId}) => {
  const { deleteProduct, isLoading } = useProductsStore();
  const [open, setOpen] = useState(false);
  

  const handleDelete = async () => {
    await deleteProduct(productId); // Call your delete logic here
    setOpen(false); // Close the dialog after deletion
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="destructive">Delete</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-6">
            Are you sure you want to delete this product?
          </AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButtonWithDialog;
