import React, { useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, message } from "antd";
// import "./CheckoutForm.css"; // Custom CSS for Stripe Elements

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const card = elements.getElement(CardNumberElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: card,
        });

        if (error) {
            message.error(error.message);
            setLoading(false);
        } else {
            message.success("Payment Method Created Successfully!");
            console.log("PaymentMethod:", paymentMethod);
        }

        setLoading(false);
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
                <span className=' flex items-center gap-2 justify-center ' >Checkout <span>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.31779 12.5459L9.88479 2.97885L2.48719 3.01289L2.49788 0.688399L13.8639 0.636102L13.8116 12.0021L11.4871 12.0128L11.5211 4.6152L1.95414 14.1822L0.31779 12.5459Z" fill="black" />
                    </svg>

                </span>
                </span>
            </button>
        </form>
    );
};

export default CheckoutForm;
