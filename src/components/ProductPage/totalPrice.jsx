import { Icon } from "@iconify/react";
import image1 from "../../assets/Image2.webp";

export default function TotalPrice() {
    return (
        <div className="max-w-[500px] flex flex-col gap-4 border border-inherit rounded-2xl p-6 fixed m-4">
            <div className="flex gap-4">
                <div className="">
                    <img className="h-[100px] w-[200px] rounded-2xl" src={image1} />
                </div>
                <div>
                    <h1 className="font-bold">Tiny home</h1>
                    <p className="text-xs">Unique and secluded AirStrip with breathtaking Highland Views </p>
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
                    <p>MAD 2,162.38 x 5 nights</p>
                    <p>MAD10,811.90</p>
                </div>
                <div className="flex justify-between">
                    <p>Rentlify service fee</p>
                    <p>MAD1,526.39</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p className="font-medium">Total (MAD)</p>
                    <p className="font-medium">MAD12,338.29</p>
                </div>
            </div>
        </div>
    )
}