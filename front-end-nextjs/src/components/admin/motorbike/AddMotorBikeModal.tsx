import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "react-hook-form";
import FormAddMotorBike from "@/components/admin/motorbike/FormAddMotorBike";

interface AddMotorBikeModalProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (value: boolean) => void;
}

const handleAddProduct = () => {};

const AddMotorBikeModal: FC<AddMotorBikeModalProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
}) => {
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen !max-w-full max-h-screen rounded-none overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new motorcycle product in your inventory.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto">
          <FormAddMotorBike />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMotorBikeModal;
