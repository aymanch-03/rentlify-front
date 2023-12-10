import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewOrder } from "../../redux/reducers/orderSlice";

export default function RequestToBook({ listing, dateFrom, dateTo, totalPrice, totalWithFees, days }) {
    const dispatch = useDispatch();
    const order = {
        order_item: {
            listing_id: listing._id,
            days: days,
            date_from: dateFrom,
            date_to: dateTo,
            nightly_price: listing.price,
            total_price: Number(totalPrice),
            total_with_fees: Number(totalWithFees)
        }
    }
    const submitOrder = (data) => {
        dispatch(createNewOrder(data));
    }

    return (
        <div>
            <Button className="p-8 text-xl m-2" onClick={() => { submitOrder(order)}}>Request to book</Button>
        </div>
    )
}