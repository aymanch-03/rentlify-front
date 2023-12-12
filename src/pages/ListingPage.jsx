import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BookingBox from "../components/ProductPage/bookProduct";
import Pictures from "../components/ProductPage/pics";
import ProductDetails from "../components/ProductPage/productDetails";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { GetListing } from "../redux/reducers/listingSlice";

export default function ListingPage() {
  const dispatch = useDispatch();
  const listing = useSelector((state) => state.listings.listing);
  const customer = useSelector((state) => state.authCustomer.customer);
  const ownListing = listing.listing_owner?._id === customer._id;
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const currentUrl = window.location.href;

    const textArea = document.createElement("textarea");
    textArea.value = currentUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
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
    <div className="px-4 lg:px-8 max-w-7xl mx-auto py-10">
      <div className="flex items-center justify-between mb-10">
        {" "}
        <Link to="/discover/listings" className="group flex items-center gap-2">
          <Icon
            icon="solar:arrow-left-line-duotone"
            className="group-hover:mr-2 h-4 w-4 transition-all"
          />
          <span className="font-medium text-sm">Back to Listings</span>
        </Link>{" "}
        {ownListing && (
          <Button variant="outline">
            <Link
              to={`/hosting/listing/update/${listing._id}`}
              className="flex items-center gap-2"
            >
              <Icon icon="solar:pen-2-line-duotone" className="w-5 h-5" />
              <span className="font-medium text-sm">Edit your listing</span>
            </Link>
          </Button>
        )}
      </div>
      {!isLoading ? (
        <div className="mb-5">
          <div className="flex md:flex-row flex-col-reverse items-center justify-between">
            <h1 className="font-medium text-left md:text-3xl text-2xl capitalize">
              {listing.listing_name}
            </h1>
            <h1
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
            </h1>
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
      <div className="h-full w-full lg:grid gap-8 grid-cols-12">
        <ProductDetails listing={listing} isLoading={isLoading} />
        <div className="w-full col-span-5">
          <div className="w-full pt-0 sticky top-20">
            <BookingBox id={id} listing={listing} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
