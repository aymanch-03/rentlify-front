import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../redux/reducers/orderSlice";

export default function CheckoutForm({ order }) {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };
  const submitOrder = (data) => {
    dispatch(createNewOrder(data));
  };

  return (
    <form
      id="payment-form"
      onSubmit={(e) => {
        handlePaymentSubmit(e)
        submitOrder(order);
      }}
      className="w-full h-full flex flex-col justify-between gap-4"
    >
      <PaymentElement
        options={paymentElementOptions}
        className="w-full max-h-full"
      />
      <Button id="submit" className="w-full">
        Pay now
      </Button>
    </form>
  );
}
