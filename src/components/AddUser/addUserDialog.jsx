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
import { ProfileForm } from "./AddUser"

export default function UserDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                </DialogHeader>
                {/***********/}
                <ProfileForm />
                {/***********/}
                <DialogFooter className="!justify-between flex mt-6">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                    <Button type="submit">Add User</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
