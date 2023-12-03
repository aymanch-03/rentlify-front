import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import PayWith from "./payment";
import TotalPrice from "./totalPrice";
import Contact from "./contact";
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const product = {
    _id: "655b1612007341e440355459",
    sku: "148803",
    product_image: "https://res.cloudinary.com/rentlify/image/upload/v1700468241/products/ww9lewgvrmba0kyuehhs.webp",
    product_name: "dragon t- shirt",
    subcategory_id: "6531359e36f67c30f3ff60fc",
    short_description: "dragon t - shirt  zakaria description",
    long_description: "tghchthgbchtgbghtgdbdhtdgbc",
    price: 24.99,
    discount_price: 0,
    active: false,
    __v: 0,
}

export default function OrderPage() {

    return (
        <div className=" py-20 w-full">
            <div className="grid grid-cols-12 w-full">
                <div className="col-span-6 flex items-center justify-end p-0">
                    <Link to="/product">
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
                                    <p>Sep 23 - 28, 2024</p>
                                </div>
                                <div>
                                    <Button variant="link" className="text-lg">Edit</Button>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-4 ">
                                        <h5 className="font-medium text-xl">Guests</h5>
                                        <p>2 guests, 5 children</p>
                                    </div>
                                    <div>
                                        <Button variant="link" className="text-lg">Edit</Button>
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
                    <div className="sticky top-0 p-10">
                        <TotalPrice />
                    </div>
                </div>
            </div>
        </div >
    )
}