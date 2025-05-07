import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutFrom";

// Your Stripe publishable key
const stripePromise = loadStripe("pk_test_51RM04BQ4myhhMoc2T1YihvnHHEiZlBqp4VUNi6erDVpm2aAGNTp7lDy3kJQm7NHchvVmcpJS5ftqdcPxttK1FkhD00JZnvEZZY");

const StripePayment = () => {
    const location = useLocation();
    const payload = location?.state;
    const [clientSecret, setClientSecret] = useState("");
    const price = 1000;


    useEffect(() => {
        if (!price) return;

        const url = `http://localhost:5000/api/v1/create-payment-inten`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: price }),
        })
            .then((res) => {
                if (!res.ok) {
                    console.log(`res is ${res}`)
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                // console.log("Payment data:", data?.client_secret);
                console.log(data?.clientSecret)
                setClientSecret(data?.clientSecret);
            })
            .catch((error) => {

                console.error("Error creating payment intent:", error);
            });
    }, [price]);

    console.log(`client secret is ${clientSecret}`)

    const appearance = {
        theme: "stripe",
    };

    return (
        <div className="max-w-[600px] mx-auto mt-3 ">
            {clientSecret ? (
                <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <p className="text-center">Loading payment form...</p>
            )}
        </div>
    );
};

export default StripePayment;
