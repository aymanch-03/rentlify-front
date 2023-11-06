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
export default function UpdateUserDialog({ row }) {
  return (

    <Dialog>
      <DialogTrigger asChild className="relative flex cursor-default select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        <div >
        <UpdateUserDialog />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">

        <DialogTitle>UPDATE USER</DialogTitle>
        {/***********/}
        <UpdateUserForm />
        {/***********/}
      </DialogContent>
    </Dialog>
  )
}
