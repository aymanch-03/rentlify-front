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
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";
import { timeAgo } from "../../lib/helpers";
import { updateUser } from "../../redux/reducers/userSlice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Icons } from "../ui/icons";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  first_name: z.string().min(2).max(18),
  last_name: z.string().min(2).max(18),
  role: z.string().min(1, { message: "Please select a role to display." }),
  user_name: z.string().min(2),
});

export default function UpdateUserForm({ user, fallbackAvatar, isLoading }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisplayed, setIsDisplayed] = useState("hidden");
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const { toast } = useToast();
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

  useEffect(() => {
    form.reset({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      user_name: user.user_name,
      active: user.active,
    });
  }, [form, user]);

  const editData = () => {
    setIsDisplayed("flex");
    setIsDisabled(false);

    form.setValue("first_name", user.first_name);
    form.setValue("last_name", user.last_name);
    form.setValue("email", user.email);
    form.setValue("role", user.role);
    form.setValue("user_name", user.user_name);
    form.setValue("active", user.active);
  };

  const cancelEdit = () => {
    setIsDisplayed("invisible");
    setIsDisabled(true);

    form.setValue("first_name", user.first_name);
    form.setValue("last_name", user.last_name);
    form.setValue("email", user.email);
    form.setValue("role", user.role);
    form.setValue("user_name", user.user_name);
    form.setValue("active", user.active);
  };

  // eslint-disable-next-line no-unused-vars
  const submitData = (id, data) => {
    try {
      const newUserData = form.getValues();
      const isDataChanged = Object.keys(newUserData).some(
        (key) => newUserData[key] !== user[key]
      );

      if (!isDataChanged) {
        toast({
          variant: "default",
          description:
            "No changes made – your personal information is already current.",
        });
        return;
      }

      dispatch(updateUser({ id, newUserData }));
      setSpinnerLoading(true);
      setTimeout(() => {
        setSpinnerLoading(false);
        toast({
          variant: "success",
          description: "User updated successfully",
        });
        setIsDisplayed("invisible");
        setIsDisabled(true);
      }, 900);
    } catch (error) {
      console.error("Error submitting data", error);
      setSpinnerLoading(true);
    }
  };

  return !isLoading ? (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between">
        <div>
          <div className="flex gap-x-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-md">
              <AvatarFallback className="text-2xl font-medium">
                {fallbackAvatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <div className="flex gap-4 items-center ">
                <h1 className="text-2xl font-medium ">
                  <span className="capitalize">{user?.first_name}</span>{" "}
                  <span className="capitalize">{user?.last_name}</span>
                </h1>
                <span
                  className={`capitalize flex items-center gap-1 ${
                    user.active ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.active ? (
                    <Icon icon="solar:check-circle-linear" />
                  ) : (
                    <Icon icon="solar:shield-cross-linear" />
                  )}
                  {user.active ? "active" : "inactive"}
                </span>
              </div>
              <p className="text-slate-500">
                <a href="" className="text-blue-600/75">
                  {user?.email}
                </a>{" "}
                - <span className="capitalize">{user?.role}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="py-5 px-2 flex items-center gap-2">
              <Icon
                icon="solar:calendar-mark-line-duotone"
                color="grey"
                width="25"
                height="25"
              />
              {`Joined ${new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}`}
              {/* <Skeleton className={"w-40 h-3"} /> */}
            </div>
            {user.last_login && (
              <div className="py-5 px-2 flex items-center gap-2">
                <Icon
                  icon="solar:login-line-duotone"
                  color="gray"
                  width="25"
                  height="25"
                />
                {`Last login ${timeAgo(user.last_login)}`}
              </div>
            )}
          </div>
        </div>
        <div>
          <Button
            className={`md:p-4 px-2 py-3 flex items-center gap-2`}
            variant="outline"
            type="button"
            onClick={editData}
          >
            <Icon icon="solar:pen-2-line-duotone" width={18} height={18} />
            <p className="md:block hidden">Edit User</p>
          </Button>
        </div>
      </div>
      <hr className="w-full" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 gap-x-4">
        <div className="grid grid-cols-3 gap-x-10 gap-y-5">
          <div className="flex justify-between items-center md:col-span-1 col-span-3 self-start">
            <p className="font-medium">Personal Information</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => submitData(user._id, data))}
              className="space-y-6 md:col-span-2 col-span-3"
            >
              <section className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-slate-500">
                        First name
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
                    <FormItem className="flex-1">
                      <FormLabel className="text-slate-500">
                        Last name
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
              </section>
              <FormField
                name="email"
                render={() => (
                  <FormItem className="">
                    <FormLabel className="text-slate-500">Email</FormLabel>
                    <div className="inline-block w-full">
                      <FormControl>
                        <Input
                          value={user.email}
                          className="w-full"
                          disabled
                          type="email"
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
                  <FormItem className="">
                    <FormLabel className="text-slate-500">Role</FormLabel>
                    <div className="inline-block w-full">
                      <Select
                        name="role"
                        defaultValue={user.role}
                        disabled={isDisabled}
                        onValueChange={field.onChange}
                      >
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
                  <FormItem className="">
                    <FormLabel className="text-slate-500">Username</FormLabel>
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
                // eslint-disable-next-line no-unused-vars
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-slate-500">Status</FormLabel>
                    <div className="inline-block w-full">
                      <Select
                        name="active"
                        onValueChange={form.onChange}
                        value={field.value}
                        disabled={isDisabled}
                      >
                        <FormControl>
                          <>
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select a role to display" />
                            </SelectTrigger>
                            <SelectContent name="active">
                              <SelectItem value={false}>Active</SelectItem>
                              <SelectItem value={true}>Inactive</SelectItem>
                            </SelectContent>
                          </>
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className={`flex justify-between ${isDisplayed}`}>
                <Button
                  className="p-4 flex items-center gap-2"
                  type="submit"
                  disabled={spinnerLoading}
                >
                  <p>Save Changes</p>
                  {spinnerLoading ? (
                    <Icons.spinner className="animate-spin w-5 h-5" />
                  ) : null}
                </Button>
                <Button
                  type="button"
                  className="p-4"
                  variant="destructive"
                  onClick={cancelEdit}
                >
                  Cancel Edit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 ">
        <div className="flex gap-x-4">
          <Skeleton className="h-20 w-20 rounded-full" />

          <div className="flex flex-col justify-center">
            <div className="flex gap-4 items-center mb-2">
              <Skeleton className="h-8 w-48 " />

              <Skeleton className="w-16 h-4" />
            </div>
            <div className="text-slate-500">
              <div className="flex items-center gap-3">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="py-5 px-2 flex items-center gap-2">
            <Skeleton className={"w-40 h-3"} />
          </div>
          <div className="py-5 px-2 flex items-center gap-2">
            <Skeleton className={"w-40 h-3"} />
          </div>
        </div>
      </div>
      <hr className="w-full" />
      <div className="py-20 flex items-center justify-center w-full">
        <Icons.spinner className="animate-spin w-7 h-7" />
      </div>
    </div>
  );
}
