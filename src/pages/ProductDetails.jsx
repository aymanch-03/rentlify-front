/* eslint-disable no-unused-vars */
// import { useState } from 'react';
// import { StarIcon } from '@heroicons/react/20/solid';
// import { RadioGroup } from '@headlessui/react';
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetListing } from "../redux/reducers/listingSlice";
// import UpdateProductDialog from "../components/products/UpdatEProductDialog";
import { Dialog } from "@/components/ui/dialog";
import { PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function ListingPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(GetListing(id));
  }, [dispatch, id]);
  const listing = useSelector((state) => state.listings.listing);
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-800 hover:text-gray-600"
              >
                Product Overview
              </a>
            </li>
          </ol>
        </nav>
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={listing.listing_image}
              alt={listing.listing_name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* listing info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {listing.listing_name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="">listing information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {listing.long_description}
            </p>

            <form className="mt-10">
              <Link to={`/office/listings/update-listing/${id}`}>
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <Dialog>
                    <PackagePlus className="w-4 mr-2" />
                    Update Product
                  </Dialog>
                </button>
              </Link>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {listing.short_description}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">product.details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
