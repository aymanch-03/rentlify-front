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
import UpdateUserForm from "./updateUserform";
export default function UpdateUserDialog() {
  return (
     
    <Dialog>
      <DialogTrigger asChild className="relative flex cursor-default select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        <Button className='p-4' variant="outline">
          Update User
        </Button>
      </DialogTrigger>
      <DialogContent className="w-20 sm:max-w-[600px]">
        <DialogTitle>UPDATE USER</DialogTitle>
        {/***********/}
        <UpdateUserForm />
        {/***********/}
      </DialogContent>
    </Dialog>
  )
}
