// import { useState } from 'react';
// import { StarIcon } from '@heroicons/react/20/solid';
// import { RadioGroup } from '@headlessui/react';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GetProducts } from '../redux/reducers/productSlice';
import { useParams } from "react-router-dom";



export default function Example() {
    const dispatch = useDispatch();
    const Product = useSelector((state) => state.products.product);
    const { id } = useParams();
    console.log(Product);
    useEffect(() => {
      dispatch(GetProducts(id));
    }, [dispatch, id]);

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
                    {/* <a href={Product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                      {Product.product_name}
                    </a> */}
                  </li>
                </ol>
              </nav>
              {/* Image gallery */}
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
                  <img
                    src={Product.product_image}
                    alt={Product.product_image}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
  
                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Product.product_name}</h1>
                  </div>
                  {/* Description and details */}
                  <div>
                      <h3 className="sr-only">Description</h3>
  
                      <div className="space-y-6">
                        <p className="text-base text-gray-1000">{Product.long_description}</p>
                      </div>
                      <div className="space-y-6">
                        <p className="text-base text-gray-900">{Product.short_description}</p>
                      </div>
                      
                      <div className="space-y-6">
                        <p className="text-base text-gray-900">{Product.price}</p>
                      </div>

                    </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
  