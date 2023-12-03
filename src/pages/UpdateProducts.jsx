/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/reducers/productSlice";
import { ListProducts } from "../redux/reducers/productSlice";
import { useParams } from "react-router-dom";
import { UpdateProduct } from "../redux/reducers/productSlice";
import { getAllCategories } from "../redux/reducers/categorySlice";
import { useNavigate } from "react-router-dom";

export default function Example() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Product = useSelector((state) => state.products.product);
  const categories = useSelector((state) => state.categories.data);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    listing_image: "",
    short_description: "",
    long_description: "",
    active: "",
    price: "",
    listing_name: "",
  });

  useEffect(() => {
    dispatch(getProducts(id));
    dispatch(getAllCategories());
    setFormData(Product);
  }, [dispatch]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(id);
      dispatch(UpdateProduct({ id, product: formData }));
      dispatch(ListProducts());

      // Redirect or perform any other actions after a successful update
      navigate(`/productDetails/${id}`);
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error and possibly show an error message to the user
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      <div className="space-y-12 m-14">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="product_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                listing_name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder={Product.listing_name}
                  name="product_name"
                  defaultValue={Product.product_name}
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="category_id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  name="category_id"
                  
                  onChange={(e) => handleInputChange(e)}
                  value={formData.category_id}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {/* Option for default value */}
                  <option value="">Select Subcategory</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="Long_description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Long_description
              </label>
              <div className="mt-2">
                <textarea
                  defaultValue={Product.long_description}
                  name="long_description"
                  rows={3}
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="short_description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                short_description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="short_description"
                  defaultValue={Product.short_description}
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="active"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                active
              </label>
              <div className="mt-2">
                <select
                  name="active"
                  defaultValue={Product.active}
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                   <option value="">Select status</option>
                  <option>TRUE</option>
                  <option>FALSE</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3 ">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                price
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="price"
                  defaultValue={Product.price}
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 m-10">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
