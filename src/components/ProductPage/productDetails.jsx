import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux';
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetails({ listing, isLoading }) {
    const category = listing.category_id

    return !isLoading ? (
        <div className='p-10 col-span-7'>
            <h1 className='font-bold text-4xl'>
                {listing.listing_name}
            </h1>
            <h5 className='text-lg flex items-center capitalize p-1'>
                <Icon icon="ep:location" />
                <span className='p-2'>

                    {listing.city}{", "}{listing.province}
                </span>
            </h5>
            <div className="lg:grid-cols-4 p-1 grid lg:flex sm:grid-cols-2 gap-5 md:grid-cols-3">
                <div
                    className={`rounded-lg text-sm p-2.5 shadow-sm transition-all flex items-center justify-center gap-2`}
                >
                    <Icon icon={category?.category_icon} className="w-5 h-5" />
                    <span className="font-medium">
                        {category.category_name}
                    </span>
                </div>
               
            </div>
            <p className='lg:w-full my-4'>
                {listing.short_description}
            </p>
            <p className='w-full my-4'>

                {listing.long_description}

            </p>
            <Button variant="ghost" className="flex gap-1 group hover:bg-transparent text-[#318ed3] hover:text-[#318ed3]">
                See more
                <Icon icon="solar:arrow-right-line-duotone" className=' group-hover:ml-2 transition-all' />
            </Button>
        </div>
    ) : (
        <div className='p-10 col-span-7 h-[100vh] gap-2'>

            <Skeleton className="w-[80%] h-10 my-4" />

            <Skeleton className="w-[30%] h-6 my-2" />

            <Skeleton className="w-[50%] h-6 my-2" />

            <Skeleton className="w-[50%] h-6 my-2" />



        </div>
    );
}