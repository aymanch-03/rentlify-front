import { Icon } from "@iconify/react";
import image1 from "../../assets/Image2.webp";
import { useState } from "react";
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

export default function TotalPrice() {
    const totalPrice = (product.price * 5).toFixed(2);
    const serviceFees = (totalPrice * 0.2).toFixed(2);
    const totalWithFees = (totalPrice - (-serviceFees)).toFixed(2);
    
    

    return (
        <div className="max-w-[500px] flex flex-col gap-4 border border-inherit rounded-2xl p-6 m-10 ">
            <div className="flex gap-4">
                <div className="">
                    <img className="h-[100px] w-[150px] rounded-2xl" src={image1} />
                </div>
                <div className="w-10/12">
                    <h1 className="font-bold">{product.product_name}</h1>
                    <p className="text-xs">{product.short_description}</p>
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
                    <p>MAD{" "}{product.price} x {5} nights</p>
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
    )
}