/* eslint-disable react/prop-types */
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@iconify/react";
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { Separator } from "../ui/separator";

export default function ProductDetails({ listing, isLoading }) {
  const [open, setOpen] = useState(false);

  return !isLoading ? (
    <div className="col-span-7 pt-5">
      <div className="">
        <div className="text-lg font-medium flex items-center gap-2 mb-4">
          <Icon
            icon="solar:user-speak-rounded-line-duotone"
            className="w-6 h-6"
          />
          <h1>
            {" "}
            Hosted by{" "}
            <span className="underline capitalize">
              {listing.listing_owner.first_name}{" "}
            </span>{" "}
            <span className="underline capitalize">
              {listing.listing_owner.last_name}
            </span>{" "}
            <span className="font-light">
              ({" "}
              {`${new Date().getFullYear() -
                  new Date(listing.listing_owner.createdAt).getFullYear() >
                  0
                  ? `${new Date().getFullYear() -
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
            <span className="underline">{listing.max_guests} Guests</span> |
            <span className="underline">{listing.room} Rooms</span> |
            <span className="underline">{listing.bed} Beds</span>
          </h1>
        </div>
      </div>
      <Separator />
      <div
        className={`relative p-6 rounded-lg border mt-5 transition-all overflow-hidden  ${!open ? "h-[220px]" : "h-auto"
          }`}
      >
        {" "}
        <div className=" w-full flex justify-between items-center">
          <h1 className="text-xl font-medium ">About the Listing</h1>
          <div className=" w-fit p-4 bg-gradient-to-t from-white to-white/75">
            <h1
              className="font-medium text-primary flex items-center gap-2"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span>Show {open ? "Less" : "More"}</span>
              <Icon
                icon={
                  open ? "solar:alt-arrow-up-broken" : "solar:alt-arrow-down-broken"
                }
                className="h-5 w-5"
              />
            </h1>
          </div>
        </div>
        <p className="lg:w-full my-4">{listing.short_description}</p>
        <p className="w-full my-4">{listing.long_description}</p>
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-white to-transparent h-16"></div>
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
    <div className="col-span-7 gap-2">
      <div className="py-5 ">
        <Skeleton className="w-full md:w-[50%] h-8 my-1" />
        <Skeleton className="w-full md:w-[50%] h-8 my-1" />
        <Skeleton className="w-full md:w-[50%] h-8 my-1" />
      </div>
      <Separator />
      <Skeleton className="w-full h-[200px] mt-5 " />
    </div>
  );
}
