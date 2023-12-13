import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@iconify/react";
import { PopoverClose } from "@radix-ui/react-popover";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from ".././components/ui/popover";
import RequestToBook from "../components/payment/RequestToBook";
import Contact from "../components/ProductPage/contact";
import PayWith from "../components/ProductPage/payment";
import TotalPrice from "../components/ProductPage/totalPrice";
import { GetListing } from "../redux/reducers/listingSlice";
import StripeContainer from "../components/payment/StripeContainer";

export default function OrderPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dateFrom = queryParams.get("dateFrom");
  const dateTo = queryParams.get("dateTo");
  const numOfAdults = queryParams.get("numOfAdults");
  const numOfChildren = queryParams.get("numOfChildren");

  const { id } = useParams();
  const [date, setDate] = useState({
    from: new Date(dateFrom),
    to: new Date(dateTo),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(0);
  const [guests, setGuests] = useState(1);
  const [adults, setAdults] = useState(Number(numOfAdults));
  const [children, setChildren] = useState(Number(numOfChildren));
  const dispatch = useDispatch();
  const listing = useSelector((state) => state.listings.listing);
  const totalPrice = (listing.price * days).toFixed(2);
  const serviceFees = (totalPrice * 0.1).toFixed(2);
  const totalWithFees = (totalPrice - -serviceFees).toFixed(2);

  useEffect(() => {
    setDays(
      date?.from
        ? date.to
          ? Math.floor((date.to - date.from) / (1000 * 60 * 60 * 24))
          : 0
        : 0
    );
  }, [date]);

  function totalGuests() {
    setGuests(adults + children);
  }
  function increaseAdults() {
    if (adults < 100) {
      setAdults(adults + 1);
    }
  }
  function decreaseAdults() {
    if (adults > 1) {
      setAdults(adults - 1);
    }
  }
  function increaseChildren() {
    if (children < 100) {
      setChildren(children + 1);
    }
  }
  function decreaseChildren() {
    if (children > 0) {
      setChildren(children - 1);
    }
  }
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
  return !isLoading ? (
    <div className="py-10  w-full max-w-7xl mx-auto">
      <div className="w-full px-4 flex flex-col gap-3">
        <Link
          to={`/discover/listings/${id}`}
          className="group flex items-center gap-2"
        >
          <Icon
            icon="solar:arrow-left-line-duotone"
            className="group-hover:mr-2 h-4 w-4 transition-all"
          />
          <span className="font-medium text-sm">Back to listing details</span>
        </Link>
      </div>
      <div className="lg:flex w-full px-4 gap-x-3">
        <div className="w-full items-center justify-center">
          <div className="w-full flex items-center justify-center sticky top-10">
            <TotalPrice
            className={"lg:p-6 mt-10 lg:border border-inherit rounded-2xl"}
              listing={listing}
              days={days}
              totalPrice={totalPrice}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="max-w-full w-full flex flex-col items-center">
          <div className="max-w-full p-0 lg:max-w-[550px] w-full">
            <div className="flex flex-col gap-4 p-1  mt-10">
              <h4 className="font-medium text-2xl">Your trip</h4>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4 ">
                  <h5 className="font-medium text-xl ">Dates</h5>
                  <p>
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </p>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="link" className="text-lg">
                        Edit
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-4">
                    <h5 className="font-medium text-xl">Guests</h5>
                    <p>
                      {`${adults === 1 ? `${adults} adult` : `${adults} adults`
                        }`}
                      ,{" "}
                      {`${children <= 1
                        ? `${children} child`
                        : `${children} children`
                        }`}
                    </p>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="link" className="text-lg">
                          Edit
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              Dimensions
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Set the dimensions for the layer.
                            </p>
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                              <Label className="">Adults</Label>
                              <div className="flex justify-between items-center w-1/3">
                                <Button
                                  className="w-6 h-6 rounded-full p-0"
                                  variant="ghost"
                                  onClick={decreaseAdults}
                                >
                                  <Icon
                                    icon="bi:dash-circle"
                                    className="w-6 h-6 hover:cursor-pointer"
                                  />
                                </Button>
                                <span className="text-lg">{adults}</span>
                                <Button
                                  className="w-6 h-6 rounded-full p-0"
                                  variant="ghost"
                                  onClick={increaseAdults}
                                >
                                  <Icon
                                    icon="bi:plus-circle"
                                    className="w-6 h-6 hover:cursor-pointer"
                                  />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <Label className="">Children</Label>
                                <Label className="text-xs text-slate-900">
                                  Ages 0 to 17
                                </Label>
                              </div>
                              <div className="flex justify-between items-center w-1/3">
                                <Button
                                  className="w-6 h-6 rounded-full p-0"
                                  variant="ghost"
                                  onClick={decreaseChildren}
                                >
                                  <Icon
                                    icon="bi:dash-circle"
                                    className="w-6 h-6 hover:cursor-pointer"
                                  />
                                </Button>
                                <span className=" text-lg">{children}</span>
                                <Button
                                  className="w-6 h-6 rounded-full p-0"
                                  variant="ghost"
                                  onClick={increaseChildren}
                                >
                                  <Icon
                                    icon="bi:plus-circle"
                                    className="w-6 h-6 hover:cursor-pointer"
                                  />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <PopoverClose>
                                <Button
                                  className="rounded-full w-[80px]"
                                  onClick={totalGuests}
                                >
                                  Done
                                </Button>
                              </PopoverClose>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="max-w-full w-[90%] lg:max-w-[550px] w-full my-6 p-1" />
          {/* <div className="max-w-full w-[90%] lg:max-w-[550px] w-full">
            <StripeContainer />
          </div>
          <hr className="max-w-full w-[90%] lg:max-w-[550px] w-full my-6 p-1" /> */}
          <div className=" max-w-full w-[90%] lg:max-w-[550px] w-full">
            <Contact />
          </div>
          <hr className="max-w-full w-[90%] lg:max-w-[550px] w-full my-6 p-1" />
          <div className="max-w-full w-[90%] lg:max-w-[550px] w-full">
            <div className="flex flex-col gap-4 p-1">
              <h4 className="font-medium text-2xl">Cancellation policy</h4>
              <p>
                <span className="font-semibold">
                  Free cancellation before{" "}
                  <span className="underline">48 Hours</span>.
                </span>{" "}
                {""}
                Cancel before check-in for a partial refund.
                <Button className="p-1" variant="link">
                  Learn more
                </Button>
              </p>
            </div>
          </div>
          <hr className="max-w-full w-[90%] lg:max-w-[550px] w-full my-6 p-1" />
          <div className="max-w-full w-[90%] lg:max-w-full w-[90%] lg:max-w-[550px] w-full">
            <div className="flex items-center gap-4 p-2">
              <Icon className="w-16 h-16" icon="mdi:home-time-outline" />
              <p>
                <span className="font-semibold">
                  Your reservation won’t be confirmed until the Host accepts
                  your request (within 24 hours)..
                </span>{" "}
                You won’t be charged until then.
              </p>
            </div>
          </div>
          <hr className="max-w-full w-[90%] lg:max-w-[550px] w-full my-6 p-1" />
          <div className="max-w-full w-[90%] lg:max-w-[550px] w-full">
            <div className="flex gap-4 p-2">
              <p className="text-xs">
                By selecting the button below, I agree to the Host's House Rules
                , Ground rules for guests, Airbnb's Rebooking and Refund Policy,
                and that Airbnb can charge my payment method if I’m responsible
                for damage. I agree to pay the total amount shown if the Host
                accepts my booking request. You won’t be charged until then.
              </p>
            </div>
            <RequestToBook
            
              listing={listing}
              totalPrice={totalPrice}
              totalWithFees={totalWithFees}
              dateFrom={date.from}
              dateTo={date.to}
              days={days}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="py-20 lg:px-8 px-4 max-w-7xl mx-auto">
      <div className="w-1/2">
        <div className="flex items-center justify-start pl-12">
          <Skeleton className="w-1/2 h-10" />
        </div>
      </div>
      <div className="flex gap-12 w-full">
        <div className="w-1/2 justify-center">
          <div className="sticky top-[5.5rem]">
            <div className="max-w-full w-[100%] flex items-center justify-center rounded-2xl my-12">
              <Skeleton className="w-full h-[340px]" />
            </div>
          </div>
        </div>
        <div className="max-w-full w-1/2 pt-10 flex flex-col justify-center">
          <div className="p-0 max-w-[550px] w-full">
            <div className="flex flex-col gap-4 p-1">
              <Skeleton className="w-1/3 h-8" />
              <div className="flex justify-between items-center">
                <div className="w-12"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-4 ">
                    <Skeleton className="w-[100px] h-8" />
                    <Skeleton className="w-[200px] h-6" />
                  </div>
                  <div>
                    <Skeleton className="w-2/3  h-8" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-4 ">
                    <Skeleton className="w-[100px] h-8" />
                    <Skeleton className="w-[150px] h-6" />
                  </div>
                  <div>
                    <Skeleton className="w-2/3  h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className=" w-full my-6 p-1" />
          <div className=" flex flex-col gap-4 w-full px-1">
            <Skeleton className="w-1/3 h-9" />
            <Skeleton className="w-[95%] h-16" />
            <Skeleton className="w-[95%] h-[130px] rounded-xl" />
            <Skeleton className="w-[95%] h-16" />
          </div>
          <hr className="max-w-[550px] w-full my-6 p-1" />
          <div className=" w-full flex flex-col gap-4">
            <Skeleton className="w-1/2 h-8" />
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4 ">
                <Skeleton className="w-[200px] h-8" />
                <Skeleton className="w-[400px] h-6" />
              </div>
              <div>
                <Skeleton className="w-2/3  h-8" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4 ">
                <Skeleton className="w-[200px] h-8" />
                <Skeleton className="w-[400px] h-6" />
              </div>
              <div>
                <Skeleton className="w-2/3  h-8" />
              </div>
            </div>
          </div>
          <hr className="w-full my-6 p-1" />
          <div className="w-full flex flex-col gap-4">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-full h-16" />
          </div>
          <hr className=" w-full my-6 p-1" />
          <div className="w-full flex gap-4 p-4">
            <Skeleton className="w-16 h-16" />
            <Skeleton className="w-full h-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
