/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@iconify/react";
// eslint-disable-next-line no-unused-vars
import { useDispatch } from "react-redux";
import { Separator } from "../ui/separator";

export default function ProductDetails({ listing, isLoading }) {
  const category = listing.category_id;
  return !isLoading ? (
    <div className="col-span-7 py-5">
      <div className="">
        {/* <div className="flex items-center w-fit m-1 py-2 px-4 rounded-xl shadow-md text-sm">
          <Icon className="w-9" icon={category.category_icon} color="#9fa2a4" />
          {category.category_name}
        </div> */}
        <div className="text-lg font-medium flex items-center gap-2 mb-4">
          <Icon
            icon="solar:user-speak-rounded-line-duotone"
            className="w-6 h-6"
          />
          <h1>
            {" "}
            Hosted by{" "}
            <span className="underline">
              {listing.listing_owner.first_name}{" "}
            </span>{" "}
            <span className="underline">{listing.listing_owner.last_name}</span>{" "}
            <span className="font-light">
              ({" "}
              {`${
                new Date().getFullYear() -
                  new Date(listing.listing_owner.createdAt).getFullYear() >
                0
                  ? `${
                      new Date().getFullYear() -
                      new Date(listing.listing_owner.createdAt).getFullYear()
                    } Years of hosting`
                  : "Recent in hosting "
              }`}
              )
            </span>
          </h1>
        </div>
        <div className="text-lg font-medium flex items-center gap-2 mb-4">
          <Icon icon={listing.category_id.category_icon} className="w-6 h-6" />
          <h1>
            {" "}
            Category :{" "}
            <span className="underline">
              {listing.category_id.category_name}{" "}
            </span>{" "}
          </h1>
        </div>
        <div className="text-lg font-medium flex items-center gap-2 mb-4">
          <Icon icon="solar:bed-line-duotone" className="w-6 h-6" />
          <h1 className="flex items-center gap-2">
            <span className="underline">{listing.room} Rooms</span> |
            <span className="underline">{listing.bed} Beds</span>{" "}
          </h1>
        </div>
      </div>
      <Separator />
      <div className="p-6 rounded-lg border mt-5">
        {" "}
        <h1 className="text-xl font-medium ">About the Listing</h1>
        <p className="lg:w-full my-4">{listing.short_description}</p>
        <p className="w-full my-4">{listing.long_description}</p>
      </div>
      {/* <Button
        variant="ghost"
        className="flex gap-1 group hover:bg-transparent text-[#318ed3] hover:text-[#318ed3]"
      >
        See more
        <Icon
          icon="solar:arrow-right-line-duotone"
          className=" group-hover:ml-2 transition-all"
        />
      </Button> */}
    </div>
  ) : (
    <div className="p-4 col-span-7 h-[100vh] gap-2">
      <Skeleton className="w-[80%] h-10 my-4" />

      <Skeleton className="w-[30%] h-6 my-2" />

      <Skeleton className="w-[50%] h-6 my-2" />

      <Skeleton className="w-[50%] h-6 my-2" />
    </div>
  );
}
