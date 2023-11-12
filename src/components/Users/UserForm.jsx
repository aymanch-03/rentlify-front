import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateUser } from "../../redux/features/userSlice";
import { useState } from "react"
const userSchema = z.object({
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

export default function UserForm({ user }) {
    const defaultValues = {
        first_name: user.first_name || "haha",
        last_name: user.last_name,
        role: user.role,
        user_name: user.user_name,
        email: user.email,
    }
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues
    });

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        // Data is validated by Zod schema
        console.log('Valid form data:', data);
    };

    // const submitData = async (id, values) => {
    //     try {
    //         dispatch(updateUser(id, values))
    //         console.log('Data Submitted');
    //     } catch (error) {
    //         console.error('Error submitting data', error);
    //     }
    // };
    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e) }} className="w-full">
            <div className="flex">
                <label className="inline-block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[300px] text-slate-500 p-2" >
                    FIRSTNAME
                </label>
                <Input
                    type="text"
                    name="first_name"
                    // defaultValue={user.first_name}
                    {...register('first_name')}
                />
                {errors.first_name && <p className="block w-full">{errors.first_name.message}</p>}

            </div>
            <div className="flex">

                <label className="inline-block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[300px] text-slate-500 p-2" >
                    LASTNAME
                </label>
                <Input
                    name="last_name"
                    // defaultValue={user.last_name}
                    {...register('last_name')}
                />
                {errors.last_name && <p className="block w-full">{errors.last_name.message}</p>}

            </div>
            <div className="flex">
                <label className="inline-block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[300px] text-slate-500 p-2">Username</label>
                <Input
                    type="text"
                    name="user_name"
                    // defaultValue={user.user_name}
                    {...register('user_name')}
                />
                {errors.user_name && <p className="block w-full">{errors.user_name.message}</p>}

            </div>
            <div className="flex">

                <label className="inline-block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[300px] text-slate-500 p-2" >Role</label>
                <Select 
                name="role" 
                {...register('role')} 
                // defaultValue={user.role}
                >
                    <SelectTrigger >
                        <SelectValue placeholder="Select a role to display" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value="admin">Admin User</SelectItem>
                        <SelectItem value="manager">Manager User</SelectItem>
                    </SelectContent>
                </Select>
                {errors.role && <p className="block w-full">{errors.role.message}</p>}

            </div>
            <div className="flex">

                <label className="inline-block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[300px] text-slate-500 p-2">Email</label>
                <Input
                    // defaultValue={user.email}
                    className="w-full"
                    {...register('email')}
                    type="email"
                />
                {errors.email && <p className="block w-full">{errors.email.message}</p>}
            </div>
            <Button className='p-4' type="submit">Save Changes</Button>
        </form>
    )
}