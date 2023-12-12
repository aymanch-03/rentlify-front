import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthListings from "../components/CustomerProfile/AuthListings";
import BookingRequests from "../components/CustomerProfile/BookingRequests";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";
import { ListListings } from "../redux/reducers/listingSlice";
import {
  listHostOrders,
  updateOrderStatus,
} from "../redux/reducers/orderSlice";

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.authCustomer.customer);
  useEffect(() => {
    dispatch(ListListings());
    dispatch(listHostOrders());
  }, [dispatch]);
  const listings = useSelector((state) => state.listings.data);
  const orders = useSelector((state) => state.orders.hostOrders);
  const isLoading = useSelector((state) => state.orders.isLoading);

  const acceptRequest = async (id) => {
    try {
      const result = await dispatch(
        updateOrderStatus({ id, newOrderStatus: { status: "Paid" } })
      );

      if (result.payload._id) {
        return setTimeout(() => {
          toast({
            variant: "success",
            description: "Request accepted successfully",
          });
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
  const declineRequest = async (id) => {
    try {
      const result = await dispatch(
        updateOrderStatus({ id, newOrderStatus: { status: "Canceled" } })
      );

      if (result.payload._id) {
        return setTimeout(() => {
          toast({
            variant: "success",
            description: "Request declined successfully",
          });
        }, 800);
      } else {
        toast({
          variant: "destructive",
          description: "ERROR",
        });
      }
    } catch (error) {
      console.error("Error", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto lg:px-8 px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">
          Welcome{" "}
          <span className="relative whitespace-nowrap text-primary">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/60"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative animate-bounce text-violet-900">
              {customer.first_name.charAt(0).toUpperCase() +
                customer.first_name.slice(1)}
            </span>
          </span>{" "}
        </h1>
        <Link to={"/hosting/listing/add-listing"}>
          <Button className="p-3" variant="outline">
            <Icon icon="solar:home-add-line-duotone" className="w-5 h-5 mr-2" />
            Add Listing
          </Button>
        </Link>
      </div>
      <h1 className="mt-16 mb-5 font-medium capitalize text-xl">
        All booking requests
      </h1>
      <BookingRequests
        orders={orders}
        customer={customer}
        listings={listings}
        acceptRequest={acceptRequest}
        declineRequest={declineRequest}
      />
      <h1 className="mt-16 mb-5 font-medium capitalize text-xl">My Listings</h1>
      {listings.length > 0 && (
        <AuthListings
          listings={listings}
          customer={customer}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default CustomerProfile;
