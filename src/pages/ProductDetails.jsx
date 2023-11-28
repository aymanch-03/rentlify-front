/* eslint-disable no-unused-vars */
// import { useState } from 'react';
// import { StarIcon } from '@heroicons/react/20/solid';
// import { RadioGroup } from '@headlessui/react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../redux/reducers/productSlice";
import { useParams } from "react-router-dom";
// import UpdateProductDialog from "../components/products/UpdatEProductDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PackagePlus } from "lucide-react";
// import InputForm from "./addProduct";
import { Link } from "react-router-dom";

export default function Example() {
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.products.product);
  console.log(Product);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(GetProducts(id));
  }, [dispatch, id]);

  return (
    <div>
      <div key={Product._id} className="bg-white">
        <div>
          <div className="flex justify-between items-center mx-14 max-w-7xl px-6 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {Product.product_name}
            </h1>
            <Link to={`/UpdateProduct/${id}`}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="p-4" variant="outline">
                    <PackagePlus className="w-4 mr-2" />
                    Update Product
                  </Button>
                </DialogTrigger>
              </Dialog>
            </Link>
          </div>
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div key={id} className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              // src={Product.product_image[0]}
              // alt={Product.product_image[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                // src={Product.product_image[1]}
                // alt={Product.product_image[1]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                // src={Product.product_image[2]}
                // alt={Product.product_image[2]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          {/* <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={Product.product_image[3]}
              alt={Product.product_image[3]}
              className="h-full w-full object-cover object-center"
            />
          </div> */}
        </div>
        </div>
            <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:grid lg:max-w-6xl  lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
              <div>
              <div className="space-y-6">
                  <p className="text-3xl text-gray-1000 pb-8">
                    Description
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-lg text-gray-900 pb-8">
                    {/* {Product.long_description} */}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* <p className="text-base text-gray-1000 ">Price: {Product.price}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
