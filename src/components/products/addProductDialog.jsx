import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PackagePlus } from "lucide-react";
import InputForm from "./addProduct";

export default function ProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-4" variant="outline">
          <PackagePlus className="w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>ADD PRODUCT</DialogTitle>
        </DialogHeader>
        {/***********/}
        <InputForm />
        {/***********/}
      </DialogContent>
    </Dialog>
  );
}
