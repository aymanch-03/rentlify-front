/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateCustomerForm from "../components/Customers/UpdateCustomerForm";
import { getCustomer } from "../redux/reducers/customerSlice";

export default function CustomerDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      dispatch(getCustomer(id));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  }, [dispatch, id]);

  const customer = useSelector((state) => state.customers.customer);

  const fullName = `${customer.first_name} ${customer.last_name}`;
  const [firstNameInitial, lastNameInitial] = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase());
  const fallbackAvatar = `${firstNameInitial}${lastNameInitial}`;

  return (
    <>
      <UpdateCustomerForm
        customer={customer}
        fallbackAvatar={fallbackAvatar}
        isLoading={isLoading}
      />
    </>
  );
}
