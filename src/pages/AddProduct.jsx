/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListProducts, AddProduct } from "../redux/reducers/productSlice";
import {ListSubcategories} from "../redux/reducers/subcategorieSlice";
import { useNavigate } from 'react-router-dom';
// import { CloudinaryContext, Image } from "cloudinary-react";
import axios from 'axios'; 

export default function Example() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subcategories = useSelector(state => state.subcategories.subcategories);
  useEffect(() => {
    dispatch(ListSubcategories());
  }, [dispatch]);
  // console.log(subcategories);
  const [imageSelected, setImageSelected] = useState([]);
  console.log('rr',imageSelected)
  const [formData, setFormData] = useState({
    sku:"",
    product_image: [],
    address:"",
    short_description: "",
    subcategory_id:"",
    long_description: "",
    active: "",
    price: "",
    product_name: ""
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
      const { sku, address, product_image, short_description, subcategory_id, long_description, active, price, product_name } = formData;
      if (!sku || !address || !product_image || !short_description || !subcategory_id || !long_description || !active || !price || !product_name) {
        console.error('Please fill out all required fields');
        return;
      }
      const imageUrls = await Promise.all(
        imageSelected.map(async (file) => {
          console.log("tt",imageSelected);
          const formDataToSend = new FormData();
          formDataToSend.append("file", file);
          formDataToSend.append("upload_preset", "products_preset");

          const response = await axios.post("https://api.cloudinary.com/v1_1/rentlify/image/upload", formDataToSend);
          console.log(response);
          return response.data.secure_url;
      }))
    
      
      const updatedFormData = {
        ...formData,
        product_image: imageUrls,
      };
      
      dispatch(AddProduct(updatedFormData));
      dispatch(ListProducts());
      
      navigate("/products");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  return (
    <form  className="space-y-6">
      <div className="space-y-12 m-14">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="product_image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                product_image
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="product_image"
                  onChange={(event) => 
                    setImageSelected((prevImages) => [
                      ...prevImages,
                      ...event.target.files,
                    ])
                  }
                  multiple ={true}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* <CloudinaryContext cloudName="rentlify">
                {formData.product_image.map((url, index) => (
                  <Image key={index} publicId={typeof url === 'string' ? url : ''} width="50" height="50" />
                ))}
              </CloudinaryContext> */}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="product_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                product_name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="product_name"
                  placeholder="Product Name"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
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
          htmlFor="subcategory_id"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Subcategory Id
        </label>
        <div className="mt-2">
          <select
            name="subcategory_id"
            onChange={(e) => handleInputChange(e)}
            value={formData.subcategory_id}
            className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {/* Option for default value */}
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.subcategory_name}
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
