import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutFrom";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { message, Spin } from 'antd';

// 🚀 Stripe publishable key
const stripePromise = loadStripe("pk_test_51R5URpFLtaovuyYZIfRsWYtWarN29hwk4CE93lpgduD1wb4xEMHNpjIfA13e16Cj5DZdvlt8B65aLal1S3jbgiqM00JmcGBQDa");

const StripePayment = ({ data, userDetails }) => {

    const token = localStorage.getItem("token");
    const [clientSecret, setClientSecret] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const axiosPublic = useAxiosPublic();
    const price = data?.price;

    console.log(userDetails)


    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axiosPublic.post(
                    "/payment-intent",
                    {
                        amount: price,
                        payment_method_types: ["card"]
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setClientSecret(response.data?.data?.client_secret);  
                setPaymentId(response.data?.data?.id);               
            } catch (error:any) {
                console.log(error)
                message.error("Error creating payment intent:", error.response.data.message);
            }
        };

        createPaymentIntent();
    }, [price]);




    

    const appearance = {
        theme: "stripe",
    };

    return (
        <div className="max-w-[600px] mx-auto mt-3">
            {clientSecret ? (
                <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                    <CheckoutForm
                        paymentData={data}
                        paymentId={paymentId}
                        userDetails={userDetails}
                        secret={clientSecret}
                    />
                </Elements>
            ) : (
                <div className="flex justify-center items-center h-20">
                    <Spin size="large" tip="Loading payment form..." />
                </div>
            )}
        </div>
    );
};

export default StripePayment;
