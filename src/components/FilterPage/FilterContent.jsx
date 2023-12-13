import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAllCategories } from "../../redux/reducers/categorySlice";
import { ListListings } from "../../redux/reducers/listingSlice";
import ListingSkeleton from "../ui/listingSkeleton";
import { Skeleton } from "../ui/skeleton";

const FilterContent = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const listings = useSelector((state) => state.listings.data);
  const isLoading = useSelector((state) => state.listings.isLoading);
  const activeListings = listings.filter((product) => product.active === true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const checkInDate = queryParams.get("checkInDate");
  const checkOutDate = queryParams.get("checkOutDate");
  const guests = queryParams.get("guests");

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [numOfGuests, setNumOfGuests] = useState(Number(guests));
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "priceFrom") {
      setPriceFrom(value);
    } else if (name === "priceTo") {
      setPriceTo(value);
    } else if (name === "numOfGuests") {
      setNumOfGuests(parseInt(value, 10));
    }
  };

  const handleCategoryClick = (categoryName) => {
    setTempSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((category) => category !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSelectedCategories(tempSelectedCategories);

    const filterListings = (listings) => {
      return listings.filter((listing) => {
        const matchesCategory =
          tempSelectedCategories.length === 0 ||
          tempSelectedCategories.includes(listing.category_id.category_name);

        const matchesNumOfGuests = listing.max_guests >= numOfGuests;

        const matchesPrice =
          (priceFrom === "" ||
            parseFloat(listing.price) >= parseFloat(priceFrom)) &&
          (priceTo === "" || parseFloat(listing.price) <= parseFloat(priceTo));

        return matchesCategory && matchesPrice && matchesNumOfGuests;
      });
    };

    setFilteredListings(filterListings(activeListings));
  };

  const handleReset = () => {
    setPriceFrom("");
    setPriceTo("");
    setNumOfGuests(1);
    setSelectedCategories([]);
  };

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(ListListings());
  }, [dispatch]);

  useEffect(() => {
    setFilteredListings(activeListings);
  }, []);

  console.log("priceTo:", priceTo);
  console.log("priceFrom:", priceFrom);
  console.log("selectedCategories:", selectedCategories);
  console.log("filteredListings:", filteredListings);
  console.log("numOfGuests:", numOfGuests);

  // const filterValues = { priceFrom, priceTo, selectedCategories, numOfGuests };
  // console.log(filterValues);

  return (
    <div className="lg:flex gap-10 lg:h-[calc(100vh-100px)]">
      <section className="lg:h-[calc(100vh-100px)] sticky h-auto flex flex-col lg:w-[18rem] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Filters</h1>
          <span
            className="text-sm text-primary font-medium cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </span>
        </div>
        <form onSubmit={handleSubmit} className="my-6 flex flex-col">
          <section className="flex-1 gap-6 flex flex-col">
            <div>
              <h3 className="text-sm font-medium">
                Price <span className="font-light">(MAD)</span>
              </h3>
              <div className="flex gap-2 my-2">
                <input
                  type="number"
                  name="priceFrom"
                  placeholder="From"
                  value={priceFrom}
                  onChange={handleInputChange}
                  className="w-full text-sm rounded-lg bg-gray-500/5 shadow-none border-0 py-4"
                />
                <input
                  type="number"
                  name="priceTo"
                  placeholder="To"
                  value={priceTo}
                  onChange={handleInputChange}
                  className="w-full text-sm rounded-lg bg-gray-500/5 shadow-none border-0 py-4"
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="flex gap-2.5 flex-wrap my-2">
                {categories.map((category, index) => (
                  <button
                    type="button"
                    className={`rounded-lg text-sm p-2.5 shadow-sm cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      tempSelectedCategories.includes(category.category_name)
                        ? "border-2 border-primary/70 bg-primary/70 text-white"
                        : "border-2 border-white hover:border-primary/20 hover:bg-gray-500/5"
                    }`}
                    onClick={() => handleCategoryClick(category.category_name)}
                    key={index}
                  >
                    <Icon icon={category?.category_icon} className="w-5 h-5" />
                    <span className="font-medium">
                      {category.category_name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Number of Guests</h3>
              <div className="my-2 rounded-lg flex items-center lg:p-4 px-4 py-2.5 justify-between bg-gray-500/5">
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setNumOfGuests((prev) => Math.max(1, prev - 1))
                  }
                >
                  <Icon icon="ic:round-minus" className="w-6 h-6" />
                </span>
                <input
                  type="number"
                  name="numOfGuests"
                  value={numOfGuests}
                  onChange={handleInputChange}
                  className="w-fit bg-transparent text-center border-none focus:ring-0 focus:outline-none p-0"
                />
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setNumOfGuests((prev) => Math.min(99, prev + 1))
                  }
                >
                  <Icon icon="ic:round-plus" className="w-6 h-6" />
                </span>
              </div>
            </div>
          </section>
          <button
            type="submit"
            className="bg-primary w-full rounded-lg text-white p-2 mt-4"
          >
            Apply Filters
          </button>
        </form>
      </section>
      <section className="overflow-y-scroll relative custom-scrollbar flex-1 pr-1">
        <div className="w-full sticky top-0 bg-white pb-5 z-10">
          <h1 className="text-2xl font-semibold">
            {isLoading ? (
              <Skeleton className="w-32 h-8" />
            ) : filteredListings.length === 0 &&
              selectedCategories.length > 0 ? (
              "No results found"
            ) : (
              `${
                selectedCategories.length === 0
                  ? "All"
                  : filteredListings.length
              } Results`
            )}{" "}
          </h1>
        </div>

        <main className="grid relative md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 lg:my-4 lg:py-4 py-2 overflow-auto">
          {isLoading ? (
            <>
              <ListingSkeleton />
              <ListingSkeleton />
              <ListingSkeleton />
              <ListingSkeleton />
              <ListingSkeleton />
              <ListingSkeleton />
            </>
          ) : (
            <>
              {console.log("filtered result:", filteredListings)}
              {(selectedCategories.length === 0
                ? activeListings
                : filteredListings
              ).map((listing, index) => (
                <Link
                  key={index}
                  to={`${listing._id}`}
                  className="flex flex-col rounded-md overflow-hidden space-y-2"
                >
                  <div className="rounded-xl overflow-hidden sm:h-[280px] h-[300px]">
                    <img
                      src={listing.listing_image[0]}
                      className="object-cover w-full h-full"
                      alt={listing.listing_name}
                    />
                  </div>

                  <h1 className="font-light text-sm flex items-center gap-2">
                    <Icon
                      icon="solar:map-point-line-duotone"
                      className="w-4 h-4"
                    />
                    <span>
                      {listing?.province.charAt(0).toUpperCase() +
                        listing?.province.slice(1)}
                      ,{" "}
                      {listing?.city.charAt(0).toUpperCase() +
                        listing?.city.slice(1)}
                    </span>
                  </h1>
                  <h1 className="font-light text-sm flex items-center gap-2">
                    <Icon icon="solar:user-linear" className="w-4 h-4" />
                    <p>
                      Hosted by{" "}
                      <span className="underline capitalize font-medium">
                        {" "}
                        {listing.listing_owner.first_name}
                      </span>{" "}
                      <span className="underline capitalize font-medium">
                        {listing.listing_owner.last_name}
                      </span>
                    </p>
                  </h1>
                  <h1 className="font-light text-sm flex items-center gap-2">
                    <Icon
                      icon={
                        listing.max_guests > 2
                          ? "solar:users-group-two-rounded-line-duotone"
                          : "solar:users-group-rounded-line-duotone"
                      }
                      className="w-4 h-4"
                    />

                    <span>{listing.max_guests} Guests</span>
                  </h1>

                  <h1 className="font-medium text-xl">
                    {listing.price} MAD
                    <span className="font-light text-xs"> /night</span>
                  </h1>
                </Link>
              ))}
            </>
          )}
        </main>
      </section>
    </div>
  );
};

export default FilterContent;
