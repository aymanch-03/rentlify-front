/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";
import { updateUser } from "../../redux/reducers/userSlice";

const FormSchema = z.object({
  first_name: z.string().min(2).max(18),
  last_name: z.string().min(2).max(18),
  role: z.string().min(1, { message: "Please select a role to display." }),
  user_name: z.string().min(2),
});

export default function UpdateUserForm({ user }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisplayed, setIsDisplayed] = useState("hidden");
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      user_name: user.user_name,
      active: user.active,
    },
  });

  const editData = () => {
    setIsDisplayed("flex");
    setIsDisabled(false);

    form.setValue("first_name", user.first_name, { shouldDirty: true });
    form.setValue("last_name", user.last_name, { shouldDirty: true });
    form.setValue("email", user.email, { shouldDirty: true });
    form.setValue("role", user.role, { shouldDirty: true });
    form.setValue("user_name", user.user_name, { shouldDirty: true });
    form.setValue("active", user.active, { shouldDirty: true });
  };

  const cancelEdit = () => {
    setIsDisplayed("hidden");
    setIsDisabled(true);

    form.setValue("first_name", user.first_name, { shouldDirty: false });
    form.setValue("last_name", user.last_name, { shouldDirty: false });
    form.setValue("email", user.email, { shouldDirty: false });
    form.setValue("role", user.role, { shouldDirty: false });
    form.setValue("user_name", user.user_name, { shouldDirty: false });
    form.setValue("active", user.active, { shouldDirty: false });
  };

  const submitData = (id, data) => {
    try {
      const newUserData = form.getValues();
      // console.log('updatedUser:',updatedUser);
      // console.log('id:',id);
      dispatch(updateUser({ id, newUserData }));
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return user ? (
    <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 gap-x-4">
      <div>
        <div className="flex justify-between items-center">
          <h3 className="mt-8 mb-8 text-xl font-normal">Account</h3>
          <div>
            <Button
              className={`p-4`}
              variant="outline"
              type="button"
              onClick={editData}
            >
              EDIT
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => submitData(user._id, data))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel className="w-[400px] text-slate-500 p-2">
                    FIRST NAME
                  </FormLabel>
                  <div className="inline-block w-full">
                    <FormControl>
                      <Input
                        placeholder={user.first_name}
                        disabled={isDisabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 h-0" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel className="w-[400px] text-slate-500 p-2">
                    LAST NAME
                  </FormLabel>
                  <div className="inline-block w-full">
                    <FormControl>
                      <Input
                        className=" "
                        placeholder={user.last_name}
                        disabled={isDisabled}
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
                  <FormLabel className="w-[400px] text-slate-500 p-2">
                    EMAIL
                  </FormLabel>
                  <div className="inline-block w-full">
                    <FormControl>
                      <Input
                        placeholder={user.email}
                        className="w-full"
                        disabled
                        type="email"
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
                  <FormLabel className="w-[400px] text-slate-500 p-2">
                    PLATFORM ROLE
                  </FormLabel>
                  <div className="inline-block w-full">
                    <Select name="role" value={user.role} disabled={isDisabled}>
                      <FormControl>
                        <>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select a role to display" />
                          </SelectTrigger>
                          <SelectContent name="role">
                            <SelectItem value="admin">Admin User</SelectItem>
                            <SelectItem value="manager">
                              Manager User
                            </SelectItem>
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
                  <FormLabel className="w-[400px] text-slate-500 p-2">
                    USERNAME
                  </FormLabel>
                  <div className="inline-block w-full">
                    <FormControl>
                      <Input
                        name="user_name"
                        placeholder={user.user_name}
                        disabled={isDisabled}
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
              name="active"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel className="w-[400px] text-slate-500 p-2">
                    ACTIVE
                  </FormLabel>
                  <div className="inline-block w-full">
                    <Select
                      name="active"
                      value={user.active}
                      disabled={isDisabled}
                    >
                      <FormControl>
                        <>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select a role to display" />
                          </SelectTrigger>
                          <SelectContent name="active">
                            <SelectItem value={true}>Active</SelectItem>
                            <SelectItem value={false}>Inactive</SelectItem>
                          </SelectContent>
                        </>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <br />
            <div className={`flex justify-between pl-[300px] ${isDisplayed}`}>
              <Button
                type="button"
                className="p-4"
                variant="outline"
                onClick={cancelEdit}
              >
                Cancel Edit
              </Button>
              <Button className="p-4" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  ) : (
    <Loader2 className="animate-spin" />
  );
}
