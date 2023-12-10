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
  const customer = useSelector((state) => state.auth.customer);
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
    <div className="p-4 max-w-7xl mx-auto py-10">
      <div className="flex items-center justify-between mb-10">
        {" "}
        <Link to="/discover/listings" className="group flex items-center gap-2">
          <Icon
            icon="solar:arrow-left-line-duotone"
            className="group-hover:mr-2 h-4 w-4 transition-all"
          />
          <span className="font-medium text-sm">Back Home</span>
        </Link>{" "}
        {ownListing && (
          <Button variant="outline">
            <Link
              to={`/hosting/listing/update/${listing._id}`}
              className="flex items-center gap-2"
            >
              <span className="font-medium text-sm">Edit your listing</span>
            </Link>
          </Button>
        )}
      </div>
      <Pictures listing={listing} isLoading={isLoading} />
      <div className="lg:grid grid-cols-12">
        <ProductDetails listing={listing} isLoading={isLoading} />
        <BookingBox id={id} listing={listing} isLoading={isLoading} />
      </div>
    </div>
  );
}
