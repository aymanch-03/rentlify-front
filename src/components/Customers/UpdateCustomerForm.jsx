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
import { updateCustomer } from "../../redux/reducers/customerSlice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Icons } from "../ui/icons";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  first_name: z.string().min(2).max(18),
  last_name: z.string().min(2).max(18),
});

export default function UpdateCustomerForm({
  customer,
  fallbackAvatar,
  isLoading,
}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisplayed, setIsDisplayed] = useState("hidden");
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      active: customer.active,
    },
  });

  useEffect(() => {
    form.reset({
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      active: customer.active,
    });
  }, [form, customer]);

  const editData = () => {
    setIsDisplayed("flex");
    setIsDisabled(false);

    form.setValue("first_name", customer.first_name, { shouldDirty: true });
    form.setValue("last_name", customer.last_name, { shouldDirty: true });
    form.setValue("email", customer.email, { shouldDirty: true });
    form.setValue("active", customer.active, { shouldDirty: true });
  };

  const cancelEdit = () => {
    setIsDisplayed("invisible");
    setIsDisabled(true);

    form.setValue("first_name", customer.first_name, { shouldDirty: false });
    form.setValue("last_name", customer.last_name, { shouldDirty: false });
    form.setValue("email", customer.email, { shouldDirty: false });
    form.setValue("active", customer.active, { shouldDirty: false });
  };

  // eslint-disable-next-line no-unused-vars
  const submitData = (id, data) => {
    try {
      const newCustomerData = form.getValues();
      const isDataChanged = Object.keys(newCustomerData).some(
        (key) => newCustomerData[key] !== customer[key]
      );

      if (!isDataChanged) {
        toast({
          variant: "default",
          description:
            "No changes made – your personal information is already current.",
        });
        return;
      }

      dispatch(updateCustomer({ id, newCustomerData }));
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
                  <span className="capitalize">{customer?.first_name}</span>{" "}
                  <span className="capitalize">{customer?.last_name}</span>
                </h1>
                <span
                  className={`capitalize flex items-center gap-1 ${
                    customer.active ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {customer.active ? (
                    <Icon icon="solar:check-circle-linear" />
                  ) : (
                    <Icon icon="solar:shield-cross-linear" />
                  )}
                  {customer.active ? "active" : "inactive"}
                </span>
              </div>
              <p className="text-slate-500">
                <span href="" className="text-blue-600/75">
                  {customer?.email}
                </span>
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
              {`Joined ${new Date(customer.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  year: "numeric",
                }
              )}`}
            </div>
            {customer.last_login && (
              <div className="py-5 px-2 flex items-center gap-2">
                <Icon
                  icon="solar:login-line-duotone"
                  color="gray"
                  width="25"
                  height="25"
                />
                {`Last login ${timeAgo(customer.last_login)}`}
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
            <p className="md:block hidden">Edit Customer</p>
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
              onSubmit={form.handleSubmit((data) => {
                submitData(customer._id, data);
              })}
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
                            placeholder={customer.first_name}
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
                            placeholder={customer.last_name}
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
                          value={customer.email}
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
                name="active"
                // eslint-disable-next-line no-unused-vars
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-slate-500">Status</FormLabel>
                    <div className="inline-block w-full">
                      <Select
                        name="active"
                        value={customer.active}
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
