import { useEffect, useState } from "react";
import image2 from "../../assets/Image1.webp";
import image1 from "../../assets/Image2.webp";
import image4 from "../../assets/Image3.webp";
import image3 from "../../assets/Image4.webp";
import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const images = [image1, image2, image3, image4]
export default function Pictures() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };
    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? images.length - 1 : prevSlide - 1
        );
    };
    
    return (
        <div className="w-full lg:gap-3 lg:h-[30rem] lg:p-10 lg:grid lg:grid-cols-12 md:grid-rows-2">
            <div className="col-span-8 row-span-2 rounded-3xl">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="h-full col-span-8 row-span-2 rounded-3xl flex justify-center items-center">
                            <img className="w-full h-full object-cover rounded-3xl" src={images[0]} onClick={() => { setCurrentSlide(0) }} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[80vw] w-[80vw] h-[95vh] p-4  bg-transparent border-none shadow-none">
                        <div className="w-full h-full  flex items-center justify-center">
                            <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={prevSlide}>
                                <Icon icon="solar:alt-arrow-left-outline" className="w-6 h-6" />
                            </Button>
                            <div className="w-[65vw] m-4">
                                <img className="m-auto w-auto object-cover h-[80vh]" src={images[currentSlide]} />
                            </div>
                            <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={nextSlide}>
                                <Icon icon="solar:alt-arrow-right-line-duotone" className="w-6 h-6" />
                            </Button>
                        </div>
                        <span className="m-auto">{currentSlide + 1}/{images.length}</span>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="col-span-4 rounded-3xl row-span-1 lg:block hidden">
            <Dialog>
                    <DialogTrigger asChild>
                        <div className="h-full col-span-8 row-span-2 rounded-3xl">
                            <img className="w-full h-full object-cover rounded-3xl" src={images[1]} onClick={() => { setCurrentSlide(1) }} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[80vw] w-[80vw] h-[95vh] p-4  bg-transparent border-none shadow-none">
                        <div className="w-full h-full  flex items-center justify-center">
                            <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={prevSlide}>
                                <Icon icon="solar:alt-arrow-left-outline" className="w-6 h-6" />
                            </Button>
                            <div className="w-[70vw]">
                                <img className="m-auto w-auto object-cover h-[80vh]" src={images[currentSlide]} />
                            </div>
                            <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={nextSlide}>
                                <Icon icon="solar:alt-arrow-right-line-duotone" className="w-6 h-6" />
                            </Button>
                        </div>
                        <span className="m-auto">{currentSlide + 1}/{images.length}</span>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="col-span-2 rounded-3xl row-span-1 lg:block hidden">
            <Dialog>
                    <DialogTrigger asChild>
                        <div className="h-full col-span-8 row-span-2 rounded-3xl flex justify-center items-center">
                            <img className="w-full h-full object-cover rounded-3xl" src={images[2]} onClick={() => { setCurrentSlide(2) }} />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[80vw] w-[80vw] h-[95vh] p-4 bg-transparent border-none shadow-none">
                        <div className="w-full h-full  flex items-center justify-center">
                            <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={prevSlide}>
                                <Icon icon="solar:alt-arrow-left-outline" className="w-6 h-6" />
                            </Button>
                            <div className="w-[70vw]">
                                <img className="m-auto w-auto object-cover h-[80vh]" src={images[currentSlide]} />
                            </div>
                            <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={nextSlide}>
                                <Icon icon="solar:alt-arrow-right-line-duotone" className="w-6 h-6" />
                            </Button>
                        </div>
                        <span className="m-auto">{currentSlide + 1}/{images.length}</span>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="col-span-2 hidden lg:block ">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className={`cursor-pointer flex items-center justify-center w-full h-full rounded-3xl row-span-1 relative bg-[url(src/assets/Image3.webp)] bg-cover bg-center bg-no-repeat`}>
                            <div className="w-full absolute inset-0 z-20 h-full rounded-3xl bg-black/70">
                            </div>
                            <p className="z-40 relative text-5xl text-white ">
                                +{images.length - 3}
                            </p>
                        </div>
                    </DialogTrigger>
                    <DialogContent className=" max-w-[100vw] w-[100vw] h-[100vh] p-0 rounded-none">
                        <div className="w-full h-full flex items-center justify-center">
                            <ScrollArea className="w-full h-full rounded-md border">
                                <div className="w-full h-full flex items-center justify-center">
                                <div className="w-[70vw] h-[90vh] p-4">
                                    <h4 className="m-4 text-lg font-medium leading-none">Photos</h4>
                                    <div className="w-full h-[80vh] grid gap-4 grid-cols-2 grid-rows-[400px] p-4">
                                        {images.map((image, index) => {
                                            if (index % 3 === 0) {
                                                return (
                                                    <div className="col-span-2">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <div className="h-[400px] col-span-8 row-span-2 rounded-3xl">
                                                                    <img className="w-full h-full object-cover rounded-3xl" src={images[index]} onClick={() => { setCurrentSlide(index) }} />
                                                                </div>
                                                            </DialogTrigger>
                                                            <DialogContent className=" max-w-[100vw] w-[100vw] h-[100vh] p-10 bg-transparent">
                                                                <div className="w-full h-full  flex items-center justify-center">
                                                                    <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={prevSlide}>
                                                                        <Icon icon="solar:alt-arrow-left-outline" className="w-6 h-6" />
                                                                    </Button>
                                                                    <div className="w-[70vw] ">
                                                                        <img className="m-auto w-auto object-cover h-[80vh]" src={images[currentSlide]} />
                                                                    </div>
                                                                    <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={nextSlide}>
                                                                        <Icon icon="solar:alt-arrow-right-line-duotone" className="w-6 h-6" />
                                                                    </Button>
                                                                </div>
                                                                <span className="m-auto">{currentSlide + 1}/{images.length}</span>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                )
                                            }
                                            if (index % 3 === 1) {
                                                return (
                                                    <div className="">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <div className="h-[400px] col-span-8 row-span-2 rounded-3xl">
                                                                    <img className="w-full h-full object-cover rounded-3xl" src={images[index]} onClick={() => { setCurrentSlide(index) }} />
                                                                </div>
                                                            </DialogTrigger>
                                                            <DialogContent className=" max-w-[100vw] w-[100vw] h-[100vh] p-10 bg-transparent">
                                                                <div className="w-full h-full  flex items-center justify-center">
                                                                    <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={prevSlide}>
                                                                        <Icon icon="solar:alt-arrow-left-outline" className="w-6 h-6" />
                                                                    </Button>
                                                                    <div className="w-[70vw] ">
                                                                        <img className="m-auto w-auto object-cover h-[80vh]" src={images[currentSlide]} />
                                                                    </div>
                                                                    <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={nextSlide}>
                                                                        <Icon icon="solar:alt-arrow-right-line-duotone" className="w-6 h-6" />
                                                                    </Button>
                                                                </div>
                                                                <span className="m-auto">{currentSlide + 1}/{images.length}</span>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                )
                                            }
                                            if (index % 3 === 2) {
                                                return (
                                                    <div className="">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <div className="h-[400px] col-span-8 row-span-2 rounded-3xl">
                                                                    <img className="w-full h-full object-cover rounded-3xl" src={images[index]} onClick={() => { setCurrentSlide(index) }} />
                                                                </div>
                                                            </DialogTrigger>
                                                            <DialogContent className=" max-w-[100vw] w-[100vw] h-[100vh] p-10 bg-transparent">
                                                                <div className="w-full h-full  flex items-center justify-center">
                                                                    <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={prevSlide}>
                                                                        <Icon icon="solar:alt-arrow-left-outline" className="w-6 h-6" />
                                                                    </Button>
                                                                    <div className="w-[70vw] ">
                                                                        <img className="m-auto w-auto object-cover h-[80vh]" src={images[currentSlide]} />
                                                                    </div>
                                                                    <Button className="w-10 h-10 p-2 rounded-3xl hover:bg-zinc-400" variant="ghost" onClick={nextSlide}>
                                                                        <Icon icon="solar:alt-arrow-right-line-duotone" className="w-6 h-6" />
                                                                    </Button>
                                                                </div>
                                                                <span className="m-auto">{currentSlide + 1}/{images.length}</span>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
