import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../redux/reducers/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addDays, format } from "date-fns";

export default function PaymentSuccess() {
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState("");

    const order = useSelector((state) => state.orders.order);
    console.log(order.order_item?.date_from);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getOrderById(id));
        setTimeout(() => {
            setIsLoading(false);
            setDate(format(addDays(new Date(order?.order_item?.date_from), -1), "LLL dd, y"))
          }, 1000);
    }, [dispatch])
    const dateI = order
    return !isLoading ?(

        <div class="flex flex-col m-20 items-center bg-white p-8 text-center h-screen ">
            <div class="bg-white p-8 rounded-lg shadow-md text-center">
                <svg class="text-green-300 w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7"></path>
                </svg>
                <h1 class="text-2xl font-semibold text-green-300 mb-2">Booking Confirmed</h1>
                <p class="text-gray-700 mb-4">Thank you for your booking. Your reservation is confirmed.</p>
                
                <Button
                    variant="default"
                    className="flex mx-auto mt-10 group items-center py-[20px] justify-center gap-2 rounded-lg "
                >
                    <Link
                        to="/discover/listings"
                        className="flex transition-all group-hover:gap-4 items-center justify-center gap-2"
                    >
                        <span>Continue Exploring</span>
                        <Icon
                            icon="solar:alt-arrow-right-bold-duotone"
                            className=" w-5 h-5"
                        />
                    </Link>
                </Button>
            </div>

        </div>
    ):(
        <div className="h-screen w-full">

        </div>
    )
}