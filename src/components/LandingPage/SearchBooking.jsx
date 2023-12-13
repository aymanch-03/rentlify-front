import { Icon } from "@iconify/react";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CityPicker from "../ui/CityPicker";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function SearchBooking() {
  const [guests, setGuests] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [checkInDate, setCheckInDate] = useState();
  const [city, setCity] = useState('');
  const [checkOutDate, setCheckOutDate] = useState();
  const isAuth = useSelector((state) => state.authCustomer.isAuth);
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

  return (
    <section className="border-y">
      <form className="mx-auto max-w-7xl grid bg-white grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:px-6 ">
        <div className="flex flex-col border-t border-r-0 sm:border-r border-gray-900/5 px-4 py-4 sm:px-6 lg:border-t-0 xl:px-8">
          <p className="text-sm font-medium text-gray-400">Location</p>
          <div className="flex items-center gap-3">
            <Icon
              icon="solar:city-bold-duotone"
              width={24}
              height={24}
              className="flex-shrink-0 text-primary"
            />
            <CityPicker onValueChange={(e)=>setCity(e)}/>
          </div>
        </div>
        <div className="flex flex-col border-t border-r-0 lg:border-r border-gray-900/5 px-4 py-4 sm:px-6 lg:border-t-0 xl:px-8">
          <p className="text-sm font-medium text-gray-400">Check-in</p>
          <div className="flex items-center gap-3 overflow-hidden ">
            <Icon
              icon="solar:calendar-search-bold-duotone"
              width={24}
              height={24}
              className="flex-shrink-0 text-primary "
            />
            <DatePicker
              date={checkInDate}
              setDate={setCheckInDate}
              disabled={(date) => date < new Date()}
            />
          </div>
        </div>
        <div className="flex flex-col border-t border-r-0 sm:border-r border-gray-900/5 px-4 py-4 sm:px-6 lg:border-t-0 xl:px-8">
          <p className="text-sm font-medium text-gray-400">Check-out</p>
          <div className="flex items-center gap-3">
            <Icon
              icon="solar:calendar-search-bold-duotone"
              width={24}
              height={24}
              className="flex-shrink-0 text-primary"
            />
            <DatePicker
              date={checkOutDate}
              setDate={setCheckOutDate}
              disabled={(date) => {
                date < new Date(checkInDate);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col border-t border-r-0 lg:border-r border-gray-900/5 px-4 py-4 sm:px-6 lg:border-t-0 xl:px-8">
          <p className="text-sm font-medium text-gray-400">Guests</p>
          <div className="">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-end gap-3 cursor-pointer py-2">
                  <Icon
                    icon="solar:users-group-rounded-bold-duotone"
                    width={24}
                    height={24}
                    className="flex-shrink-0 text-primary"
                  />
                  <span className="focus:ring-0 text-base font-medium px-0">
                    {`${guests === 1 ? `${guests} guest` : `${guests} guests`}`}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
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
                        <span className=" text-lg">{adults}</span>
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
        </div>{" "}
        <div className="flex col-span-1 sm:col-span-2 lg:col-span-1 border-t border-gray-900/5 px-4 py-4 sm:px-6 lg:border-t-0 xl:px-8">
          <Button
            type="submit"
            className="w-fit self-center justify-self-center mx-auto"
          >
            <Link to={isAuth ? `/discover/listings/?city=${city}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}` : "login"}>Search Listings</Link>
          </Button>
        </div>{" "}
      </form>
    </section>
  );
}
