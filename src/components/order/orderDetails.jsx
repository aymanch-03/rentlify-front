import { Icon } from "@iconify/react";
import { format } from "date-fns";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { orderStatuses } from "../../data/data";
import { GetListing } from "../../redux/reducers/listingSlice";
import { getOrderById } from "../../redux/reducers/orderSlice";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const order = useSelector((state) => state.orders.order);
  const listing = useSelector((state) => state.listings.listing);
  const status = orderStatuses.find((status) => status.label === order.status);
  const listing_id = order?.order_item?.listing_id;
  // const customer_id = order?.customer_id;

  useEffect(() => {
    try {
      dispatch(getOrderById(id));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch, id]);
  useEffect(() => {
    try {
      dispatch(GetListing(listing_id));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [dispatch, listing_id]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4">
      <Link to="/office/orders" className="group flex items-center gap-2">
        <Icon
          icon="solar:arrow-left-line-duotone"
          className="group-hover:mr-2 h-4 w-4 transition-all"
        />
        <span className="font-medium text-sm">Back to reservations</span>
      </Link>{" "}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Reservation Details
        </h2>
      </div>
      {!isLoading ? (
        <div className="flex lg:flex-row flex-col-reverse gap-6">
          <div
            className="flex rounded-lg flex-1 border flex-col"
            ref={componentRef}
          >
            <div className="md:p-6 p-4">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-violet-800 text-lg font-medium ">
                  Listing Details
                </p>
                <Icon
                  icon="solar:arrow-to-down-left-line-duotone"
                  className="w-4 h-4"
                />
              </div>

              <div className="sm:flex-row flex flex-col gap-4 ">
                <Link
                  to={`/office/listings/${listing._id}`}
                  className="sm:w-[200px] aspect-square w-full rounded-md overflow-hidden sm:h-[180px] h-[200px]"
                >
                  <img
                    src={listing.listing_image[0]}
                    className="object-cover rounded-md w-full h-full"
                    alt={listing.listing_name}
                  />
                </Link>
                <div className="flex flex-col gap-2.5 justify-center">
                  <Link
                    to={`/office/listings/${listing._id}`}
                    className="font-medium text-xl"
                  >
                    {listing.listing_name}
                  </Link>
                  <h1 className="font-light text-base flex items-center gap-2">
                    {/* <Icon
                    icon="solar:map-point-line-duotone"
                    className="w-4 h-4"
                  /> */}
                    <span className="font-light">Location:</span>
                    <span className="font-medium underline">
                      {" "}
                      {listing?.province.charAt(0).toUpperCase() +
                        listing?.province.slice(1)}
                      ,{" "}
                      {listing?.city.charAt(0).toUpperCase() +
                        listing?.city.slice(1)}
                    </span>
                  </h1>
                  <h1 className="text-base font-light flex items-center gap-2">
                    {/* <Icon icon="solar:user-linear" className="w-4 h-4" /> */}
                    <Link
                      to={`/office/customers/${listing.listing_owner._id}`}
                      className="font-light"
                    >
                      Host:{" "}
                      <span className="underline capitalize font-medium">
                        {" "}
                        {listing.listing_owner.first_name}
                      </span>{" "}
                      <span className="underline capitalize font-medium">
                        {listing.listing_owner.last_name}
                      </span>
                    </Link>
                  </h1>
                  <h1 className="font-light text-base flex items-center gap-2">
                    <span className="font-light">Maximum N˚ of Guests:</span>

                    <span className="font-medium underline">
                      {listing.max_guests} Guests
                    </span>
                  </h1>

                  <h1 className="font-medium text-xl">
                    {listing.price} MAD
                    <span className="font-light text-xs"> /night</span>
                  </h1>
                </div>
              </div>
            </div>
            <hr className="max-w-full" />
            <div className="md:p-6 p-4">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-violet-800 text-lg font-medium ">
                  Reservation Details
                </p>
                <Icon
                  icon="solar:arrow-to-down-left-line-duotone"
                  className="w-4 h-4"
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <div className="flex gap-4 lg:justify-normal justify-between">
                  <p className="font-light text-base  ">Made by:</p>
                  <p className="font-medium text-md ">
                    <span>
                      {order?.customer_id.first_name}{" "}
                      {order?.customer_id.last_name}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 lg:justify-normal justify-between">
                  <p className="font-light text-base  ">Check-in:</p>
                  <p className="font-medium text-md ">
                    {format(
                      new Date(order?.order_item.date_from),
                      "LLLL dd, y"
                    )}
                  </p>
                </div>
                <div className="flex gap-4 lg:justify-normal justify-between">
                  <p className="font-light text-base  ">Check-out:</p>
                  <p className="font-medium text-md">
                    {format(new Date(order?.order_item.date_to), "LLLL dd, y")}
                  </p>
                </div>
                <div className="flex gap-4 lg:justify-normal justify-between">
                  <p className="font-light text-base  ">Total nights:</p>
                  <p className="font-medium text-md">
                    {order?.order_item.days}{" "}
                    {order?.order_item.days > 1 ? "nights" : "night"}
                  </p>
                </div>
              </div>
            </div>
            <hr className="max-w-full" />
            <div className="md:p-6 p-4">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-violet-800 text-lg font-medium ">
                  Payement Details
                </p>
                <Icon
                  icon="solar:arrow-to-down-left-line-duotone"
                  className="w-4 h-4"
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <div className="flex gap-4 lg:justify-normal justify-between">
                  <p className="font-light text-base  ">Subtotal:</p>
                  <p className="font-medium text-md ">
                    {new Intl.NumberFormat("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(order.order_item.total_price)}{" "}
                    MAD{" "}
                  </p>
                </div>
                <div className="flex gap-4 lg:justify-normal justify-between">
                  <p className="font-light text-base  ">
                    Rentlify service fee:
                  </p>
                  <p className="font-medium text-md">
                    {new Intl.NumberFormat("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      order?.order_item.total_with_fees -
                        order?.order_item.total_price
                    )}{" "}
                    MAD{" "}
                  </p>
                </div>
                <div className="flex gap-4 lg:justify-normal justify-between">
                  <p className="font-light text-base  ">Total:</p>
                  <p className="font-medium text-md">
                    {new Intl.NumberFormat("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(order.order_item.total_with_fees)}{" "}
                    MAD{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[350px] w-full">
            <div className="flex flex-col gap-8">
              <div className="w-full flex gap-x-4 bg-slate-50/80 flex-col bg-slate  border rounded-lg shadow-sm ">
                <div className="p-6">
                  <h1 className="font-medium mb-1.5">Amount</h1>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">
                      {" "}
                      {new Intl.NumberFormat("de-DE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(order.order_item.total_with_fees)}{" "}
                      MAD{" "}
                    </p>
                    <div className="flex w-[100px] items-center justify-end">
                      <Badge
                        variant="outline"
                        className={`font-medium  ${status.badgeStyles}`}
                      >
                        {status.label}
                      </Badge>
                    </div>{" "}
                  </div>
                </div>
                <Separator />
                <div className="p-6 flex flex-col gap-4">
                  <Link
                    to={`/office/customers/${order.customer_id._id}`}
                    className="flex items-center gap-2"
                  >
                    <Icon
                      icon="solar:user-bold-duotone"
                      className="h-5 w-5 text-gray-500"
                    />
                    <h1 className="pt-0.5 font-medium">
                      <span className="capitalize ">
                        {order.customer_id.first_name}
                      </span>{" "}
                      <span className="capitalize ">
                        {order.customer_id.last_name}
                      </span>
                    </h1>
                  </Link>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:calendar-bold-duotone"
                      className="h-5 w-5 text-gray-500"
                    />
                    <h1 className="text-black/50 pt-0.5">
                      {moment(order.createdAt).format("MMM Do, YYYY")}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="solar:card-bold-duotone"
                      className="h-5 w-5 text-gray-500"
                    />
                    <h1 className="text-black/50 pt-0.5">
                      Paid with Credit Card
                    </h1>
                  </div>
                </div>
                <Separator />
                <div className="p-6 flex flex-col gap-4">
                  <Button onClick={handlePrint}>
                    Print reservation details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex lg:flex-row flex-col-reverse gap-6">
          <Skeleton className="flex rounded-lg flex-1 border flex-col min-h-[655px] w-full" />

          <div className="lg:w-[350px] w-full">
            <Skeleton className={"h-[348px]"} />
          </div>
        </div>
      )}
    </div>
  );
}
