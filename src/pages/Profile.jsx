import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../components/ui/icons";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { useToast } from "../components/ui/use-toast";
import { updateUserInAuthSlice } from "../redux/reducers/authSlice";
import { ListUsers, updateUser } from "../redux/reducers/userSlice";

export default function Profile() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  //   const users = useSelector((state) => state.user.users);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  const [formData, setFormData] = useState({
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  useEffect(() => {
    setFormData({
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }, [user]);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(formData).every((value) => value);

    if (isNotEmpty && user._id) {
      try {
        // Dispatch the updateUser action
        dispatch(updateUser({ id: user._id, newUserData: formData }));
        dispatch(updateUserInAuthSlice(formData));
        dispatch(ListUsers());

        toast({
          variant: "success",
          description: "Your personal information has been updated",
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      }
    } else {
      toast({
        variant: "destructive",
        description: "Invalid form data",
      });
    }
  };
  console.log(user);
  return (
    <>
      <div className="">
        <div className="">
          <main>
            <div className="">
              <div className="grid mx-auto max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-medium leading-7 text-black">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>

                <form className="md:col-span-2" onSubmit={onFormSubmit}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-full sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="first_name"
                          id="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          autoComplete="on"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="last_name"
                          id="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          autoComplete="on"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          disabled
                          autoComplete="on"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="user_name"
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          name="user_name"
                          id="user_name"
                          value={formData.user_name}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          autoComplete="on"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-primary px-3 py-2 gap-2 flex items-center text-sm font-medium text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Save
                      {isLoading && (
                        <Icons.spinner className="animate-spin w-4 h-4" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <Separator />
              <div className="grid mx-auto max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-medium leading-7 text-black">
                    Change password
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Update your password associated with your account.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-full sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        Current password
                      </label>
                      <div className="mt-2">
                        <Input
                          id="current-password"
                          name="current_password"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        New password
                      </label>
                      <div className="mt-2">
                        <Input
                          id="new-password"
                          name="new_password"
                          type="password"
                          autoComplete="new-password"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        Confirm password
                      </label>
                      <div className="mt-2">
                        <Input
                          id="confirm-password"
                          name="confirm_password"
                          type="password"
                          autoComplete="new-password"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

              {/* <div className="grid mx-auto max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-medium leading-7 text-black">
                    Delete account
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    No longer want to use our service? You can delete your
                    account here. This action is not reversible. All information
                    related to this account will be deleted permanently.
                  </p>
                </div>

                <form className="flex items-start md:col-span-2">
                  <button
                    type="submit"
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-black shadow-sm hover:bg-red-400"
                  >
                    Yes, delete my account
                  </button>
                </form>
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
