/* eslint-disable react/prop-types */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51PhFtiRuN9nUdwa8WCVNmcQuMJxVpwjiRzzKFDssA0syHGfeRrr8W08iflxmkvS6Tf4eHEW1xIdQsHP4QNU34EQU00TVRhKOre"
);
export default function StripeContainer({ order }) {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          "https://rentlify-back.vercel.app/v1/create-payment-intent",
          {
            items: order.order_item,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClientSecret();
  }, [order.order_item]);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className=" h-full">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      )}
    </div>
  );
}
