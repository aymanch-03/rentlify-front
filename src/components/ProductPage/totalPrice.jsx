import { Icon } from "@iconify/react";
import image1 from "../../assets/Image2.webp";
import { useState } from "react";
const listing = {
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

export default function TotalPrice({ listing, days, totalPrice, isLoading }) {
    const serviceFees = (totalPrice * 0.1).toFixed(2);
    const totalWithFees = (totalPrice - (-serviceFees)).toFixed(2);
    console.log('image: ', listing.listing_image[0])

    return !isLoading ? (
        <div className="lg:max-w-[500px] max-w-full w-[100%] flex flex-col gap-4 lg:border border-inherit rounded-2xl lg:p-6 lg:m-10 ">
            <div className="flex gap-4">
                <div className="">
                    <img className="h-[100px] w-[150px] rounded-2xl" src={listing.listing_image[0]} />
                </div>
                <div className="w-10/12">
                    <h1 className="font-bold">{listing.product_name}</h1>
                    <p className="text-xs">{listing.short_description}</p>
                    <div className="w-[55px] flex justify-between items-center">
                        <Icon className="w-3 h-3" icon="ph:star" />
                        <p className="text-xs pt-1">4.95</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex flex-col gap-4">
                <h1 className="font-bold">Price details</h1>
                <div className="flex justify-between">
                    <p>MAD{" "}{listing.price} x {days} nights</p>
                    <p>MAD{" "}{totalPrice}</p>
                </div>
                <div className="flex justify-between">
                    <p>Rentlify service fee</p>
                    <p>MAD{" "}{serviceFees}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p className="font-medium">Total (MAD)</p>
                    <p className="font-medium">MAD{" "} {totalWithFees}</p>
                </div>
            </div>
        </div>
    ) : (
        <div>

        </div>
    )
}