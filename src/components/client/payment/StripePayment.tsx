import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { message, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckoutForm from "./CheckoutFrom";

const stripePromise = loadStripe("pk_test_51R5URpFLtaovuyYZIfRsWYtWarN29hwk4CE93lpgduD1wb4xEMHNpjIfA13e16Cj5DZdvlt8B65aLal1S3jbgiqM00JmcGBQDa");

const StripePayment = () => {
    const token = localStorage.getItem("token");
    const [clientSecret, setClientSecret] = useState("");
    const [paymentId, setPaymentId] = useState<null>(null)
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [searchParam] = useSearchParams()
    const navigate = useNavigate();
    const price = searchParam.get('price');
    const amount = parseInt(price);
    console.log(amount)
    useEffect(() => {
        const createPaymentIntent = async () => {
            if (!price) return;

            setLoading(true);
            try {
                const response = await axiosPublic.post(
                    "/payment-intent",
                    {
                        amount: Number(amount),
                        payment_method_types: ["card"],
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setClientSecret(response.data?.data?.client_secret);
                setPaymentId(response.data.data?.id)
            } catch (error: any) {
                console.log(error)
                message.error(`Error creating payment intent: ${error.response?.data?.message || error.message}`);
                // navigate("/");
            } finally {
                setLoading(false);
            }
        };

        createPaymentIntent();
    }, [price, axiosPublic, token, navigate]);

    const appearance = {
        theme: "stripe",
    };

    return (
        <div className="">
            {loading ? (
                <div className="flex justify-center items-center h-20">
                    <Spin size="large" tip="Loading payment form..." />
                </div>
            ) : clientSecret ? (
                <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                    <CheckoutForm clientSecretKey={clientSecret} paymentId={paymentId} />
                </Elements>
            ) : (
                <p className="text-center text-gray-500">Failed to load payment form.</p>
            )}
        </div>
    );
};

export default StripePayment;
