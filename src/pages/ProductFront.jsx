import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BookingBox from "../components/ProductPage/bookProduct";
import Pictures from "../components/ProductPage/pics";
import ProductDetails from "../components/ProductPage/productDetails";
import { GetListing } from "../redux/reducers/listingSlice";

export default function ProductPage() {
  const listing = useSelector((state) => state.listings.listing);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const dispatch = useDispatch();
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
      <Link
        to="/discover/listings"
        className="group flex items-center gap-2 mb-10"
      >
        <Icon
          icon="solar:arrow-left-line-duotone"
          className="group-hover:mr-2 h-4 w-4 transition-all"
        />
        <span className="font-medium text-sm">Back Home</span>
      </Link>
      <Pictures listing={listing} isLoading={isLoading} />
      <div className="lg:grid grid-cols-12">
        <ProductDetails listing={listing} isLoading={isLoading} />
        <BookingBox id={id} listing={listing} isLoading={isLoading} />
      </div>
    </div>
  );
}
