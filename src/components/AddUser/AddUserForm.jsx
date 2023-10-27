import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
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
const FormSchema = z.object({
    firstName: z
        .string({
            required_error: "First name is required",
        })
        .min(2)
        .max(18),
    lastName: z
        .string({
            required_error: "Last name is required",
        })
        .min(2)
        .max(18),
    role: z
        .string()
        .min(1, { message: "Please select a role to display." }),
    username: z
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
    confirmPassword: z
        .string({
            required_error: "Confirm password is required",
        })
        .min(1)
    }).refine(
        (values) => {
          return values.password === values.confirmPassword;
        },
        {
          message: "Passwords must match!",
          path: ["confirmPassword"],
        }
      );
export default function InputForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            role: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(data) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                <div className="grid grid-cols-2 gap-x-5">

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>FIRST NAME</FormLabel>
                                <FormControl>
                                    <Input className="input" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>LAST NAME</FormLabel>
                                <FormControl>
                                    <Input className="input" {...field} />
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>EMAIL</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600" />
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
                                <Input type="password"  {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CONFIRM PASSWORD</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <br />
                <DialogFooter className="!justify-between flex -mt-8">
                    <DialogClose asChild>
                        <Button className='p-4' type="button" variant="secondary">Close</Button>
                    </DialogClose>
                    <Button className='p-4' type="submit">Add User</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
