/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@iconify/react";
// eslint-disable-next-line no-unused-vars
import { useDispatch } from "react-redux";

export default function ProductDetails({ listing, isLoading }) {
  const category = listing.category_id;
  return !isLoading ? (
    <div className="p-10 col-span-7">
      <h1 className="font-bold text-4xl">{listing.listing_name}</h1>
      <h5 className="text-lg flex items-center capitalize p-1">
        <Icon icon="ep:location" />
        <span className="p-2">
          {listing.province.charAt(0).toUpperCase() + listing.province.slice(1)}
          {", "}
          {listing.city.charAt(0).toUpperCase() + listing.city.slice(1)}
        </span>
      </h5>
      <div className="lg:grid-cols-4 p-1 grid lg:flex sm:grid-cols-2 gap-5 md:grid-cols-3">
        <div className="flex items-center w-fit m-1 py-2 px-4 rounded-xl shadow-md text-sm">
          <Icon className="w-9" icon={category.category_icon} color="#9fa2a4" />
          {category.category_name}
        </div>
      </div>
      <p className="lg:w-full my-4">{listing.short_description}</p>
      <p className="w-full my-4">{listing.long_description}</p>
      <Button
        variant="ghost"
        className="flex gap-1 group hover:bg-transparent text-[#318ed3] hover:text-[#318ed3]"
      >
        See more
        <Icon
          icon="solar:arrow-right-line-duotone"
          className=" group-hover:ml-2 transition-all"
        />
      </Button>
    </div>
  ) : (
    <div className="p-10 col-span-7 h-[100vh] gap-2">
      <Skeleton className="w-[80%] h-10 my-4" />

      <Skeleton className="w-[30%] h-6 my-2" />

      <Skeleton className="w-[50%] h-6 my-2" />

      <Skeleton className="w-[50%] h-6 my-2" />
    </div>
  );
}
