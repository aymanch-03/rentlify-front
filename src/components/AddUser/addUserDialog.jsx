import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import InputForm from "./AddUserForm"

export default function UserDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='m-2 p-4' variant="outline">Add User</Button>
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
    )
}
