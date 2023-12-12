/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { GetListing } from "../redux/reducers/listingSlice";

const RequireOwnListing = ({ listing_id }) => {
  const customer = useSelector((state) => state.authCustomer.customer);
  const dispatch = useDispatch();
  const listing = useSelector((state) => state.listings.listing);
  const ownListing = listing.listing_owner?._id === customer._id;

  useEffect(() => {
    try {
      dispatch(GetListing(listing_id));
    } catch (error) {
      console.error("Error fetching :", error);
    }
  }, [dispatch, listing_id]);

  return customer && ownListing ? (
    <Outlet />
  ) : (
    <Navigate to="/discover/listings" />
  );
};
export default RequireOwnListing;
