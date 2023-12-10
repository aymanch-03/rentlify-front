/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { customerStatuses, listingLabels } from "../../data/data";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ListingItem = ({ listing }) => {
  const label = listingLabels.find((label) => label.value === listing.status);
  const status = customerStatuses.find(
    (status) => status.value === listing.active
  );

  return (
    <Link
      to={`/hosting/listing/${listing._id}`}
      key={listing.sku}
      className="grid grid-cols-6 place-items-center overflow-hidden text-sm p-2 rounded-md cursor-pointer hover:bg-muted"
    >
      <div className="col-span-3 flex justify-start w-full items-stretch gap-5 h-full">
        <img
          src={listing.listing_image[0]}
          alt=""
          className="rounded-md object-cover aspect-square w-[70px]"
        />
        <div className="flex flex-col h-full justify-between">
          <p>{listing.listing_name}</p>
          <p className="truncate max-w-[300px] ">{listing.short_description}</p>
        </div>
      </div>
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
          {listing.price} MAD <span className="text-xs font-light">/night</span>
        </p>
      </div>
    </Link>
  );
};

const AuthListings = ({ customer, listings }) => {
  const customerListings = listings.filter(
    (listing) => listing.listing_owner?._id === customer._id
  );

  const activeListings = customerListings.filter((listing) => listing.active);
  const availableListings = customerListings.filter(
    (listing) => listing.status
  );

  return (
    <div className="my-12">
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="gap-5 bg-transparent">
          <TabsTrigger
            value="listings"
            className="font-normal hover:border-violet-300 text-black"
          >
            All Listings ({customerListings.length})
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="font-normal hover:border-violet-300 text-black"
          >
            Active Listings ({activeListings.length})
          </TabsTrigger>
          <TabsTrigger
            value="available"
            className="font-normal hover:border-violet-300 text-black"
          >
            Available Listings ({availableListings.length})
          </TabsTrigger>
        </TabsList>
        <section className="w-full  border my-5 rounded-md p-2.5">
          <TabsContent value="listings" className="m-0 flex flex-col gap-3">
            {customerListings.map((listing) => (
              <ListingItem key={listing.sku} listing={listing} />
            ))}
          </TabsContent>
          <TabsContent value="active" className="m-0 flex flex-col gap-3">
            {activeListings.map((listing) => (
              <ListingItem key={listing.sku} listing={listing} />
            ))}
          </TabsContent>
          <TabsContent value="available" className="m-0 flex flex-col gap-3">
            {availableListings.map((listing) => (
              <ListingItem key={listing.sku} listing={listing} />
            ))}
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
};

export default AuthListings;
