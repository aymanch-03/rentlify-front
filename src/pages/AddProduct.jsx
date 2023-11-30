/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListProducts, AddProduct } from "../redux/reducers/productSlice";
import { getAllCategories } from "../redux/reducers/categorySlice";
import { useNavigate } from "react-router-dom";
// import { CloudinaryContext, Image } from "cloudinary-react";
import axios from "axios";

export default function Example() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.data);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  // console.log(subcategories);
  const [imageSelected, setImageSelected] = useState([]);
  console.log("rr", imageSelected);
  const [formData, setFormData] = useState({
    sku: "",
    listing_image: [],
    province: "",
    short_description: "",
    category_id: "",
    long_description: "",
    active: "",
    city: "",
    price: "",
    listing_name: "",
  });

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
      const {
        sku,
        province,
        city,
        listing_image,
        short_description,
        category_id,
        long_description,
        active,
        price,
        listing_name,
      } = formData;
      if (
        !sku ||
        !province ||
        !city ||
        !listing_image ||
        !short_description ||
        !category_id ||
        !long_description ||
        !active ||
        !listing_name ||
        !price
      ) {
        console.error("Please fill out all required fields");
        return;
      }
      const imageUrls = await Promise.all(
        imageSelected.map(async (file) => {
          console.log("tt", imageSelected);
          const formDataToSend = new FormData();
          formDataToSend.append("file", file);
          formDataToSend.append("upload_preset", "products_preset");

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/rentlify/image/upload",
            formDataToSend
          );
          // console.log(response);
          return response.data.secure_url;
        })
      );

      const updatedFormData = {
        ...formData,
        listing_image: imageUrls,
      };
      console.log(formData);

      dispatch(AddProduct(updatedFormData));
      dispatch(ListProducts());

      navigate("/products");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <form className="space-y-6">
      <div className="space-y-12 m-14">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="listing_image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                listing_image
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="listing_image"
                  onChange={(event) =>
                    setImageSelected((prevImages) => [
                      ...prevImages,
                      ...event.target.files,
                    ])
                  }
                  multiple={true}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="listing_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                listing_name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="listing_name"
                  placeholder="listing_name"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="province"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="province"
                  placeholder="province"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                city
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  placeholder="city"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="sku"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                SKU
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="sku"
                  placeholder="sku"
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
                category_id
              </label>
              <div className="mt-2">
                <select
                  name="category_id"
                  onChange={(e) => handleInputChange(e)}
                  value={formData.category_id}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                  name="long_description"
                  rows={3}
                  type="text"
                  placeholder="Long Description"
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
                  placeholder="Short Description"
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
                  onChange={(e) => handleInputChange(e)}
                  placeholder="status"
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>TRUE</option>
                  <option>FALSE</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
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
                  placeholder="Price"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 m-10">
            <button
              type="submit"
              onClick={handleSubmit}
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
