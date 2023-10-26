import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function ProfileForm() {
    const form = useForm()

    return (
        <div className="add-user-form">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="Name"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Name</FormLabel>
                            <div className="user-name">
                            <FormControl>
                                <Input className="input" placeholder="Fisrtname" />
                            </FormControl>
                            <FormControl>
                                <Input className="input" placeholder="Lastname" />
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>username</FormLabel>
                            <FormControl>
                                <Input />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl>
                                <Input type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br />
                <FormField
                    control={form.control}
                    name="Password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br />
                <FormField
                    control={form.control}
                    name="Confirm password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <br />
                <Button className="button" type="submit">Button</Button>
            </Form>
        </div>
    )
}
