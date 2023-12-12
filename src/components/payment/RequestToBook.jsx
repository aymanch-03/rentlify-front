import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TotalPrice from "../ProductPage/totalPrice";
import StripeContainer from "./StripeContainer";

export default function RequestToBook({
  listing,
  dateFrom,
  dateTo,
  totalPrice,
  totalWithFees,
  days,
}) {
  const order = {
    order_item: {
      listing_id: listing._id,
      days: days,
      date_from: dateFrom,
      date_to: dateTo,
      nightly_price: listing.price,
      total_price: Number(totalPrice),
      total_with_fees: Number(totalWithFees),
    },
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="p-8 text-xl m-2">Request to book</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[70vw]">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-6">
              Confirm Your Reservation
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-row h-full items-start gap-4">
            <div className="w-1/2 h-full flex flex-col justify-between gap-4 ">
              <TotalPrice
                className="border-none "
                listing={listing}
                days={days}
                totalPrice={totalPrice}
              />
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </div>
            <div className="w-[1px] h-[90%] bg-slate-200"></div>
            <div className="w-1/2 h-full ">
              <StripeContainer order={order} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
