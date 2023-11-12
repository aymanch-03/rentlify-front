// import { useState } from 'react';
// import { StarIcon } from '@heroicons/react/20/solid';
// import { RadioGroup } from '@headlessui/react';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetProducts } from '../redux/reducers/productSlice';
// import { useParams } from "react-router-dom";

// export default function Example() {
//   const dispatch = useDispatch();
//   const Products = useSelector((state) => state.products.products);
//     useEffect(() => {
//       dispatch(GetProducts());
//     }, [dispatch]);
//     console.log(Products);
//   return (
//     <div>
//     {Products.map((product) => (
//     <div key={product._id} className="bg-white">
//       <div  className="pt-6">
//         <nav aria-label="Breadcrumb">
//           <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//               <li >
//                 <div className="flex items-center">
//                   <a href={Products.href} className="mr-2 text-sm font-medium text-gray-900">
//                     {Products.name}
//                   </a>
//                 </div>
//               </li>
//             <li className="text-sm">
//               <a href={Products.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
//                 {Products.name}
//               </a>
//             </li>
//           </ol>
//         </nav>

//         {/* Image gallery */}
//          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
//           <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
//             <img
//               src={Products.images}
//               alt={Products.images}
//               className="h-full w-full object-cover object-center"
//             />
//           </div>

//         {/* Product info */}
//         <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
//           <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//             <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Products.name}</h1>
//           </div>

//           {/* Options */}
//           {/* <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"> */}
//             {/* Description and details */}
//             {/* <div>
//               <h3 className="sr-only">Description</h3>

//               <div className="space-y-6">
//                 <p className="text-base text-gray-900">{Products.description}</p>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   ))
// }
// </div>
// );

export default function Example() {
    const dispatch = useDispatch();
    const Product = useSelector((state) => state.product);
    console.log("zaka",Product);
  
    useEffect(() => {
      dispatch(GetProducts());
    }, [dispatch]);

    return (
      <div>
          <div key={Product._id} className="bg-white">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  <li>
                    <div className="flex items-center">
                      <a href={Product.href} className="mr-2 text-sm font-medium text-gray-900">
                        {Product.product_name}
                      </a>
                    </div>
                  </li>
                  <li className="text-sm">
                    <a href={Product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                      {Product.name}
                    </a>
                  </li>
                </ol>
              </nav>
              {/* Image gallery */}
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                  <img
                    src={Product.images}
                    alt={Product.images}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
  
                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Product.name}</h1>
                  </div>
  
                  Options
                  {/* <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"> */}
                  {/* Description and details */}
                  {/* <div>
                      <h3 className="sr-only">Description</h3>
  
                      <div className="space-y-6">
                        <p className="text-base text-gray-900">{product.description}</p>
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
  