import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BookingBox from "../components/ProductPage/bookProduct";
import Pictures from "../components/ProductPage/pics";
import ProductDetails from "../components/ProductPage/productDetails";
import { Button } from "../components/ui/button";
import { GetListing } from "../redux/reducers/listingSlice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const listing = useSelector((state) => state.listings.listing);
  const customer = useSelector((state) => state.authCustomer.customer);
  const ownListing = listing.listing_owner?._id === customer._id;

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
      <div className="mb-5">
        <h1 className="font-medium text-3xl">{listing.listing_name}</h1>
        <h5 className="text-base flex items-center capitalize">
          <Icon icon="solar:map-point-line-duotone" className="h-5 w-5" />
          <p className="p-2">
            <span className="capitalize underline">{listing.province}</span>
            {", "}
            <span className="capitalize underline">{listing.city}</span>
          </p>
        </h5>
      </div>
      <Pictures listing={listing} isLoading={isLoading} />
      <div className="lg:grid gap-8 grid-cols-12">
        <ProductDetails listing={listing} isLoading={isLoading} />
        <BookingBox id={id} listing={listing} isLoading={isLoading} />
      </div>
    </div>
  );
}
