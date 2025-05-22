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
import { useLiabilityStore } from "@/store/useLiabilityStore";
import { Loader } from "lucide-react";
import { useState } from "react";

interface DeleteButtonWithDialogProps1 {
  LiabilityId: string ;
}

const DeleteButtonWithDialog1: React.FC<DeleteButtonWithDialogProps1> = ({LiabilityId}) => {
  const { deleteLiability, isLoading } = useLiabilityStore();
  const [open, setOpen] = useState(false);
  

  const handleDelete = async () => {
    await deleteLiability(LiabilityId); // Call your delete logic here
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
            {isLoading ? <Loader/> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButtonWithDialog1;
