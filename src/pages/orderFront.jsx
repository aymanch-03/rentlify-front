import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import PayWith from "../components/ProductPage/payment";
import TotalPrice from "../components/ProductPage/totalPrice";
import Contact from "../components/ProductPage/contact";
import { Link, useParams, useLocation } from "react-router-dom"
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from ".././components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { PopoverClose } from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import { GetListing } from "../redux/reducers/listingSlice";

export default function OrderPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dateFrom = queryParams.get('dateFrom');
    const dateTo = queryParams.get('dateTo');
    const numOfAdults = queryParams.get('numOfAdults');
    const numOfChildren = queryParams.get('numOfChildren');

    console.log("date From: ", dateFrom)
    console.log("date to: ", dateTo)
    const { id } = useParams();
    const [date, setDate] = useState({
        from: new Date(dateFrom),
        to: new Date(dateTo),
    })

    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState(0)
    const [guests, setGuests] = useState(1)
    const [adults, setAdults] = useState(Number(numOfAdults))
    const [children, setChildren] = useState(Number(numOfChildren))
    const dispatch = useDispatch();
    const listing = useSelector((state) => state.listings.listing);
    const totalPrice = (listing.price * days).toFixed(2);

    useEffect(() => {
        setDays(Math.floor((date.to - date.from) / (1000 * 60 * 60 * 24)))
    }, [date])

    function totalGuests() {
        setGuests(adults + children)
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
    };
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
    return !isLoading ?(
        <div className=" py-20 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-12 w-full">
                <div className="col-span-6 flex items-center justify-end p-0">
                    <Link to={`/product/${id}`}>
                        <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" >
                            <Icon icon="solar:alt-arrow-left-outline" className="w-6 h-6" />
                        </Button>
                    </Link>
                    <h1 className="max-w-[550px] w-full text-4xl font-medium p-1 py-5">Request to book</h1>
                </div>
                <div>
                </div>
            </div>
            <div className="grid grid-cols-12 w-full">
                <div className="max-w-full col-span-6 pt-10 flex flex-col items-end">
                    <div className="p-0 max-w-[550px] w-full">
                        <div className="flex flex-col gap-4 p-1">
                            <h4 className="font-medium text-2xl">Your trip</h4>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-4 ">
                                    <h5 className="font-medium text-xl ">Dates</h5>
                                    <p>{date?.from ? (
                                        `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                                    ) : (
                                        <span>Pick a date</span>
                                    )}</p>
                                </div>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="link" className="text-lg">Edit</Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-4 ">
                                        <h5 className="font-medium text-xl">Guests</h5>
                                        <p>{adults} adults, {children} children</p>
                                    </div>
                                    <div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="link" className="text-lg">Edit</Button>
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
                                                                <Button className='w-6 h-6 rounded-full p-0' variant="ghost" onClick={decreaseAdults}  >
                                                                    <Icon icon="bi:dash-circle" className="w-6 h-6 hover:cursor-pointer" />
                                                                </Button>
                                                                <span className=" text-lg">{adults}</span>
                                                                <Button className='w-6 h-6 rounded-full p-0' variant="ghost" onClick={increaseAdults}>
                                                                    <Icon icon="bi:plus-circle" className="w-6 h-6 hover:cursor-pointer" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex flex-col">
                                                                <Label className="">Children</Label>
                                                                <Label className="text-xs text-slate-900">Ages 0 to 17</Label>
                                                            </div>
                                                            <div className="flex justify-between items-center w-1/3">
                                                                <Button className='w-6 h-6 rounded-full p-0' variant="ghost" onClick={decreaseChildren}>
                                                                    <Icon icon="bi:dash-circle" className="w-6 h-6 hover:cursor-pointer" />
                                                                </Button>
                                                                <span className=" text-lg">{children}</span>
                                                                <Button className='w-6 h-6 rounded-full p-0' variant="ghost" onClick={increaseChildren} >
                                                                    <Icon icon="bi:plus-circle" className="w-6 h-6 hover:cursor-pointer" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <PopoverClose>
                                                                <Button className="rounded-full w-[80px]" onClick={totalGuests}>Done</Button>
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
                    <hr className="max-w-[550px] w-full my-6 p-1" />
                    <div className=" max-w-[550px] w-full">
                        <PayWith />
                    </div>
                    <hr className="max-w-[550px] w-full my-6 p-1" />
                    <div className=" max-w-[550px] w-full">
                        <Contact />
                    </div>
                    <hr className="max-w-[550px] w-full my-6 p-1" />
                    <div className="max-w-[550px] w-full">
                        <div className="flex flex-col gap-4 p-1">
                            <h4 className="font-medium text-2xl">Cancellation policy</h4>
                            <p><span className="font-semibold">Free cancellation before Sep 22.</span>
                                Cancel before check-in on Sep 23 for a partial refund.
                                <Button className='p-1' variant="link">Learn more</Button>
                            </p>
                        </div>
                    </div>
                    <hr className="max-w-[550px] w-full my-6 p-1" />
                    <div className="max-w-[550px] w-full">
                        <div className="flex gap-4 p-2">
                            <Icon className="w-16 h-16" icon="mdi:home-time-outline" />
                            <p>
                                <span className="font-semibold">Your reservation won’t be confirmed until the Host accepts your request (within 24 hours)..</span> You won’t be charged until then.
                            </p>
                        </div>
                    </div>
                    <hr className="max-w-[550px] w-full my-6 p-1" />
                    <div className="max-w-[550px] w-full">
                        <div className="flex gap-4 p-2">
                            <p className="text-xs">
                                By selecting the button below,
                                I agree to the
                                Host's House Rules
                                , Ground rules for guests,
                                Airbnb's Rebooking and Refund Policy,
                                and that Airbnb can
                                charge my payment method
                                if I’m responsible for damage.
                                I agree to pay the total amount shown if the Host accepts my booking request.
                                You won’t be charged until then.
                            </p>
                        </div>
                        <Button className="p-8 text-xl m-2">Request to book</Button>
                    </div>
                </div>
                <div className="col-span-6 w-full">
                    <div className="sticky top-10 pt-10">
                        <TotalPrice 
                        listing={listing} 
                        days={days} 
                        totalPrice={totalPrice}
                        isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div >
    ) :(
        <div>
            
        </div>
    )
}