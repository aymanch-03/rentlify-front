import image1 from "../../assets/Image1.webp";
import image2 from "../../assets/Image2.webp";
import image3 from "../../assets/Image3.webp";
import image4 from "../../assets/Image4.webp";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
const images = [image1, image2, image3, image4]
export default function Pictures() {
    return (
        <div className="w-full gap-3 h-[30rem] p-10 grid grid-cols-12 grid-rows-2 ">
            <div className="col-span-8 row-span-2 rounded-3xl">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="h-full col-span-8 row-span-2 rounded-3xl">
                            <img className="w-full h-full object-cover rounded-3xl" src={images[0]} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-[full] h-full ">
                        <DialogFooter>
                            <div className="w-full h-full">
                                <img className="w-full h-full object-cover rounded-3xl" src={images[0]} />
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="col-span-4 rounded-3xl row-span-1">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="h-full col-span-8 row-span-2 rounded-3xl">
                            <img className="w-full object-cover h-full rounded-3xl" src={images[1]} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-[full] h-full ">
                        <DialogFooter>
                            <div className="w-full h-full">
                                <img className="w-full object-cover h-full rounded-3xl" src={images[1]} />
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="col-span-2 rounded-3xl row-span-1 ">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="h-full w-[full] col-span-8 row-span-2 rounded-3xl">
                            <img className="w-full object-cover h-full rounded-3xl " src={images[2]} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-[100vw]  h-full ">
                        <DialogFooter>
                            <div className="w-full h-full">
                                <img className="w-full object-cover h-full rounded-3xl " src={images[2]} />
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className={` cursor-pointer flex items-center justify-center w-full h-full col-span-2 rounded-3xl row-span-1 relative bg-[url(src/assets/Image4.webp)] bg-cover bg-center bg-no-repeat`}>
                <div className="w-full absolute inset-0 z-20 h-full rounded-3xl bg-black/70">
                </div>
                <p className="z-40 relative text-5xl text-white ">
                    +{images.length - 3}
                </p>
            </div>

        </div>
    )
}
