import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import InputForm from "./AddUserForm";

export default function UserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-4" variant="outline">
          <UserPlus className="w-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>ADD USER</DialogTitle>
        </DialogHeader>
        {/***********/}
        <InputForm />
        {/***********/}
      </DialogContent>
    </Dialog>
  );
}
