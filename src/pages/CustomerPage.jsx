/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Header from "../layouts/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();
  const id = auth.Id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/v1/customers/${id}`)
      .then((response) => {
        const { data } = response.data;
        setCustomers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [id]);
  console.log(customers);

  return (
    <>
      <Content customers={customers} />
    </>
  );
}

export function Content({ customers }) {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="sm:px-0">
          <h3 className="text-base font-semibold leading-9 text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {customers.active
                    ? "ur account is active"
                    : "activate ur account"}
                </p>
              </dd>
            </div>
            {/* Add similar code for other customer data fields */}
          </dl>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {customers.active
                    ? "ur account is active"
                    : "activate ur account"}
                </p>
              </dd>
            </div>

            {/* Add similar code for other customer data fields */}
          </dl>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {customers.active
                    ? "ur account is active"
                    : "activate ur account"}
                </p>
              </dd>
            </div>

            {/* Add similar code for other customer data fields */}
          </dl>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {customers.active
                    ? "ur account is active"
                    : "activate ur account"}
                </p>
              </dd>
            </div>

            {/* Add similar code for other customer data fields */}
          </dl>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {customers.active
                    ? "ur account is active"
                    : "activate ur account"}
                </p>
              </dd>
            </div>

            {/* Add similar code for other customer data fields */}
          </dl>
        </div>
      </div>
    </>
  );
}
