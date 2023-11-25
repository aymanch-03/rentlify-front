import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/reducers/userSlice";
import UpdateUserForm from "./UpdateUserForm";

export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      dispatch(getUser(id));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  }, [dispatch, id]);

  const user = useSelector((state) => state.user.user);

  const fullName = `${user.first_name} ${user.last_name}`;
  const [firstNameInitial, lastNameInitial] = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase());
  const fallbackAvatar = `${firstNameInitial}${lastNameInitial}`;

  return (
    <div>
      <UpdateUserForm
        user={user}
        fallbackAvatar={fallbackAvatar}
        isLoading={isLoading}
      />
    </div>
  );
}
