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
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Icons } from "../components/ui/icons";
import { Skeleton } from "../components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { toast, useToast } from "../components/ui/use-toast";
import { orderStatuses } from "../data/data";
import { getProfile, updateProfile } from "../redux/reducers/customerSlice";
import { ListListings } from "../redux/reducers/listingSlice";
import { listOrders, updateOrderStatus } from "../redux/reducers/orderSlice";
const FormSchema = z.object({
  first_name: z.string().min(2).max(18),
  last_name: z.string().min(2).max(18),
});

const ReservationItem = ({ order, listing }) => {
  const status = orderStatuses.find((status) => status.label === order.status);
  const formatDate = (dateString) => moment(dateString).format("MMM Do");

  const { date_from, date_to } = order.order_item;
  const formattedDateFrom = formatDate(date_from);
  const formattedDateTo = formatDate(date_to);
  const dispatch = useDispatch();
  const cancelReservation = async (id) => {
    try {
      const result = await dispatch(
        updateOrderStatus({ id, newOrderStatus: { status: "Canceled" } })
      );

      if (result.payload._id) {
        return setTimeout(() => {
          toast({
            variant: "default",
            description:
              "Reservation canceled successfully. Refund is on its way.",
          });
          window.location.reload();
        }, 800);
      } else {
        toast({
          variant: "destructive",
          description: "ERROR",
        });
      }
    } catch (error) {
      console.error("Error ", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };
  return (
    <div className="grid grid-cols-7 place-items-center overflow-hidden text-sm p-2 rounded-md">
      <div className="col-span-3 flex justify-start w-full items-stretch gap-5 h-full group">
        <img
          src={listing?.listing_image[0]}
          alt=""
          className="rounded-md object-cover aspect-square w-[70px]"
        />
        <div className="flex flex-col h-full justify-between">
          <p className="font-medium max-w-[275px] truncate text-lg first-letter:capitalize group-hover:underline">
            {listing?.listing_name}
          </p>
          <p className="truncate max-w-[275px] font-light text-sm first-letter:capitalize">
            {listing?.short_description}
          </p>
        </div>
      </div>

      <div>
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
          )}
          <Badge
            variant="outline"
            className={`font-medium ${status.badgeStyles}`}
          >
            {status.label}
          </Badge>
        </div>
      </div>

      <div>
        <h1 className="font-light flex items-center justify-center gap-1">
          <span className="font-medium text-center">{formattedDateFrom}</span>
          <Icon
            icon="solar:double-alt-arrow-right-line-duotone"
            className="h-4 w-4 text-slate-700"
          />
          <span className="font-medium text-center">{formattedDateTo}</span>
        </h1>
      </div>
      <div>
        <p className="font-medium">
          {" "}
          {new Intl.NumberFormat("de-DE").format(
            order.order_item.total_with_fees
          )}{" "}
          MAD{" "}
        </p>
      </div>
      {order.status === "Pending" ? (
        <div className="flex items-center justify-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => cancelReservation(order._id)}>
                <Icon
                  icon="lucide:x"
                  className="h-5 w-5 text-destructive cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-destructive text-destructive">
                <p>Cancel Reservation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <Badge variant="outline">
          {order.status === "Paid" || order.status === "Closed"
            ? "Accepted"
            : "Declined"}
        </Badge>
      )}
    </div>
  );
};

const ProfileDetails = () => {
  const customer = useSelector((state) => state.customers.customer);

  const isLoading = useSelector((state) => state.authCustomer.isLoading);
  const listings = useSelector((state) => state.listings.data);
  const orders = useSelector((state) => state.orders.data);

  const customerReservations = orders
    .filter((order) => order.customer_id._id === customer._id)
    .map((order) => {
      const listing = listings.find(
        (listing) => listing._id === order.order_item.listing_id
      );
      return { listing, order };
    });
  const fullName = `${customer.first_name} ${customer.last_name}`;
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
    },
  });

  useEffect(() => {
    form.reset({
      first_name: customer.first_name,
      last_name: customer.last_name,
    });
  }, [form, customer, dispatch]);
  useEffect(() => {
    dispatch(getProfile());
    dispatch(listOrders());
    dispatch(ListListings());
  }, []);

  const editData = () => {
    setIsDisplayed("flex");
    setIsDisabled(false);

    form.setValue("first_name", customer.first_name, { shouldDirty: true });
    form.setValue("last_name", customer.last_name, { shouldDirty: true });
  };

  const cancelEdit = () => {
    setIsDisplayed("invisible");
    setIsDisabled(true);

    form.setValue("first_name", customer.first_name, { shouldDirty: false });
    form.setValue("last_name", customer.last_name, { shouldDirty: false });
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

      dispatch(updateProfile(newCustomerData));
      setSpinnerLoading(true);
      setTimeout(() => {
        setSpinnerLoading(false);
        toast({
          variant: "success",
          description: "Your information  updated successfully",
        });
        setIsDisplayed("invisible");
        setIsDisabled(true);
      }, 900);
    } catch (error) {
      console.error("Error submitting data", error);
      setSpinnerLoading(true);
    }
  };

  const [firstNameInitial, lastNameInitial] = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase());
  const fallbackAvatar = `${firstNameInitial}${lastNameInitial}`;
  return !isLoading ? (
    <div>
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex justify-between overflow-hidden">
        <div
          className="absolute left-0  -z-10 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-10 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-30 top-[210px]"
          aria-hidden="true"
        >
          <div
            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#9089FC] to-[#FF80B5]"
            style={{
              clipPath:
                "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
            }}
          />
        </div>
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
            <p className="md:block hidden">Edit</p>
          </Button>
        </div>
      </div>
      <hr className="w-full" />
      <Tabs
        defaultValue="reservations"
        className=" mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <TabsList className="gap-2 w-full md:gap-5 bg-transparent justify-start overflow-x-auto overflow-y-hidden listings-overflow">
          <TabsTrigger
            value="infos"
            className="rounded-none border-none font-medium  hover:border-violet-300 text-black"
          >
            Personal Infos
          </TabsTrigger>
          <TabsTrigger
            value="reservations"
            className="rounded-none border-none font-medium  hover:border-violet-300 text-black"
          >
            Reservertions
          </TabsTrigger>
        </TabsList>
        <section className="w-full  border my-5 rounded-md p-2.5 overflow-x-auto listings-overflow">
          <>
            <TabsContent value="infos" className="">
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
                            <FormLabel className="text-slate-500">
                              Email
                            </FormLabel>
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
            </TabsContent>
            <TabsContent
              value="reservations"
              className="m-0 flex flex-col gap-3 min-w-[750px]"
            >
              {customerReservations.map(({ listing, order }, index) => {
                if (listing?.listing_image) {
                  return (
                    <ReservationItem
                      key={index}
                      listing={listing}
                      order={order}
                    />
                  );
                }
              })}{" "}
            </TabsContent>
          </>
        </section>
      </Tabs>
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
};

export default ProfileDetails;
