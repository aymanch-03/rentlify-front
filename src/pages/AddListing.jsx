/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useToast } from "@/components/ui/use-toast";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Icons } from "../components/ui/icons";
import { getAllCategories } from "../redux/reducers/categorySlice";
import { AddListing, ListListings } from "../redux/reducers/listingSlice";

export default function Example({ containerStyles, pathToNavigate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState(null);
  const categories = useSelector((state) => state.categories.data);
  const isLoading = useSelector((state) => state.listings.isLoading);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const [imageSelected, setImageSelected] = useState([]);
  // console.log("rr", imageSelected);
  const [formData, setFormData] = useState({
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
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
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
        max_guests,
      } = formData;
      if (
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
          console.log(response);
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

      navigate(pathToNavigate);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <form className="relative">
      {/* {bgSVG()} */}
      <div className={`${containerStyles}`}>
        <Link to={pathToNavigate} className="group flex items-center gap-2">
          <Icon
            icon="solar:arrow-left-line-duotone"
            className="group-hover:mr-2 h-4 w-4 transition-all"
          />
          <span className="font-medium text-sm">Add Listing</span>
        </Link>
        <section className="flex md:flex-row flex-col-reverse my-10 gap-4 md:gap-9">
          <div className=" w-full md:w-1/2">
            <div className="space-y-1 py-4">
              <h2 className="text-lg font-semibold w-full leading-7 text-gray-900">
                Key Informations
              </h2>
              <span className="text-xs text-slate-300 font-light">
                These pieces of information are necessary.
              </span>
            </div>
            <div className="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="listing_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Listing Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="listing_name"
                    placeholder="Enter your listing title"
                    onChange={(e) => handleInputChange(e)}
                    className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
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
                    className="font-light p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {/* Option for default value */}
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
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
                    placeholder="Enter your listing province"
                    onChange={(e) => handleInputChange(e)}
                    className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
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
                    placeholder="Enter your listing city"
                    onChange={(e) => handleInputChange(e)}
                    className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="short_description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="short_description"
                    placeholder="Enter a description"
                    onChange={(e) => handleInputChange(e)}
                    className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="Long_description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  More Details
                </label>
                <div className="mt-2">
                  <textarea
                    name="long_description"
                    rows={3}
                    type="text"
                    placeholder="Enter more details about your listing"
                    onChange={(e) => handleInputChange(e)}
                    className="font-light p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="active"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Active
                </label>
                <div className="mt-2">
                  <select
                    name="active"
                    onChange={(e) => handleInputChange(e)}
                    placeholder="status"
                    className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600  sm:text-sm sm:leading-6"
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
                  Listing Price{" "}
                  <span className="text-xs font-light">/night</span>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={(e) => handleInputChange(e)}
                    className=" p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="bed"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  N˚ Beds
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="bed"
                    placeholder="Number of beds"
                    onChange={(e) => handleInputChange(e)}
                    className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="room"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  N˚ Rooms
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="room"
                    placeholder="Number of rooms"
                    onChange={(e) => handleInputChange(e)}
                    className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="max_guests"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number of Guests
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="max_guests"
                    placeholder="Maximum number of guests"
                    onChange={(e) => handleInputChange(e)}
                    className="p-4 block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset font-light focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* <div className="my-5 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Listing
              </button>
            </div> */}
            <div className="my-5 flex items-center justify-end ">
              <Button
                disabled={isLoading}
                onClick={handleSubmit}
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Listing
              </Button>
            </div>
          </div>

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
            <label className="block text-gray-700 text-sm font-bold mt-3">
              Uploaded Images ({imageSelected.length})
            </label>
            {imageSelected.length > 0 && (
              <div className={`mt-2 overflow-x-auto`}>
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
        </section>
      </div>
      {/* </div> */}
    </form>
  );
}
