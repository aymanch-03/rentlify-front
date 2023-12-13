import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function PaymentSuccess() {
    const {id}= useParams();
    useEffect(()=>{
        dispatch(getOrder(data));
    })
    return (

        <div class="flex flex-col items-center bg-white p-8 text-center h-screen">
            <div class="bg-white p-8 rounded-lg shadow-md text-center">
                <svg class="text-green-300 w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7"></path>
                </svg>
                <h1 class="text-2xl font-semibold text-green-300 mb-2">Booking Confirmed</h1>
                <p class="text-gray-700 mb-4">Thank you for your booking. Your reservation is confirmed.</p>
                <div class="mb-4">
                    <p class="text-gray-600">Booking Details:</p>
                    -- Add relevant booking details here, such as date, time, and location
                    <p class="text-gray-800 font-semibold">Date: December 15, 2023</p>
                    <p class="text-gray-800 font-semibold">Time: 2:00 PM</p>
                    <p class="text-gray-800 font-semibold">Location: Example Hotel</p>
                </div>
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
    )
}