/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {ListProducts} from '../redux/reducers/productSlice';
// import ProductDialog from '../components/products/addProductDialog';
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Products() {
    const dispatch = useDispatch();
    const Products = useSelector((state) => state.products.products);
    useEffect(() => {
      dispatch(ListProducts());
    }, [dispatch]);
    console.log(Products);
    return (
      <div className="bg-white">
        {/* <ProductDialog /> */}
        <Link to={"/addproduct"}>
      <Dialog >
        <DialogTrigger className="px-4 py-16" asChild>
          <Button className="p-4" variant="outline">
            <PackagePlus className="w-4 mr-2" />
            Add Product
          </Button>
        </DialogTrigger>
      </Dialog>
    </Link>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.product_image}
  
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/productDetails/${product._id}`}>
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