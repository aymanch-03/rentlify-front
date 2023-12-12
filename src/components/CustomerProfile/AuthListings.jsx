/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { customerStatuses, listingLabels } from "../../data/data";
import RemoveListing from "../products/DeleteListing";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ListingItem = ({ listing }) => {
  const label = listingLabels.find((label) => label.value === listing.status);
  const status = customerStatuses.find(
    (status) => status.value === listing.active
  );

  return (
    <div
      key={listing._id}
      className="grid grid-cols-7 place-items-center overflow-hidden text-sm p-2 rounded-md"
    >
      <Link
        to={`/discover/listings/${listing._id}`}
        className="col-span-3 group flex justify-start w-full items-stretch gap-5 h-full"
      >
        <img
          src={listing.listing_image[0]}
          alt=""
          className="rounded-md object-cover aspect-square w-[70px]"
        />
        <div className="flex flex-col h-full justify-between">
          <p className="font-medium max-w-[350px] truncate group-hover:underline text-lg first-letter:capitalize">
            {listing.listing_name}
          </p>
          <p className="truncate max-w-[275px] font-light text-sm first-letter:capitalize">
            {listing.short_description}
          </p>
        </div>
      </Link>
      <div>
        <div className="flex space-x-2">
          {label && (
            <Badge
              variant="outline"
              className={`font-medium ${label.badgeStyles}`}
            >
              {label.label}
            </Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {listing.status}
          </span>
        </div>
      </div>
      <div>
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
          )}
          <Badge
            variant="outline"
            className={`font-medium ${status.badgeColor}`}
          >
            {status.label}
          </Badge>
        </div>
      </div>
      <div>
        <p className="font-medium">
          {new Intl.NumberFormat("de-DE").format(listing.price)} MAD{" "}
          <span className="text-xs font-light">/night</span>
        </p>
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <RemoveListing id={listing._id} listing={listing} />
        <Link to={`/hosting/listing/update/${listing._id}`}>
          <Icon icon="solar:pen-line-duotone" />
        </Link>
      </div>
    </div>
  );
};

const AuthListings = ({ customer, listings, isLoading }) => {
  const customerListings = listings.filter(
    (listing) => listing.listing_owner?._id === customer._id
  );

  const activeListings = customerListings.filter((listing) => listing.active);
  const availableListings = customerListings.filter(
    (listing) => listing.status
  );

  return (
    <div className="mb-12 mt-2 overflow-hidden">
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="gap-2 w-full md:gap-5 bg-transparent justify-start overflow-x-auto overflow-y-hidden listings-overflow">
          <TabsTrigger
            value="listings"
            disabled={!customerListings.length}
            className="font-normal hover:border-violet-300 text-black"
          >
            All Listings ({customerListings.length})
          </TabsTrigger>
          <TabsTrigger
            value="active"
            disabled={!customerListings.length}
            className="font-normal hover:border-violet-300 text-black"
          >
            Active Listings ({activeListings.length})
          </TabsTrigger>
          <TabsTrigger
            value="available"
            disabled={!customerListings.length}
            className="font-normal hover:border-violet-300 text-black"
          >
            Available Listings ({availableListings.length})
          </TabsTrigger>
        </TabsList>
        <section className="w-full  border my-5 rounded-md p-2.5 overflow-x-auto listings-overflow">
          {customerListings.length !== 0 ? (
            !isLoading ? (
              <>
                <TabsContent
                  value="listings"
                  className="m-0 flex flex-col gap-3 min-w-[950px]"
                >
                  {customerListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
                </TabsContent>
                <TabsContent
                  value="active"
                  className="m-0 flex flex-col gap-3 min-w-[750px]"
                >
                  {activeListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
                </TabsContent>
                <TabsContent
                  value="available"
                  className="m-0 flex flex-col gap-3 min-w-[750px]"
                >
                  {availableListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
                </TabsContent>
              </>
            ) : (
              <>
                <div className="flex items-center gap-5 p-2">
                  <Skeleton className={"aspect-square h-[70px]"} />
                  <Skeleton className={"w-full h-[70px]"} />
                </div>
                <div className="flex items-center gap-5 p-2">
                  <Skeleton className={"aspect-square h-[70px]"} />
                  <Skeleton className={"w-full h-[70px]"} />
                </div>
              </>
            )
          ) : (
            <section className="text-slate-500 p-4 flex-col flex items-center justify-center gap-4">
              <div className="flex-col flex items-center justify-center gap-1.5">
                <Icon
                  icon="solar:bill-cross-line-duotone"
                  className="w-8 h-8"
                />
                <p className="text-xs font-light">No listings available yet.</p>
              </div>
              <Link
                to="/hosting/listing/add-listing"
                className="group hover:text-slate-900 flex items-center gap-2"
              >
                <span className="font-medium text-sm">Add a Listing</span>
                <Icon
                  icon="solar:arrow-right-line-duotone"
                  className="group-hover:ml-2 h-4 w-4 transition-all"
                />
              </Link>
            </section>
          )}
        </section>
      </Tabs>
    </div>
  );
};

export default AuthListings;
