import React, { useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";
// import "./CheckoutForm.css"; // Custom CSS for Stripe Elements

const CheckoutForm = ({ paymentId, paymentData, userDetails, secret }) => {
    const parsedDetails = JSON.parse(userDetails);
    console.log(parsedDetails?.full_address)
    const token = localStorage.getItem("token")
    const axiosPublic = useAxiosPublic()
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const clientSecret = secret;

    console.log(`checkout secreate is ${clientSecret}`)
    console.log(`checkout paymentId is ${paymentId}`)





    const payload = {
        payment_intent_id: paymentId,
        zip_code: paymentData?.postCode,
        how_often: paymentData?.frequency,
        amount_of_dogs: paymentData?.dog,
        total_area: paymentData?.selectedArea,
        area_to_clean: paymentData?.cleanArea,
        cost: paymentData?.price,
        use_free_cleanup: 0,
        full_address: parsedDetails?.full_address,
        first_name: parsedDetails?.first_name,
        last_name: parsedDetails?.last_name,
        dog_name: parsedDetails?.dog_name,
        additional_comments: parsedDetails?.additional_comments,
        contact_email: parsedDetails?.contact_email,
        contact_number: parsedDetails?.contact_number
    }

    console.log(`area_to_clean ${payload?.area_to_clean} `)
    console.log(`last_name ${parsedDetails?.last_name} `)



    // Stripe Element Custom Styles
    const options = {
        style: {
            base: {
                iconColor: "#4A5568", // Icon color
                color: "#333",
                fontWeight: 500,
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                "::placeholder": {
                    color: "#A0AEC0",
                },
            },
            invalid: {
                iconColor: "#FF0000",
                color: "#FF0000",
            },
        },
        showIcon: true, // This will force icons to be visible
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            // Get the card element
            const card = elements.getElement(CardNumberElement);

            // ✅ Step 1: Create Payment Method
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: card,
            });

            if (error) {
                message.error(error.message);
                setLoading(false);
                return;
            } else {

                console.log("PaymentMethod:", paymentMethod);
            }


            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });



            if (confirmError) {

                message.error(confirmError.message);


            } else if (paymentIntent?.status === "succeeded") {
                if (!payload.full_address) {
                    return message.error("Enter your full address.")
                }
                if (!payload?.first_name) {
                    return message.error(`Enter your first name.`)
                }
                if (!payload?.last_name) {
                    return message.error("Enter your last name.")
                }
                if (!payload?.contact_email) {
                    return message.error("Enter your email adddress.")
                }
                if (!payload?.contact_number) {
                    return message.error("Enter your phone number.")
                }
                
                message.success("Payment Successful!");



                // ✅ Step 3: Call the Payment Success API
                try {
                    const response = await axiosPublic.post(
                        "/payment-success",

                        payload
                        ,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`, // If you have a token
                            },
                        }
                    );




                    if (response.status === 200) {

                        message.success("Payment information successfully sent to the server!");
                        return navigate("/")

                    }
                } catch (apiError: any) {
                    message.error("API Error:", apiError.response?.data?.message);
                    // message.error("API call to payment-success failed.");
                }
            }
        } catch (error: any) {

            message.error(`Payment Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };













    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
            <div className="space-y-2">
                <label>Card Number</label>
                <CardNumberElement options={options} className="stripe-input" />
            </div>
            <div className="space-y-2">
                <label>Expiration Date</label>
                <CardExpiryElement options={options} className="stripe-input" />
            </div>
            <div className="space-y-2">
                <label>CVC</label>
                <CardCvcElement options={options} className="stripe-input" />
            </div>
            <button className=' block mx-auto bg-bgColor px-7 py-4 w-full mt-5 rounded-[30px] text-center  text-xl font-degular font-semibold ' >
                {
                    loading ? "loading..." : <><span className=' flex items-center gap-2 justify-center ' >Checkout <span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.31779 12.5459L9.88479 2.97885L2.48719 3.01289L2.49788 0.688399L13.8639 0.636102L13.8116 12.0021L11.4871 12.0128L11.5211 4.6152L1.95414 14.1822L0.31779 12.5459Z" fill="black" />
                        </svg>

                    </span>
                    </span></>
                }
            </button>
        </form>
    );
};

export default CheckoutForm;
