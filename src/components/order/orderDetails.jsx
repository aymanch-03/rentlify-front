import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../redux/reducers/orderSlice";
import { GetListing } from "../../redux/reducers/listingSlice";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getCustomer } from "../../redux/reducers/customerSlice";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";


export default function OrderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const order = useSelector((state) => state.orders.order);
    const listing = useSelector((state) => state.listings.listing);
    const customer = useSelector((state) => state.customers.customer);
    console.error("order:", order);


    const fullName = customer ? `${customer.first_name} ${customer.last_name}` : "";
    const [firstNameInitial, lastNameInitial] = fullName
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase());
    const fallbackAvatar = `${firstNameInitial}${lastNameInitial}`;


    const listing_id = order?.order_item?.listing_id;
    const customer_id = order?.customer_id
    console.log("listing_id: ", listing_id);

    let status_color;
    switch ( order.status) {
        case 'Pending':
            status_color = 'bg-yellow-200 border-yellow-200';
          break;
        case 'Closed':
            status_color = 'bg-slate-200 border-slate-200';
          break;
        case 'Paid':
            status_color = 'bg-green-200 border-green-200';
          break;
        case 'Canceled':
            status_color = 'bg-red-200 border-red-200';
          break;
    }
    useEffect(() => {
        try {
            dispatch(getOrderById(id));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [dispatch, id]);
    useEffect(() => {
        try {
            dispatch(GetListing(listing_id))
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [dispatch, listing_id]);
    useEffect(() => {
        try {
            dispatch(getCustomer(customer_id))
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    }, [dispatch, customer_id]);

    return !isLoading ? (
        <div className="container h-full flex-col space-y-8 sm:p-8 flex">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Orders Details
                </h2>

            </div>
            <div className="grid grid-cols-12">
                <div className="lg:pl-20 col-span-8 flex flex-col">
                    <div className="w-full flex flex-col gap-3">
                        <p className="text-muted-foreground text-xl">
                            Listing
                        </p>
                        <div className="flex gap-4 justify-center ">
                            <div className="w-[200px] rounded-xl overflow-hidden sm:h-[180px] h-[200px]">
                                <img
                                    src={listing.listing_image[0]}
                                    className="object-cover w-full h-full"
                                    alt={listing.listing_name}
                                />
                            </div>
                            <div className="w-1/3 p-4 flex flex-col gap-4 justify-center">
                                <h1 className="font-light text-sm flex items-center gap-2">
                                    <Icon
                                        icon="solar:map-point-line-duotone"
                                        className="w-4 h-4"
                                    />
                                    <span>
                                        {listing?.province.charAt(0).toUpperCase() +
                                            listing?.province.slice(1)}
                                        ,{" "}
                                        {listing?.city.charAt(0).toUpperCase() +
                                            listing?.city.slice(1)}
                                    </span>
                                </h1>
                                <h1 className="font-light text-sm flex items-center gap-2">
                                    <Icon icon="solar:user-linear" className="w-4 h-4" />
                                    <p>
                                        Hosted by{" "}
                                        <span className="underline capitalize font-medium">
                                            {" "}
                                            {listing.listing_owner.first_name}
                                        </span>{" "}
                                        <span className="underline capitalize font-medium">
                                            {listing.listing_owner.last_name}
                                        </span>
                                    </p>
                                </h1>
                                <h1 className="font-light text-sm flex items-center gap-2">
                                    <Icon
                                        icon={
                                            listing.max_guests > 2
                                                ? "solar:users-group-two-rounded-line-duotone"
                                                : "solar:users-group-rounded-line-duotone"
                                        }
                                        className="w-4 h-4"
                                    />

                                    <span>{listing.max_guests} Guests</span>
                                </h1>

                                <h1 className="font-medium text-xl">
                                    {listing.price} MAD
                                    <span className="font-light text-xs"> /night</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <hr className="max-w-full w-[90%] w-full my-6 p-1" />
                    <div>
                        <p className="text-muted-foreground text-xl">
                            Duration
                        </p>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="flex gap-4 w-[450px]">
                                <p className="font-medium text-md w-24 text-right">
                                CHECK-IN :
                                </p>
                                <p className="font-medium text-md ">{format(new Date(order?.order_item.date_from), "LLL dd, y")}</p>
                            </div>
                            <div className="flex gap-4 w-[450px]">
                                <p className="font-medium text-md w-24 text-right">
                                CHECKOUT :
                                </p>
                                <p className="font-medium text-md">{format(new Date(order?.order_item.date_to), "LLL dd, y")}</p>
                            </div>
                            <div className="flex gap-4 w-[450px]">
                                <p className="font-medium text-md w-24 text-right">
                                Total Days :
                                </p>
                                <p className="font-medium text-md">{order?.order_item.days}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="max-w-full w-[90%] w-full my-6 p-1" />
                    <div className="w-full flex flex-col gap-3">
                        <p className="text-muted-foreground text-xl">
                            Price
                        </p>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="flex justify-between w-[450px]">
                                <p className="font-medium text-md">
                                    Subtotal
                                </p>
                                <p className="font-medium text-md">{order?.order_item.total_price} MAD</p>
                            </div>
                            <div className="flex justify-between w-[450px]">
                                <p className="font-medium text-md">
                                    Rentlify service fee
                                </p>
                                <p className="font-medium text-md">{((order?.order_item.total_with_fees) - (order?.order_item.total_price)).toFixed(2)} MAD</p>
                            </div>
                            <div className="flex justify-between w-[450px]">
                                <p className="font-medium text-md">
                                    Total
                                </p>
                                <p className="font-medium text-md">{order?.order_item.total_with_fees} MAD</p>
                            </div>
                        </div>
                    </div>
                </div>
                {customer && <div className="col-span-4">
                    <div className="flex flex-col gap-8 p-10">
                        <div className="w-full flex gap-x-4 flex-col items-center">
                            <div className={`flex items-center justify-center w-full h-[80px] rounded-2xl shadow-md ${status_color}`}>
                                <p className="text-2xl">
                                    {order?.status}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex gap-x-4 flex-col items-center border rounded-3xl shadow-sm p-10">
                            <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                                <AvatarFallback className="text-2xl font-medium">
                                    {fallbackAvatar}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center items-center gap-2 p-2">
                                <p className="text-muted-foreground taxt-xl">
                                    Customer
                                </p>
                                <div className="flex flex-col items-center ">
                                    <h1 className="text-2xl font-medium">
                                        <span className="capitalize">{customer?.first_name}</span>{" "}
                                        <span className="capitalize">{customer?.last_name}</span>
                                    </h1>
                                </div>
                                <p className="text-slate-500 text-center">
                                    <a href="" className="text-blue-600/75">
                                        {customer?.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    ) : (
        <div>

        </div>
    )
}