/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { orderStatuses } from "../../data/data";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const RequestItem = ({ order, listing, acceptRequest, declineRequest }) => {
  const status = orderStatuses.find((status) => status.label === order.status);

  const formatDate = (dateString) => moment(dateString).format("MMM Do");

  const { date_from, date_to } = order.order_item;
  const { first_name, last_name } = order.customer_id;
  const formattedDateFrom = formatDate(date_from);
  const formattedDateTo = formatDate(date_to);

  return (
    <div className="grid grid-cols-8 place-items-center overflow-hidden text-sm p-2 rounded-md">
      <Link
        to={`/discover/listings/${listing._id}`}
        className="col-span-3 flex justify-start w-full items-stretch gap-5 h-full group"
      >
        <img
          src={listing.listing_image[0]}
          alt=""
          className="rounded-md object-cover aspect-square w-[70px]"
        />
        <div className="flex flex-col h-full justify-between">
          <p className="font-medium max-w-[275px] truncate text-lg first-letter:capitalize group-hover:underline">
            {listing.listing_name}
          </p>
          <p className="truncate max-w-[275px] font-light text-sm first-letter:capitalize">
            {listing.short_description}
          </p>
        </div>
      </Link>
      <div className="text-xs italic">
        Request by{" "}
        <span className="underline capitalize font-medium">{first_name}</span>{" "}
        <span className="underline capitalize font-medium">{last_name}</span>
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
            order.order_item.total_price
          )}{" "}
          MAD{" "}
        </p>
      </div>

      {order.status === "Pending" ? (
        <div className="flex items-center justify-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={acceptRequest}>
                <Icon
                  icon="lucide:check"
                  className="h-5 w-5 text-green-600 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-green-600 text-green-600">
                <p>Accept</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={declineRequest}>
                <Icon
                  icon="lucide:x"
                  className="h-5 w-5 text-destructive cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-destructive text-destructive">
                <p>Decline</p>
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

const BookingRequests = ({
  customer,
  orders,
  listings,
  acceptRequest,
  declineRequest,
  isLoading,
}) => {
  const customerListings = listings.filter(
    (listing) => listing.listing_owner?._id === customer._id
  );

  const listingsFromOrders = orders.map((order) => {
    const listing = listings.find(
      (listing) => listing._id === order.order_item.listing_id
    );
    return { listing, order };
  });

  const acceptedRequests = orders
    .map((order) => {
      const listing = listings.find(
        (listing) => listing._id === order.order_item.listing_id
      );
      return { listing, order };
    })
    .filter((request) => request.order.status === "Paid");

  const declinedRequests = orders
    .map((order) => {
      const listing = listings.find(
        (listing) => listing._id === order.order_item.listing_id
      );
      return { listing, order };
    })
    .filter((request) => request.order.status === "Canceled");
  return (
    <div className="mb-12 mt-2 overflow-hidden">
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="gap-2 w-full md:gap-5 bg-transparent justify-start overflow-x-auto overflow-y-hidden listings-overflow">
          <TabsTrigger
            value="orders"
            disabled={!orders.length}
            className="font-normal hover:border-violet-300 text-black"
          >
            All Requests ({orders.length})
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            disabled={!acceptedRequests.length}
            className="font-normal hover:border-violet-300 text-black"
          >
            Accepted Requests ({acceptedRequests.length})
          </TabsTrigger>
          <TabsTrigger
            value="declined"
            disabled={!declinedRequests.length}
            className="font-normal hover:border-violet-300 text-black"
          >
            Declined Requests ({declinedRequests.length})
          </TabsTrigger>
        </TabsList>

        <section className="w-full  border my-5 rounded-md p-2.5 overflow-x-auto listings-overflow">
          {orders.length !== 0 ? (
            !isLoading ? (
              <>
                <TabsContent
                  value="orders"
                  className="m-0 flex flex-col gap-3 min-w-[950px]"
                >
                  {listingsFromOrders.map(({ listing, order }, index) => {
                    return (
                      <RequestItem
                        key={index}
                        listing={listing}
                        order={order}
                        acceptRequest={() => acceptRequest(order._id)}
                        declineRequest={() => declineRequest(order._id)}
                      />
                    );
                  })}
                </TabsContent>
                <TabsContent
                  value="accepted"
                  className="m-0 flex flex-col gap-3 min-w-[950px]"
                >
                  {acceptedRequests.map(({ listing, order }, index) => (
                    <RequestItem key={index} listing={listing} order={order} />
                  ))}
                </TabsContent>
                <TabsContent
                  value="declined"
                  className="m-0 flex flex-col gap-3 min-w-[950px]"
                >
                  {declinedRequests.map(({ listing, order }, index) => (
                    <RequestItem key={index} listing={listing} order={order} />
                  ))}
                </TabsContent>
              </>
            ) : (
              <>
                <div className="flex items-center gap-5 p-2">
                  <Skeleton className={"aspect-square h-[70px]"} />
                  <Skeleton className={"w-full h-[70px]"} />
                </div>
                <div className="flex items-center gap-5 p-2">
                  <Skeleton className={"aspect-square h-[70px]"} />
                  <Skeleton className={"w-full h-[70px]"} />
                </div>
              </>
            )
          ) : (
            <section className="text-slate-500 p-4 flex-col flex items-center justify-center gap-4">
              <div className="flex-col flex items-center justify-center gap-1.5">
                <Icon
                  icon="solar:bill-cross-line-duotone"
                  className="w-8 h-8"
                />
                <p className="text-xs font-light">No Requests available yet.</p>
              </div>
            </section>
          )}
        </section>
      </Tabs>
    </div>
  );
};

export default BookingRequests;
