import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios, { Axios } from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { useState } from "react"

const FormSchema = z.object({
    first_name: z
        .string({
            required_error: "First name is required",
        })
        .min(2)
        .max(18),
    last_name: z
        .string({
            required_error: "Last name is required",
        })
        .min(2)
        .max(18),
    role: z
        .string()
        .min(1, { message: "Please select a role to display." }),
    user_name: z
        .string({
            required_error: "Username is required",
        })
        .min(2),
    email: z
        .string({
            required_error: "Email is required",
        })
        .min(2)
        .email(),
    password: z
        .string({
            required_error: "Password is required",
        })
        .nonempty('This is required').min(8, { message: 'Too short' }),

})

export default function InputForm() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        role: "",
        user_name: "",
        email: "",
        password: "",
    });
    const form = useForm({
        resolver: zodResolver(FormSchema),
    })
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            role: selectedValue,
            [e.target.name]: e.target.value,
        });
        console.log(formData)
    };

    const submitData = async () => {
        try {
            axios.post('http://localhost:5000/v1/users', formData);
            console.log('Data submitted successfully',formData);
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
                        name="first_name"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>FIRST NAME</FormLabel>
                                <FormControl>
                                    <Input
                                        className="input"
                                        value={field.value}
                                        name={field.name}
                                        onChange={(e) => {
                                            handleChange(e);
                                            field.onChange(e);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600 h-0" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>LAST NAME</FormLabel>
                                <FormControl>
                                    <Input
                                        name={field.name}
                                        className="input"
                                        onChange={(e) => { handleChange(e); field.onChange(e); }}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="role"
                    
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PLATFORM ROLE</FormLabel>
                            <Select onValueChange={(value) => { setSelectedValue(value); field.onChange(value)}} value={field.value} >

                                <FormControl >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent name="role">
                                    <SelectItem value="admin">Admin User</SelectItem>
                                    <SelectItem value="manager">Manager User</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="user_name"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>USERNAME</FormLabel>
                            <FormControl>
                                <Input
                                    name="user_name"
                                    type="text"
                                    onChange={(e) => {
                                        handleChange(e);
                                        field.onChange(e);
                                    }} />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>EMAIL</FormLabel>
                            <FormControl>
                                <Input name="email" type="email" onChange={(e) => {
                                    handleChange(e);
                                    field.onChange(e);
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PASSWORD</FormLabel>
                            <FormControl>
                                <Input name="password" type="password" onChange={(e) => {
                                    handleChange(e);
                                    field.onChange(e);
                                }} />
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
                    <Button className='p-4' type="submit">Add User</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
