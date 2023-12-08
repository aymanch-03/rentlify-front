import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import CategoryForm from "../category/categoryForm";

export default function CategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-4" variant="outline">
          <UserPlus className="w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>ADD CATEGORY</DialogTitle>
        </DialogHeader>
        {/***********/}
        <CategoryForm />
        {/***********/}
      </DialogContent>
    </Dialog>
  );
}
