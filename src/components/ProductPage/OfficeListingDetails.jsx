import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetListing } from "../../redux/reducers/listingSlice";
import Pictures from "../ProductPage/pics";
import ProductDetails from "../ProductPage/productDetails";
import RemoveListing from "../products/DeleteListing";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function OfficeListingDetails() {
  const dispatch = useDispatch();
  const listing = useSelector((state) => state.listings.listing);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    try {
      dispatch(GetListing(id));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  }, [dispatch, id]);

  return (
    <div className="container mx-auto sm:p-8 p-4">
      <div className="flex items-center justify-between mb-10">
        {" "}
        <Link to="/office/listings" className="group flex items-center gap-2">
          <Icon
            icon="solar:arrow-left-line-duotone"
            className="group-hover:mr-2 h-4 w-4 transition-all"
          />
          <span className="font-medium text-sm">Back to Listings</span>
        </Link>{" "}
        <Button variant="outline">
          <Link
            to={`/office/listings/update-listing/${listing._id}`}
            className="flex items-center gap-2"
          >
            <Icon icon="solar:pen-2-line-duotone" className="w-5 h-5" />
            <span className="font-medium text-sm">Edit Listing</span>
          </Link>
        </Button>
      </div>
      {!isLoading ? (
        <div className="mb-5">
          <div className="flex md:flex-row flex-col-reverse items-center justify-between">
            <h1 className="font-medium capitalize md:text-3xl text-2xl">
              {listing.listing_name}
            </h1>
            {/* <h1
              className={`flex items-center gap-1 cursor-pointer hover:text-black text-slate-600 ${
                isCopied ? "text-green-500 transition-colors" : ""
              }`}
              onClick={handleCopyClick}
            >
              <Icon
                icon={isCopied ? "lucide:check" : "fluent:copy-20-regular"}
                className="h-5 w-5"
              />
              <span className="text-sm underline">
                {isCopied ? "Copied" : "Copy Link"}
              </span>
            </h1> */}
          </div>
          <h5 className="text-base flex items-center capitalize">
            <Icon icon="solar:map-point-line-duotone" className="h-5 w-5" />
            <p className="p-2">
              <span className="capitalize underline">{listing.province}</span>
              {", "}
              <span className="capitalize underline">{listing.city}</span>
            </p>
          </h5>
        </div>
      ) : (
        <div className="mb-5 flex flex-col gap-3">
          <Skeleton className={"md:w-[45rem] w-full h-10"} />
          <div className="flex gap-2">
            <Skeleton className={"w-[150px] h-7"} />
            <Skeleton className={"w-[150px] h-7"} />
          </div>
        </div>
      )}
      <Pictures listing={listing} isLoading={isLoading} />
      <div className="">
        <ProductDetails listing={listing} isLoading={isLoading} />
      </div>
      <div className="flex items-center justify-end mt-3 mb-8">
        <RemoveListing id={listing._id} listing={listing} />
      </div>
    </div>
  );
}
