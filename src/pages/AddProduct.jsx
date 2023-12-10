/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../redux/reducers/categorySlice";
import { AddListing, ListListings } from "../redux/reducers/listingSlice";
import { useToast } from "@/components/ui/use-toast";

export default function Example() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState(null);
  const categories = useSelector((state) => state.categories.data);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const [imageSelected, setImageSelected] = useState([]);
  // console.log("rr", imageSelected);
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
    bed: "",
    room: "",
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
        bed,
        room,
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
        toast({
          variant: "destructive",
          title: "Please fill out all required fields",
        });
        return;
      }
      if (imageSelected.length < 4) {
        setError("Please select at least 4 images.");
        return;
      }
      setError(null);
      const imageUrls = await Promise.all(
        imageSelected.map(async (file) => {
          // console.log("tt", imageSelected);
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

      dispatch(AddListing(updatedFormData));

      dispatch(ListListings());

      navigate("/office/listings");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <form className="space-y-6">
        <div className="space-y-12 m-14">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Listing Images
            </h2>

            <div className="flex items-center justify-center w-full">
              <div className="sm:col-span-3" />
              <label
                htmlFor="listing_image"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG, or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  type="file"
                  name="listing_image"
                  id="listing_image"
                  onChange={(event) =>
                    setImageSelected((prevImages) => [
                      ...prevImages,
                      ...event.target.files,
                    ])
                  }
                  multiple
                  className="hidden"
                />
              </label>
            </div>
            {error && (
              <div className="text-red-600">
                <p>{error}</p>
              </div>
            )}
            {imageSelected.length > 0 && (
              <div
                className={`mt-3 ${
                  imageSelected.length > 8 ? "overflow-auto" : ""
                } max-w-full`}
              >
                <label className="block text-gray-700 text-sm font-bold">
                  Uploaded Images
                </label>
                <div className="flex space-x-2 mt-1">
                  {imageSelected.map((file, index) => (
                    <div key={index} className={`relative w-40 flex-shrink-0`}>
                      <span
                        className="absolute top-1 right-1 p-2 cursor-pointer bg-white rounded-full opacity-80 transition-opacity duration-300"
                        onClick={() =>
                          setImageSelected(
                            imageSelected.filter((img, i) => i !== index)
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </span>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`uploaded-${index}`}
                        className="w-full h-[155px] object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="listing_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Listing Name
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
                htmlFor="sku"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                SKU
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="sku"
                  placeholder="sku"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
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
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
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
            <div className="sm:col-span-2">
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

            <div className="sm:col-span-full">
              <label
                htmlFor="Long_description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Long Description
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
                Short Description
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
                Status
              </label>
              <div className="mt-2">
                <select
                  name="active"
                  onChange={(e) => handleInputChange(e)}
                  placeholder="status"
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                >
                  <option value="">Select status</option>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="bed"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Beds
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="bed"
                  placeholder="Number of beds"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="room"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bedrooms
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="room"
                  placeholder="Number of rooms"
                  onChange={(e) => handleInputChange(e)}
                  className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        {/* </div> */}
      </form>
    </>
  );
}
