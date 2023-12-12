import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import CategoryForm from "../category/categoryForm";

export default function CategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-4" variant="outline">
          <Icon icon="solar:widget-add-line-duotone" className="w-4 h-4 mr-2" />
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
