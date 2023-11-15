import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import { addUser } from "../../redux/reducers/userSlice";
import { useToast } from "../ui/use-toast";
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
  role: z.string().min(1, { message: "Please select a role to display." }),
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
    .nonempty("This is required")
    .min(8, { message: "Too short" }),
});

export default function InputForm() {
  const { toast } = useToast();
  const stateError = useSelector((state) => state.user.error);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      role: "",
      user_name: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  const submitData = async (values) => {
    try {
      dispatch(addUser(values));
      if (!stateError) {
        return toast({
          variant: "success",
          description: (
            <div className="flex items-center justify-between gap-3">
              <Icon icon="solar:check-circle-linear" width={23} height={23} />
              <p>User added successfully</p>
            </div>
          ),
        });
      }
      toast({
        variant: "destructive",
        description: "Cannot add user now. Please try again later",
      });
    } catch (error) {
      console.error("Error submitting data", error);
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
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input className="input" {...field} />
                </FormControl>
                <FormMessage className="text-red-600 h-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input name={field.name} className="input" {...field} />
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
              <FormLabel>Platform Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
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
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input name="user_name" type="text" {...field} />
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
                <Input name="email" type="email" {...field} />
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
                <Input name="password" type="password" {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <br />
        <DialogFooter className="!justify-between flex mt-8 gap-y-4">
          <DialogClose asChild>
            <Button
              className="p-4 border border-black/5"
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
          <DialogTrigger asChild>
            <Button className="p-4" type="submit">
              Add User
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </form>
    </Form>
  );
}
