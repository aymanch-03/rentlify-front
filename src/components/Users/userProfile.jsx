import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";

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
import { useEffect, useState } from "react"
import { getUser, updateUser } from "../../redux/features/userSlice";
import image from "../../assets/1946429.png"

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
export default function UserProfile(props) {
    const [userData, setUserData] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const [isDisplayed, setIsDisplayed] = useState('hidden');
    
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.user.users);
  
    useEffect(() => {
      dispatch(getUser(props.id))
    }, [dispatch])

    useEffect(()=>{
        console.log(data.last_name)
    })
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:5000/v1/users/${props.id}`)
    //         .then((response) => {
    //             const { data } = response.data;
    //             setUserData(data);
    //             // console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []);
    
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: userData.first_name|| 'Still Empty',
            last_name: userData.last_name || 'Still Empty',
            role: userData.role || '',
            user_name: userData.user_name || 'Still Empty',
            email: userData.email || 'Still Empty'
        }
    })

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
    return (
        <div className="m-8 pr-[200px]">
            <div className="inline-flex">

                <div className="w-[300px]">
                    <img className="w-[180px] h-[180px] rounded-s-full" src={image} alt="Profil Image" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-semibold uppercase">{userData.last_name + " " + userData.first_name}</h1>
                    <p className="text-slate-500">
                        <a href="" className="text-blue-600/75">{userData.email}</a>
                        {" "}- {userData.role}
                    </p>
                </div>
            </div>
            <div className="flex justify-between">

                <h3 className="mt-8 mb-8 text-xl font-normal">Account</h3>
                <div>
                    <Button className={`p-4`} variant="outline" type="submit" onClick={editData}>EDIT</Button>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitData(userData._id))} className="space-y-6">
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