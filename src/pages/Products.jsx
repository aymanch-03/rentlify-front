import BookingBox from "../components/ProductPage/bookProduct";
import Pictures from "../components/ProductPage/pics";
import ProductDetails from "../components/ProductPage/productDetails";

export default function ProductPage(){
    return(
        <div className="p-4">
            <Pictures/>
            <div className="flex">
            <ProductDetails/>
            <BookingBox/>
            </div>
        </div>
    )
}