import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {ListProducts} from '../redux/reducers/productSlice';
import { Link } from "react-router-dom";

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
    useEffect(() => {
      dispatch(ListProducts());
    }, [dispatch]);
    console.log(Products);
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src='https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/productDetails/${product._id}`}>
                        {/* href={product.href} */}
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product_name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.product_image}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }