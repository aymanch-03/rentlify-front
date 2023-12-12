/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListListings } from "../redux/reducers/listingSlice";
import { ListSubcategories } from "../redux/reducers/subcategorieSlice";
// import ProductDialog from '../components/products/addProductDialog';
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import ListingSkeleton from "../components/ui/listingSkeleton";

export default function Listings() {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.data);
  const isLoading = useSelector((state) => state.listings.isLoading);
  useEffect(() => {
    dispatch(ListListings());
    dispatch(ListSubcategories());
  }, [dispatch]);

  return (
    <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4 flex">
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Listings Management
          </h2>
          <p className="text-muted-foreground">
            {"Here's"} a list of all listings!
          </p>
        </div>
        <Link to={"add-listing"}>
          <Button className="p-4" variant="outline">
            <PackagePlus className="w-4 mr-2" />
            Add Listing
          </Button>
        </Link>
      </div>
      <main className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 lg:my-4 lg:py-4 py-2 overflow-auto">
        {isLoading ? (
          <>
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
            <ListingSkeleton />
          </>
        ) : (
          listings.map((listing, index) => (
            <Link
              key={index}
              to={`${listing._id}`}
              className="flex flex-col rounded-md overflow-hidden space-y-2"
            >
              <div className="rounded-xl overflow-hidden sm:h-[280px] h-[300px]">
                <img
                  src={listing.listing_image[0]}
                  className="object-cover w-full h-full"
                  alt={listing.listing_name}
                />
              </div>
              <h1 className="font-light text-sm flex items-center gap-2">
                <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
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
            </Link>
          ))
        )}
      </main>

      {/* <div className="py-1 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {listings.map((listing) => (
          <div key={listing._id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={listing.listing_image[0]}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link to={`${listing._id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {listing.listing_name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{listing.address}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {listing.price}DH
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
