import { useDispatch, useSelector } from "react-redux";
import BookingBox from "../components/ProductPage/bookProduct";
import Orderpage from "./orderFront";
import Pictures from "../components/ProductPage/pics";
import ProductDetails from "../components/ProductPage/productDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/reducers/productSlice";

export default function ProductPage() {
    const listing = useSelector((state) => state.products.product);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    console.error("product: ", listing);
    console.error("id: ", id);

    const dispatch = useDispatch();
    useEffect(() => {

    try {
        dispatch(getProducts(id));
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    }, [dispatch, id]);


    return (
        <div className="p-4 max-w-7xl mx-auto">
            <Pictures listing={listing} isLoading={isLoading}/>
            <div className="lg:grid grid-cols-12">
                <ProductDetails  listing={listing} isLoading={isLoading}/>
                <BookingBox id={id} listing={listing} isLoading={isLoading}/>
            </div>
        </div>
    )
}