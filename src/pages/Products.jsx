/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {ListProducts} from '../redux/reducers/productSlice';
import {ListSubcategories} from "../redux/reducers/subcategorieSlice";
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
      dispatch(ListSubcategories());
    }, [dispatch]);
    console.log(Products);
    return (
      <div className="bg-white ">
        <div className="flex justify-between items-center mx-14 max-w-7xl my-3 px-6 py-1 sm:px-6 sm:py-4 lg:max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
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
          </div>
  
          <div className="mx-14 max-w-7xl mt-6 py-1 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src="https://a0.muscache.com/im/pictures/miso/Hosting-741349420004012294/original/6ca1eca6-3526-4a98-bc82-3129dfec9c76.jpeg?im_w=720"
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
                    <p className="mt-1 text-sm text-gray-500">{product.address}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}DH</p>
                </div>
              </div>
            ))}
          </div>
      </div>
    )
  }