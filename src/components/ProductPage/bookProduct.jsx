/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { PopoverClose } from "@radix-ui/react-popover";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookingBox({ id, listing, isLoading }) {
  const product = listing;
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

  return !isLoading ? (
    <div className="rounded-2xl p-4 border shadow-md my-5 ">
      <div className="flex justify-between items-center p-2 h-14">
        <h3>
          <span className="font-medium text-3xl">{totalPrice} MAD</span>/{" "}
          {`${days === 1 ? `${days} night` : `${days} nights`}`}
        </h3>
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
                      format(date.from, "LLL dd, y")
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
                selected={date ? date : null}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
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
                    {date?.to ? (
                      format(date.to, "LLL dd, y")
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
                selected={date ? date : null}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
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
      {date?.from ? (
        date.to ? (
          <Link
            to={`/order/${id}/?dateFrom=${date.from}&dateTo=${date.to}&numOfAdults=${adults}&numOfChildren=${children}`}
          >
            <Button className="w-full mt-5 h-12">BOOK NOW</Button>
          </Link>
        ) : (
          <Button className="w-full mt-5 h-12">BOOK NOW</Button>
        )
      ) : (
        <Button className="w-full mt-5 h-12">BOOK NOW</Button>
      )}
    </div>
  ) : (
    <div className="rounded-2xl col-span-5 p-4 border shadow-md h-fit my-5">
      <div className="h-14 flex justify-between items-center p-2">
        <Skeleton className="w-[200px] h-full m-0" />
      </div>
      <div className=" w-full mt-5">
        <Skeleton className="w-full h-[160px]" />
      </div>
      <div className=" w-full mt-5">
        <Skeleton className="w-full h-12" />
      </div>
    </div>
  );
}
