import BookingBox from "../components/ProductPage/bookProduct";
import Orderpage from "../components/ProductPage/orderPage";
import Pictures from "../components/ProductPage/pics";
import ProductDetails from "../components/ProductPage/productDetails";

export default function ProductPage(){
    return(
        <div className="p-4">
            <Pictures/>
            <div className="lg:grid grid-cols-12">
            <ProductDetails/>
            <BookingBox/>
            </div> 
        </div>
    )
}