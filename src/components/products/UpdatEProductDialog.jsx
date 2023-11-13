import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PackagePlus } from "lucide-react"
import InputForm from "./addProductForm";

export default function UpdateProductDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='p-4' variant="outline">
                <PackagePlus className="w-4 mr-2"/>
                     Update Product
                     </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>UPDATE PRODUCT</DialogTitle>
                </DialogHeader>
                {/***********/}
                <InputForm />
                {/***********/}
            </DialogContent>
        </Dialog>
    )
}