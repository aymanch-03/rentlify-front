import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { timeAgo } from "../../lib/helpers";
import { getUser } from "../../redux/reducers/userSlice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import UpdateUserForm from "./UpdateUserForm";

export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUser(id));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 900);
  }, [dispatch, id]);

  const user = useSelector((state) => state.user.user);

  console.log(user);
  const fullName = `${user.first_name} ${user.last_name}`;
  const [firstNameInitial, lastNameInitial] = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase());
  const fallbackAvatar = `${firstNameInitial}${lastNameInitial}`;

  return (
    <div className="">
      {isLoading ? (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex gap-x-4">
          <Skeleton className="h-20 w-20 rounded-full" />

          <div className="flex flex-col justify-center">
            <div className="flex gap-4 items-center mb-2">
              <Skeleton className="h-6 w-48 " />
              <span
                className={`capitalize flex items-center gap-1 ${
                  user.active ? "text-green-500" : "text-red-500"
                }`}
              >
                <Skeleton className="w-16 h-4" />
              </span>
            </div>
            <p className="text-slate-500">
              <div className="flex items-center gap-3">
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8  ">
          <div className="flex gap-x-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-md">
              <AvatarFallback className="text-2xl font-medium">
                {fallbackAvatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <div className="flex gap-4 items-center ">
                <h1 className="text-2xl font-medium ">
                  {user?.first_name + " " + user?.last_name}
                </h1>
                <span
                  className={`capitalize flex items-center gap-1 ${
                    user.active ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.active ? (
                    <Icon icon="solar:check-circle-linear" />
                  ) : (
                    <Icon icon="solar:shield-cross-linear" />
                  )}
                  {user.active ? "active" : "inactive"}
                </span>
              </div>
              <p className="text-slate-500">
                <a href="" className="text-blue-600/75">
                  {user?.email}
                </a>{" "}
                - <span className="capitalize">{user?.role}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="py-5 px-2 flex items-center gap-2">
              <Icon
                icon="solar:calendar-mark-line-duotone"
                color="grey"
                width="25"
                height="25"
              />
              {`Joined ${new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}`}
            </div>
            <div className="py-5 px-2 flex items-center gap-2">
              <Icon
                icon="solar:login-line-duotone"
                color="gray"
                width="25"
                height="25"
              />
              {`Last login ${timeAgo(user.createdAt)}`}
            </div>
          </div>
        </div>
      )}
      <UpdateUserForm user={user} />
      {/* <UserForm user={user}/> */}
    </div>
  );
}
