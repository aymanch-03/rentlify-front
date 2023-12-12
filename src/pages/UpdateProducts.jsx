/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../redux/reducers/categorySlice";
import {
  GetListing,
  ListListings,
  UpdateListing,
} from "../redux/reducers/listingSlice";

export default function Example() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listing = useSelector((state) => state.listings.listing);
  const categories = useSelector((state) => state.categories.data);

  const { id } = useParams();

  const [listing_name, setListing_name] = useState(listing.listing_name || "");
  const [listing_image, setListing_image] = useState(
    listing.listing_image || []
  );
  const [editedImages, setEditedImages] = useState([]);
  const [category_id, setCategory_id] = useState(listing.category_id._id || "");
  const [active, setActive] = useState(listing.active );
  const [price, setPrice] = useState(listing.price);
  const [long_description, setLong_description] = useState(
    listing.long_description || ""
  );
  const [short_description, setShort_description] = useState(
    listing.short_description || ""
  );
  const [city, setCity] = useState(listing.city);
  const [province, setProvince] = useState(listing.province || "");
  const [bed, setBed] = useState(listing.bed);
  const [room, setRoom] = useState(listing.room);
  const [max_guests, setMax_guests] = useState(listing.max_guests);

  useEffect(() => {
    dispatch(getAllCategories());
    // dispatch(GetListing(id));
    // setFormData(listing);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newImageUrls = await Promise.all(
        editedImages.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "products_preset");

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/rentlify/image/upload",
            formData
          );
          return response.data.secure_url;
        })
      );
      const updatedImageUrls = [...listing_image, ...newImageUrls];

      const updatedProductData = {
        listing_name,
        listing_image: updatedImageUrls,
        category_id,
        active,
        price,
        long_description,
        short_description,
        city,
        province,
        bed,
        room,
        max_guests,
      };
      dispatch(UpdateListing({ id, listing: updatedProductData }));
      // dispatch(ListListings());

      navigate(`/office/listings/${id}`);
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error and possibly show an error message to the user
    }
  };

  const handleDeleteImage = (index) => {
    // Create a copy of existingImages array
    const updatedImages = [...listing_image];
    // Remove the image at the specified index
    updatedImages.splice(index, 1);
    // Update the state with the new array
    setListing_image(updatedImages);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      <div className="space-y-12 m-14">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <div className=" w-full md:w-1/2 border-gray-900/10">
            <div className="space-y-1 py-4">
              <h2 className="text-lg font-semibold w-full  leading-7 text-gray-900">
                Listing Images
              </h2>
              <span className="text-xs text-slate-300 font-light">
                Images are essential for creating a listing.
              </span>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="sm:col-span-3" />
              <label
                htmlFor="listing_image"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Icon
                    icon="solar:cloud-upload-line-duotone"
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, WEBP or JPG (MAX. 800x400px)
                  </p>
                </div>
                <input
                  type="file"
                  name="listing_image"
                  id="listing_image"
                  onChange={(event) =>
                    setEditedImages((prevImages) => [
                      ...prevImages,
                      ...event.target.files,
                    ])
                  }
                  multiple
                  className="hidden"
                />
              </label>
            </div>
            <label className="block text-gray-700 text-sm font-bold mt-3">
              Uploaded Images ({editedImages.length})
            </label>
            {editedImages.length > 0 && (
              <div className={`mt-2 overflow-x-auto`}>
                <div className="flex space-x-2 mt-1">
                  {editedImages.map((file, index) => (
                    <div key={index} className={`relative w-40 flex-shrink-0`}>
                      <span
                        className="absolute top-1 right-1 p-2 cursor-pointer bg-white rounded-full opacity-80 transition-opacity duration-300"
                        onClick={() =>
                          setEditedImages(
                            editedImages.filter((img, i) => i !== index)
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
            {/* Display existing images */}
            <label className="block text-gray-700 text-sm font-bold mt-3">
              existing Images ({listing_image.length})
            </label>
            {listing_image.length > 0 && (
              <div className={`mt-2 overflow-x-auto`}>
                <div className="flex space-x-2 mt-1">
                  {listing_image.map((imageUrl, index) => (
                    <div key={index} className={`relative w-40 flex-shrink-0`}>
                      <span
                        className="absolute top-1 right-1 p-2 cursor-pointer bg-white rounded-full opacity-80 transition-opacity duration-300"
                        onClick={() => handleDeleteImage(index)}
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
                        src={imageUrl}
                        alt={`existing-${index}`}
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
                htmlFor="product_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Listing Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder={listing.listing_name}
                  name="listing_name"
                  value={listing_name}
                  onChange={(e) => setListing_name(e.target.value)}
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
                  onChange={(e) => setCategory_id(e.target.value)}
                  defaultValue={category_id}
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
                htmlFor="long_description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Long description
              </label>
              <div className="mt-2">
                <textarea
                  value={long_description}
                  name="long_description"
                  rows={3}
                  type="text"
                  onChange={(e) => setLong_description(e.target.value)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="short_description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Short description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="short_description"
                  value={short_description}
                  onChange={(e) => setShort_description(e.target.value)}
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
                  value={active}
                  onChange={(e) => setActive(e.target.value)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select status</option>
                  <option value={true}>TRUE</option>
                  <option value={false}>FALSE</option>
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="room"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bed
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="bed"
                  value={bed}
                  onChange={(e) => setBed(e.target.value)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="room"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Room
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 ">
              <label
                htmlFor="max_guests"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Max Guests
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="max_guests"
                  value={max_guests}
                  onChange={(e) => setMax_guests(e.target.value)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3 ">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3 ">
              <label
                htmlFor="province"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
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
