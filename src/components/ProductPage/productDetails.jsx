import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button"

export default function ProductDetails() {

    const categories = [
        {
            link: "Woodburner",
            icon: "ph:campfire",
        },
        {
            link: "Dog Friendly",
            icon: "cil:animal",
        },
        {
            link: "In the Woods",
            icon: "ph:tree",
        },
        {
            link: "Hot Tubs",
            icon: "tabler:soup",
        },
    ]
    return (
        <div className='p-10 w-8/12'>
            <h1 className='font-bold text-4xl'>Beach Farm Holiday Cottages</h1>
            <h5 className='text-lg flex items-center'>
            <Icon icon="ep:location"/>
                Location: Wakefield, England</h5>
            <div className="flex p-1">
                {categories.map((category) => {
                    return (
                        <div className="flex items-center max-w-fit m-1 p-2 rounded-xl shadow-md text-sm">
                            <Icon className='w-9' icon={category.icon} color="#9fa2a4" />
                            {category.link}
                        </div>

                    )
                })}
            </div>
            <p className='w-full my-4'>
                Situated in a picturesque aea called Breckland in South Norfolk,
                Settle is located in one of the sunniest terrains in the UK.
                Our skies are often blue and untroubled by rain.
            </p>
            <p className='w-5/6 my-4'>
                Nearby Thetford and Kings Forests offer the largest,
                lowland woodlands in the country,
                with miles of tranquil trackways and paths to explore on foot,
                cycle and horseback
            </p>
            <Button variant="ghost" className="flex gap-1 group hover:bg-transparent text-[#318ed3] hover:text-[#318ed3]">
                See more 
                <Icon icon="solar:arrow-right-line-duotone" className=' group-hover:ml-2 transition-all' />
                </Button>
        </div>
    )
}