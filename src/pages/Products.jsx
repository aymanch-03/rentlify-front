import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {ListProducts} from '../redux/reducers/productsReduser';

// const products = [
//     {
//       id: 1,
//       name: 'Earthen Bottle',
//       href: '#',
//       price: '$48',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
//       imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
//     },
//     {
//       id: 2,
//       name: 'Nomad Tumbler',
//       href: '#',
//       price: '$35',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
//       imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
//     },
//     {
//       id: 3,
//       name: 'Focus Paper Refill',
//       href: '#',
//       price: '$89',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
//       imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
//     },
//     {
//       id: 4,
//       name: 'Machined Mechanical Pencil',
//       href: '#',
//       price: '$35',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//       imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//         }
//   ]

export default function Products() {
    const dispatch = useDispatch();
    const Products = useSelector((state) => state.products.products);
    // console.log(Products);
    useEffect(() => {
        dispatch(ListProducts());
      }, [dispatch]);
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Products.map((product) => (
              <a key={product._id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src='https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.subcategory_id._id}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.sku}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }