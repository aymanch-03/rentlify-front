import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../redux/reducers/categorySlice";
import { listListings } from "../../redux/reducers/listingSlice";
import ListingSkeleton from "../ui/listingSkeleton";
import { Skeleton } from "../ui/skeleton";

const FilterContent = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const listings = useSelector((state) => state.listings.data);
  const isLoading = useSelector((state) => state.listings.isLoading);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "priceFrom") {
      setPriceFrom(value);
    } else if (name === "priceTo") {
      if (value === "" || parseFloat(value) > parseFloat(priceFrom)) {
        setPriceTo(value);
      } else {
        setPriceTo(priceFrom);
      }
    } else if (name === "numOfGuests") {
      setNumOfGuests(parseInt(value, 10));
    }
  };
  const handleCategoryClick = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((category) => category !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const filtered = filteredListings?.filter((listing) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(listing.category_id.category_name);

      const matchesPrice =
        (priceFrom === "" ||
          parseFloat(listing.price) >= parseFloat(priceFrom)) &&
        (priceTo === "" || parseFloat(listing.price) <= parseFloat(priceTo));

      console.log(
        "Listing:",
        listing.listing_name,
        ", Category:",
        listing.category_id.category_name,
        matchesCategory,
        selectedCategories,
        ", Matches Price:",
        matchesPrice
      );

      return matchesCategory && matchesPrice;
    });

    console.log(filtered);
    setFilteredListings(filtered);
  };

  const handleReset = () => {
    setPriceFrom("");
    setPriceTo("");
    setNumOfGuests(1);
    setSelectedCategories([]);
  };

  useEffect(() => {
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1250);
    dispatch(listCategories());
    dispatch(listListings());
  }, [dispatch]);
  useEffect(() => {
    const activeListings = listings.filter(
      (product) => product.active === true
    );
    setFilteredListings(activeListings);
  }, [listings]);

  // const filterValues = { priceFrom, priceTo, selectedCategories, numOfGuests };
  // console.log(filterValues);

  return (
    <div className="lg:flex gap-10 overflow-hidden lg:h-[calc(100vh-100px)]">
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
                      selectedCategories.includes(category.category_name)
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
      <section className="overflow-y-scroll custom-scrollbar flex-1 px-1">
        <div className="w-full sticky top-0 bg-white pb-5 z-10">
          <h1 className="text-2xl font-semibold">
            {isLoading ? (
              <Skeleton className="w-32 h-8" />
            ) : (
              `${filteredListings.length} Results`
            )}{" "}
          </h1>
        </div>

        <main className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 lg:my-4 lg:py-4 py-2 overflow-auto">
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
            filteredListings.map((listing, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg overflow-hidden space-y-2"
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={listing.listing_image}
                    className="object-fill"
                    alt={listing.listing_name}
                  />
                </div>
                <p className="font-semibold text-xl">{listing.listing_name}</p>
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
                <h1 className="font-semibold text-xl">
                  {listing.price} MAD
                  <span className="font-light text-xs"> /night</span>
                </h1>
              </div>
            ))
          )}
          {/* <div className="h-[300px] flex flex-col rounded-lg overflow-hidden border space-y-2">
            <div className="flex-1 border"></div>
            <p className="font-semibold text-xl">Homestay</p>
            <h1 className="font-light text-sm flex items-center gap-2">
              <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
              <span>Oulfa, Casablanca</span>
            </h1>
            <h1 className="font-semibold text-xl">
              320 MAD <span className="font-light text-xs">/night</span>
            </h1>
          </div>
          <div className="h-[300px] flex flex-col rounded-lg overflow-hidden border space-y-2">
            <div className="flex-1 border"></div>
            <p className="font-semibold text-xl">Homestay</p>
            <h1 className="font-light text-sm flex items-center gap-2">
              <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
              <span>Oulfa, Casablanca</span>
            </h1>
            <h1 className="font-semibold text-xl">
              320 MAD <span className="font-light text-xs">/night</span>
            </h1>
          </div>
          <div className="h-[300px] flex flex-col rounded-lg overflow-hidden border space-y-2">
            <div className="flex-1 border"></div>
            <p className="font-semibold text-xl">Homestay</p>
            <h1 className="font-light text-sm flex items-center gap-2">
              <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
              <span>Oulfa, Casablanca</span>
            </h1>
            <h1 className="font-semibold text-xl">
              320 MAD <span className="font-light text-xs">/night</span>
            </h1>
          </div>
          <div className="h-[300px] flex flex-col rounded-lg overflow-hidden border space-y-2">
            <div className="flex-1 border"></div>
            <p className="font-semibold text-xl">Homestay</p>
            <h1 className="font-light text-sm flex items-center gap-2">
              <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
              <span>Oulfa, Casablanca</span>
            </h1>
            <h1 className="font-semibold text-xl">
              320 MAD <span className="font-light text-xs">/night</span>
            </h1>
          </div>
          <div className="h-[300px] flex flex-col rounded-lg overflow-hidden border space-y-2">
            <div className="flex-1 border"></div>
            <p className="font-semibold text-xl">Homestay</p>
            <h1 className="font-light text-sm flex items-center gap-2">
              <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
              <span>Oulfa, Casablanca</span>
            </h1>
            <h1 className="font-semibold text-xl">
              320 MAD <span className="font-light text-xs">/night</span>
            </h1>
          </div>
          <div className="h-[300px] flex flex-col rounded-lg overflow-hidden border space-y-2">
            <div className="flex-1 border"></div>
            <p className="font-semibold text-xl">Homestay</p>
            <h1 className="font-light text-sm flex items-center gap-2">
              <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
              <span>Oulfa, Casablanca</span>
            </h1>
            <h1 className="font-semibold text-xl">
              320 MAD <span className="font-light text-xs">/night</span>
            </h1>
          </div>
          <div className="h-[300px] flex flex-col rounded-lg overflow-hidden border space-y-2">
            <div className="flex-1 border"></div>
            <p className="font-semibold text-xl">Homestay</p>
            <h1 className="font-light text-sm flex items-center gap-2">
              <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
              <span>Oulfa, Casablanca</span>
            </h1>
            <h1 className="font-semibold text-xl">
              320 MAD <span className="font-light text-xs">/night</span>
            </h1>
          </div>
          <div className="h-[300px] flex flex-col rounded-lg overflow-hidden border space-y-2">
            <div className="flex-1 border"></div>
            <p className="font-semibold text-xl">Homestay</p>
            <h1 className="font-light text-sm flex items-center gap-2">
              <Icon icon="solar:map-point-line-duotone" className="w-4 h-4" />
              <span>Oulfa, Casablanca</span>
            </h1>
            <h1 className="font-semibold text-xl">
              320 MAD <span className="font-light text-xs">/night</span>
            </h1>
          </div> */}
        </main>
      </section>
    </div>
  );
};

export default FilterContent;
