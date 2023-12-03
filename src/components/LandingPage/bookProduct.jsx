import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { addDays, format } from "date-fns";
import moment from "moment";
import { useEffect, useState } from "react";
const product = {
  _id: "655b1612007341e440355459",
  sku: "148803",
  product_image:
    "https://res.cloudinary.com/rentlify/image/upload/v1700468241/products/ww9lewgvrmba0kyuehhs.webp",
  product_name: "dragon t- shirt",
  subcategory_id: "6531359e36f67c30f3ff60fc",
  short_description: "dragon t - shirt  zakaria description",
  long_description: "tghchthgbchtgbghtgdbdhtdgbc",
  price: 24.99,
  discount_price: 0,
  active: false,
  __v: 0,
};

export default function BookingBox() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [days, setDays] = useState(0);
  const [guests, setGuests] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const totalPrice = (product.price * days).toFixed(2);
  useEffect(() => {
    setDays(Math.floor((date.to - date.from) / (1000 * 60 * 60 * 24)));
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
  const isDateDisabled = (date) => {
    // Disable days before the current date
    return moment(date).isBefore(moment(), "day");
  };
  return (
    <div className="rounded-2xl w-4/12 p-10 m-10 shadow-xl">
      <div className="flex justify-between items-center p-2">
        <h3>
          <span className="font-semibold text-4xl">{totalPrice}</span>/{" "}
          {`${days === 1 ? `${days} night` : `${days} nights`}`}
        </h3>
        <div className="w-[55px] flex justify-between items-center">
          <Icon className="w-5 h-5" icon="ph:star" />
          <p className="font-medium pt-1">4.95</p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5">
        <div className="h-[80px] flex flex-col items-center ml-[-1px] border border-inherit rounded-tl-2xl">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full text-center font-normal p-4 border-none  shadow-none h-full m-0 rounded-tl-2xl",
                  !date && "text-muted-foreground"
                )}
              >
                <div className="flex flex-col p-4 col-span-2">
                  <h2 className="font-semibold text-lg ">CHECK-IN</h2>
                  <span>
                    {date?.from ? (
                      date.to ? (
                        <>{format(date.from, "LLL dd, y")}</>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </span>
                </div>
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
                filterDate={isDateDisabled}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="h-[80px] flex flex-col items-center ml-[-1px] border border-inherit rounded-tr-2xl">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full text-center font-normal p-4 border-none shadow-none h-full m-0 rounded-tr-2xl",
                  !date && "text-muted-foreground"
                )}
              >
                <div className="flex flex-col p-4 col-span-2">
                  <h2 className="font-semibold text-lg">CHECKOUT</h2>
                  <span>
                    {date?.from ? (
                      date.to ? (
                        <>{format(date.to, "LLL dd, y")}</>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </span>
                </div>
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
                filterDate={isDateDisabled}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col mt-[-1px] ml-[-1px] col-span-2 border border-inherit rounded-b-2xl">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start w-full h-full border-none m-0 rounded-b-2xl"
              >
                <div className="flex flex-col p-4 col-span-2">
                  <h2 className="font-semibold text-lg">GUESTS</h2>
                  <span>
                    {`${guests === 1 ? `${guests} guest` : `${guests} guests`}`}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
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
                    <Button
                      className="rounded-full w-[80px]"
                      onClick={totalGuests}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button className="w-full mt-5">BOOK NOW</Button>
    </div>
  );
}
