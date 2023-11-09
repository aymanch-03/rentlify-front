
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
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
})
export default function UpdateUserForm(props) {
    const [user, setUser] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const [isDisplayed, setIsDisplayed] = useState('hidden');

    useEffect(() => {
        setUser(props.data);
    },[])



    function editData() {
        setIsDisplayed('flex');
        setIsDisabled(false)
    }
    function cancelEdit() {
        setIsDisplayed('hidden');
        setIsDisabled(true)
    }

    const submitData = async (id, values) => {
        try {
            // console.log('values', values);
            // console.log('id', id);
            // dispatch(updateUser(id, values))
        } catch (error) {
            console.error('Error submitting data', error);
        }
    };

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: user.first_name || 'empty',
            last_name: user.last_name,
            role: user.role,
            user_name: user.user_name,
            email: user.email
        }
    })

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="mt-8 mb-8 text-xl font-normal">Account</h3>
                <div>
                    <Button className={`p-4`} variant="outline" type="submit" onClick={editData}>EDIT</Button>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitData(user))} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="flex" >
                                <FormLabel className="w-[400px] text-slate-500 p-2">FIRST NAME</FormLabel>
                                <div className="inline-block w-full">
                                    <FormControl>
                                        <Input
                                            className=""
                                            disabled={isDisabled}
                                            value={field.value}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600 h-0" />
                                </div>
                            </FormItem>
                        )
                        }
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className="flex" >
                                <FormLabel className="w-[400px] text-slate-500 p-2">LAST NAME</FormLabel>
                                <div className="inline-block w-full">
                                    <FormControl>
                                        <Input
                                            className=" "
                                            disabled={isDisabled}
                                            value={field.value}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </div>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormLabel className="w-[400px] text-slate-500 p-2">EMAIL</FormLabel>
                                <div className="inline-block w-full">

                                    <FormControl>
                                        <Input
                                            className="w-full"
                                            disabled
                                            type="email"
                                            value={field.value}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormLabel className="w-[400px] text-slate-500 p-2">PLATFORM ROLE</FormLabel>
                                <div className="inline-block w-full">
                                    <Select
                                        disabled={isDisabled}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >

                                        <FormControl >
                                            <>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a role to display" />
                                                </SelectTrigger>
                                                <SelectContent name="role">
                                                    <SelectItem value="admin">Admin User</SelectItem>
                                                    <SelectItem value="manager">Manager User</SelectItem>
                                                </SelectContent>
                                            </>
                                        </FormControl>
                                    </Select>
                                    <FormMessage />
                                </div>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="user_name"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormLabel className="w-[400px] text-slate-500 p-2">USERNAME</FormLabel>
                                <div className="inline-block w-full">
                                    <FormControl>
                                        <Input
                                            name="user_name"
                                            disabled={isDisabled}
                                            value={field.value}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </div>
                            </FormItem>
                        )}
                    />
                    <br />
                    <div className={`flex justify-between pl-[300px] ${isDisplayed}`}>
                        <div>
                            <Button type="button" className='p-4' variant="outline" onClick={cancelEdit} >Cancel Edit</Button>
                        </div>
                        <Button className='p-4' type="submit">Save Changes</Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}