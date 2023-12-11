import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios"
import CheckoutForm from "./PaymentForm";

const stripePromise = loadStripe("pk_test_51OLrdrGOKSAHO9ZX4YOcS9JgJXpn7VsXVTl5dQqLHdKSPutVkK7sb3eDxZ1BZiIuMLdngPfUAts3Pir6MABPgJDA00vo4eNgwv");
export default function StripeContainer({order}) {
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/v1/create-payment-intent',
                    {
                        items: order.order_item,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchClientSecret();
    }, []);
    const appearance = {
        theme: 'stripe',
      };
    const options = {
        clientSecret,
        appearance
    };
    return (
        <div className=" h-full">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm order={order}/>
                </Elements>
            )}
        </div>
    );
}