import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { useState } from "react";
import paypalIcon from "../../assets/PayPal.webp";

export default function PayWith() {
    const [selectedOption, setSelectedOption] = useState('creditCard');


    const handleChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium p-1">Pay with</h1>
            <Select name="option" defaultValue="creditCard" onValueChange={(value) => handleChange(value)}>
                <SelectTrigger className="h-16">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent >
                    <SelectGroup>
                        <SelectItem value="creditCard">Credit or debit card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="googlePay">Google Pay</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {selectedOption === 'creditCard' && (
                <div className="flex flex-col gap-4">
                    <div className="w-full grid grid-cols-2">
                        <div className="col-span-2 border border-inherit rounded-t-xl mb-[-1px]">
                            <Input className="h-16 rounded-t-xl border-none" type="number" placeholder="Card number" />
                        </div>
                        <div className="border border-inherit rounded-bl-xl">
                            <Input className="h-16 rounded-bl-xl border-none" type="number" placeholder="Expiration" />
                        </div>
                        <div className="border border-inherit rounded-br-xl ml-[-1px]">
                            <Input className="h-16 rounded-br-xl border-none" type="number" placeholder="CVV" />
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="h-16 flex justify-between items-center border rounded-md p-4">
                                <div>
                                    <Label className="text-xs">Country/region</Label>
                                    <p>Morocco</p>
                                </div>
                                <Icon icon="formkit:down" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[40vw] w-[40vw] h-[70vh] p-0 rounded-none">
                            <div className="w-full h-full ">
                                <ScrollArea className="">
                                    <div className="">
                                        <div className="w-full h-full p-4  flex justify-center">
                                            <h4 className="m-4 text-lg font-medium leading-none">Country/region</h4>

                                        </div>
                                    </div>
                                </ScrollArea>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            {selectedOption === 'paypal' && (
                <div>
                    <Button className="w-[150px] p-6" variant="outline" ><img className="w-auto" src={paypalIcon} /></Button>
                </div>
            )}
        </div >
    )
}