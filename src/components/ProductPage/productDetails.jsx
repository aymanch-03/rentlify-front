import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux';

export default function ProductDetails() {

    const dispatch = useDispatch();
    const product = {
        _id: "655b1612007341e440355459",
        sku: "148803",
        product_image: ["https://res.cloudinary.com/rentlify/image/upload/v1700468241/products/ww9lewgvrmba0kyuehhs.webp"],
        product_name: "dragon t- shirt",
        subcategory_id: ["6531359e36f67c30f3ff60fc", "6531359e36f67c30f3ff60fc", "6531359e36f67c30f3ff60fc"],
        short_description: "dragon t - shirt  zakaria description",
        long_description: "tghchthgbchtgbghtgdbdhtdgbc",
        price: 24.99,
        discount_price: 0,
        address: "agadir, morroco",
        active: false,
        __v: 0,
    }
    // dispatch(getSubcategoryById(id))
    // const subcategories = product.subcategory_id.map((subcategory)=>{
    //     return()
    // })
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
        <div className='p-10 lg:w-8/12'>
            <h1 className='font-bold text-4xl'>
                {/* Beach Farm Holiday Cottages */}
                {product.product_name}
            </h1>
            <h5 className='text-lg flex items-center capitalize p-1'>
                <Icon icon="ep:location" />
                {/* Location: Wakefield, England */}
                {product.address}
            </h5>
            <div className="lg:grid-cols-4 p-1 grid sm:grid-cols-2 gap-5 md:grid-cols-3">
                {categories.map((category) => {
                    return (
                        <div className="flex items-center w-fit m-1 py-2 px-4 rounded-xl shadow-md text-sm">
                            <Icon className='w-9' icon={category.icon} color="#9fa2a4" />
                            {category.link}
                        </div>
                    )
                })}
            </div>
            <p className='lg:w-full my-4'>
                Situated in a picturesque aea called Breckland in South Norfolk,
                Settle is located in one of the sunniest terrains in the UK.
                Our skies are often blue and untroubled by rain.
                {product.short_description}
            </p>
            <p className='w-full my-4'>
                Nearby Thetford and Kings Forests offer the largest,
                lowland woodlands in the country,
                with miles of tranquil trackways and paths to explore on foot,
                cycle and horseback
                {product.long_description}

            </p>
            <Button variant="ghost" className="flex gap-1 group hover:bg-transparent text-[#318ed3] hover:text-[#318ed3]">
                See more
                <Icon icon="solar:arrow-right-line-duotone" className=' group-hover:ml-2 transition-all' />
            </Button>
        </div>
    )
}