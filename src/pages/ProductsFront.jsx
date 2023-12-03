import { useDispatch, useSelector } from "react-redux";
import BookingBox from "../components/ProductPage/bookProduct";
import Orderpage from "../components/ProductPage/orderPage";
import Pictures from "../components/ProductPage/pics";
import ProductDetails from "../components/ProductPage/productDetails";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProducts } from "../redux/reducers/productSlice";

export default function ProductPage() {
    const { id } = useParams();
    const listing = useSelector((state) => state.products.product);
    console.error("product: ", listing);
    console.error("id: ", id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts(id));
      }, [dispatch]);
    
    return (
        <div className="p-4">
            <Pictures listing={listing} />
            <div className="lg:grid grid-cols-12">
                <ProductDetails  listing={listing}/>
                <BookingBox id={id} listing={listing}/>
            </div>
        </div>
    )
}