import { Button } from "@/components/ui/button";

export default function Contact() {
    return (
        <div className="p-0 w-full">
            <div className="flex flex-col gap-4 p-1">

            <h1 className="text-2xl font-medium p-0">Required for your trip</h1>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4 ">
                    <h5 className="font-medium text-lg ">Message the Host
                    </h5>
                    <p>Share why you're traveling, who's coming with you, and what you love about the space.</p>
                </div>
                <div>
                    <Button variant="outline" className="text-sm">Add</Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4 ">
                    <h5 className="font-medium text-lg ">Phone number
                    </h5>
                    <p>Add and confirm your phone number to get trip updates.</p>
                </div>
                <div>
                    <Button variant="outline" className="text-sm">Add</Button>
                </div>
            </div>
            </div>
        </div>
    )
}