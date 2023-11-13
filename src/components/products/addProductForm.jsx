/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    DialogClose,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {AddProduct} from "../../redux/reducers/productSlice";
const FormSchema = z.object({
    product_name: z
        .string({
            required_error: "First name is required",
        })
        .min(2)
        .max(18),
        product_image: z
        .string({
            required_error: "Last name is required",
        })
        .min(2)
        .max(18),
        active: z
        .string()
        .min(1, { message: "Please select a role to display." }),
        price: z
        .string({
            required_error: "Username is required",
        })
        .min(2),
        long_description: z
        .string({
            required_error: "Email is required",
        })
        .min(2),
        short_description: z
        .string({
            required_error: "Password is required",
        })
        .nonempty('This is required').min(8, { message: 'Too short' }),

})

export default function InputForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            product_name: "",
            product_image: "",
            active: "",
            price: "",
            long_description: "",
            short_description: "",
        }
    })
    
    const dispatch = useDispatch()

    const submitData = async (values) => {
        try {
            dispatch(AddProduct(values))
        } catch (error) {
            console.error('Error submitting data', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)} className=" space-y-6">
                <div className="grid grid-cols-2 gap-x-5">
                    <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>PRODUCT NAME</FormLabel>
                                <FormControl>
                                    <Input
                                        className="input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600 h-0" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="product_image"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>PRODUCT IMAGE</FormLabel>
                                <FormControl>
                                    <Input
                                        name={field.name}
                                        className="input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="active"

                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>STATUS</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >

                                <FormControl >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent name="active">
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">Idle</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>PRICE</FormLabel>
                            <FormControl>
                                <Input
                                    name="price"
                                    type="text"
                                    {...field}
                                     />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="long_description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>LONG DESCRIPTION</FormLabel>
                            <FormControl>
                                <Input name="long_description" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="short_description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SHORT DESCRIPTION</FormLabel>
                            <FormControl>
                                <Input name="short_description" type="text" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <br />
                <DialogFooter className="!justify-between flex mt-8">
                    <DialogClose asChild>
                        <Button className='p-4' type="button" variant="secondary">Close</Button>
                    </DialogClose>
                    <Button className='p-4' type="submit">Add Product</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
