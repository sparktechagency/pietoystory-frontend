import React, { useEffect, useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Swal from "sweetalert2";
// import "./CheckoutForm.css"; // Custom CSS for Stripe Elements

const CheckoutForm = ({ clientSecretKey, paymentId }) => {


    // checkout related function 


    const axiosPublic = useAxiosPublic()

    const [loading, setLoading] = useState<boolean>(false)

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token} `
        }
    }

    const [profileData, setProfileData] = useState<any>(null); // Use `any` if you're not using an interface

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get(`/profile`, config);
                if (res?.data?.data) {
                    setProfileData(res.data.data);

                }
            } catch (error: any) {

                message.error("Failed to load profile data.");
            } finally {

            }
        };

        fetchData();
    }, []);

    const [searchParam] = useSearchParams();

    const postCode = searchParam.get("postCode") ?? "";
    const frequency = searchParam.get("frequency") ?? "";
    const dog = searchParam.get("dog") ?? "";
    const area = searchParam.get("selectedArea") ?? "";
    const selectedArea = area.split(' ')[0];
    const cleanArea = searchParam.get("cleanArea") ?? "";
    const price = parseFloat(searchParam.get("price") ?? "0");
    const discountPrice = parseFloat(searchParam.get("discountPrice") ?? "0");









    // refer info api 
    const [coinRemaning, setCoinRemaning] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get("/all-referred-info", config);
                setCoinRemaning(res.data?.userCoinData?.remaining_coins)
                if (res.data?.userCoinData?.remaining_coins > 0) {
                    setCoinRemaning(res.data?.userCoinData?.remaining_coins);
                }
            } catch (error) {

            }
        }
        fetchData()
    }, [])

    useEffect(() => {

    }, [])


    const [getDiscount, setDiscount] = useState<boolean>(false);
    const [charge, setCharge] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axiosPublic.get(`/discount-charge`, config);
                if (res.status === 200) {
                    setDiscount(res.data?.getDiscount);
                    setCharge(res.data?.getCharge);
                }
            } catch (error) {
            }
        }
        fetchData();
    }, [])









    const [totalPrice, setTotalPrice] = useState(price); // Initial value is the original price
    const [grantTotal, setGrantTotal] = useState(price);

    // Calculation Logic
    useEffect(() => {
        let calculatedPrice = getDiscount ? price * 0.5 : price;

        if (charge) {
            calculatedPrice += 15;
        }

        setTotalPrice(calculatedPrice);
        setGrantTotal(calculatedPrice);
    }, [price, getDiscount, charge]);



    const data = {
        postCode: Number(postCode),
        frequency: frequency,
        dog: Number(dog),
        selectedArea: selectedArea,
        cleanArea: cleanArea,
        price: Number(grantTotal)
    }


    const [isChecked, setIsChecked] = useState(false);


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    const [formData, setFormData] = useState({
        full_address: "",
        first_name: "",
        last_name: "",
        dog_name: "",
        additional_comments: "",
        contact_email: "",
        contact_number: "",
        agreement: false,
    });

    const { full_address, first_name, last_name, dog_name, additional_comments, contact_email, contact_number, agreement } = formData;

    useEffect(() => {
        if (profileData) {
            setFormData((prevData) => ({
                ...prevData,
                full_address: profileData.home_address || "",
                first_name: profileData.full_name || "",
                contact_email: profileData.email || "",
                contact_number: profileData.phone_number || "",
            }));
        }
    }, [profileData]);







    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // payment_intent_id`, `user_id`, `zip_code`, `how_often`, `amount_of_dogs`, `total_area`, `area_to_clean

    const payload = {
        full_address, first_name, last_name, dog_name, additional_comments, contact_email, contact_number, zip_code: postCode, area_to_clean: cleanArea, how_often: frequency, amount_of_dogs: dog, total_area: selectedArea, use_free_cleanup: 1

    }

    const payloadTwo = {
        full_address, first_name, last_name, dog_name, additional_comments, contact_email, contact_number, zip_code: postCode, area_to_clean: cleanArea, how_often: frequency, amount_of_dogs: dog, total_area: selectedArea, use_free_cleanup: 0, payment_intent_id: paymentId,
        cost: price

    }



    const handleSubmits = async () => {
        if (!full_address) {
            return message.error("Enter your full address.")
        }
        if (!first_name) {
            return message.error(`Enter your first name.`)
        }
        if (!last_name) {
            return message.error(`Enter your last name.`)
        }
        if (!contact_email) {
            return message.error("Enter your message");
        }
        if (!contact_number) {
            return message.error("Enter your phone number.")
        }
        if (!agreement) {
            return message.error(`Please our aggree our term & condiction!`)
        }
        try {
            setLoading(true);
            const res = await axiosPublic.post("/payment-success", payload, config);
            console.log(`response is ${res}`)
            const response = await axiosPublic.get("/all-referred-info", config);
            setDiscount(response.data?.getDiscount);
            setCharge(response.data?.getCharge);
            return message.success("Service purchase successfully.")
        } catch (error) {
            message.error(`Something went wrong.`)

        } finally {
            setLoading(false)
        }
    }






    const stripe = useStripe();
    const elements = useElements();

    const clientSecret = clientSecretKey;












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
        setLoading(true);

        // ✅ Step 1: Validate User Information
        if (!stripe || !elements) return handleError("Stripe has not loaded properly.");
        if (!full_address) return handleError("Enter your full address.");
        if (!first_name) return handleError("Enter your first name.");
        if (!last_name) return handleError("Enter your last name.");
        if (!contact_email) return handleError("Enter your email address.");
        if (!contact_number) return handleError("Enter your phone number.");

        try {
            // ✅ Step 2: Get the Card Element
            const card = elements.getElement(CardNumberElement);

            // ✅ Step 3: Create Payment Method
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: card,
            });

            if (error) return handleError(error.message);

            // ✅ Step 4: Confirm the Payment
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) return handleError(confirmError.message);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment successfull",
                showConfirmButton: false,
                timer: 1500
            });

            // ✅ Step 5: Call the Payment Success API
            await sendPaymentSuccess();
        } catch (error: any) {
            navigate("/")
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Payment Failed: ${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false);
        }
    };

    const handleError = (errorMessage: any) => {
        message.error(errorMessage);
        setLoading(false);
    };

    const sendPaymentSuccess = async () => {
        try {
            const response = await axiosPublic.post("/payment-success", payloadTwo, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                // message.success("Payment information successfully sent to the server!");
                navigate("/");
            }
        } catch (apiError: any) {
            navigate("/")
            console.error("API Error:", apiError.message);
            message.error(`API Error: ${apiError.response?.data?.message || "Something went wrong."}`);
        }
    };









    return (
        <>
            <div className=' bg-[#f6f6f6]  ' >
                <div className=' max-w-[1519px] mx-auto   pb-12 px-4 lg:px-0 ' >
                    <div className=' lg:block hidden' >
                        <div className='flex items-center gap-5 cursor-pointer ' >
                            <Link to={"/"}>
                                <div className=' w-[55px] h-[53px] bg-white rounded-full flex items-center  justify-center  ' >
                                    <span>
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                            <div>
                                <h1 className=' text-3xl font-degular text-textColor cursor-pointer ' >Back</h1>
                            </div>
                            <div className=" mx-auto ">
                                <div className="flex flex-col items-center text-center ">
                                    {/* Top Image */}
                                    <img
                                        src="/images/refer/referImg.png"
                                        alt="Refer a friend"
                                        className="w-[83px] h-[117px] object-cover"
                                    />

                                    {/* Heading and Subtitle */}
                                    <div className=' -mt-4 p-3 rounded-lg bg-white ' >
                                        <h1 className="text-textColor font-degular lg:text-3xl sm:text-xl font-semibold">
                                            Checkout
                                        </h1>
                                        <p className=" text-xl text-textColor font-degular  ">
                                            Please fill up the following fields
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=' lg:hidden block ' >
                        <div>
                            <div className=' w-[35px] h-[35px] bg-white rounded-full flex items-center  justify-center  ' >
                                <span>
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>






                    {/* user details  */}



                    <h1 className=' lg:text-xl text-textColor font-degular font-medium lg:ml-32 my-3 ' >Billing details</h1>
                    <div className=' max-w-[1286px] mx-auto flex flex-col lg:flex-row gap-x-5 my-3 ' >
                        {/* left side  */}
                        <div className=' max-w-[619px] w-full  ' >
                            <input
                                defaultValue={profileData?.home_address}
                                name='full_address'
                                type="text"
                                id='full_address'
                                placeholder='Full address'
                                onChange={handleChange}
                                className='bg-[#f6f6f6] w-full nt-2 lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border  placeholder:text-[#404040] lg:placeholder:text-xl text-xl placeholder:font-degular'
                                required
                            />
                            <div className='flex flex-col lg:flex-row gap-3 my-3 mt-1  ' >
                                <div className='w-full' >
                                    <input defaultValue={profileData?.full_name} required onChange={handleChange} name='first_name' type="text" placeholder='Your first name' className=' bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl text-xl placeholder:font-degular ' />
                                </div>
                                <div className=' w-full ' >
                                    <input type="text" required placeholder='Last name' defaultValue={profileData?.last_name} onChange={handleChange} name='last_name' className=' bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl text-xl placeholder:font-degular ' />
                                </div>
                            </div>
                            <div className=' w-full ' >
                                <input type="text" onChange={handleChange} placeholder='Dog’s name (optional)' name='dog_name' className=' bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl text-xl placeholder:font-degular ' />
                            </div>
                            <div className="w-full my-3 ">
                                <textarea
                                    onChange={handleChange}
                                    aria-required
                                    className="' bg-[#f6f6f6] w-full lg:py-4 py-2 text-xl lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular ' "
                                    placeholder="Additional comments"
                                    name='additional_comments'
                                    rows="5"
                                    required
                                />
                            </div>
                            <div>
                                <div className="w-full mb-6">
                                    <label className="block lg:text-xl font-medium mb-2 font-degular ">Contact information</label>
                                    <div className="relative">
                                        <input
                                            onChange={handleChange}
                                            required
                                            type="email"
                                            name='contact_email'
                                            defaultValue={profileData?.email}
                                            placeholder="example@gmail.com"
                                            className="bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-20 px-16 rounded-[30px] border text-xl focus:outline-none placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular"
                                        />
                                        {/* Icon */}
                                        <span className="absolute left-7 top-1/2 transform -translate-y-1/2">
                                            <svg
                                                width="25"
                                                height="20"
                                                viewBox="0 0 25 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M22.5 0H2.5C1.125 0 0.0125 1.125 0.0125 2.5L0 17.5C0 18.875 1.125 20 2.5 20H22.5C23.875 20 25 18.875 25 17.5V2.5C25 1.125 23.875 0 22.5 0ZM22.5 5L12.5 11.25L2.5 5V2.5L12.5 8.75L22.5 2.5V5Z"
                                                    fill="#3D3D3D"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>


                            </div>
                            <div>
                                <div className="w-full mb-3">
                                    <div className="relative">
                                        <input
                                            required
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="Phone number"
                                            defaultValue={profileData?.phone_number}
                                            name='contact_number'
                                            className="bg-[#f6f6f6] w-full lg:py-4 py-2 text-xl  lg:px-20 px-16 rounded-[30px] border focus:outline-none placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular"
                                        />
                                        {/* Icon */}
                                        <span className="absolute left-7 top-1/2 transform -translate-y-1/2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.02222 8.65556C5.62222 11.8 8.2 14.3667 11.3444 15.9778L13.7889 13.5333C14.0889 13.2333 14.5333 13.1333 14.9222 13.2667C16.1667 13.6778 17.5111 13.9 18.8889 13.9C19.5 13.9 20 14.4 20 15.0111V18.8889C20 19.5 19.5 20 18.8889 20C8.45556 20 0 11.5444 0 1.11111C0 0.5 0.5 0 1.11111 0H5C5.61111 0 6.11111 0.5 6.11111 1.11111C6.11111 2.5 6.33333 3.83333 6.74444 5.07778C6.86667 5.46667 6.77778 5.9 6.46667 6.21111L4.02222 8.65556Z" fill="#3D3D3D" />
                                            </svg>

                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="flex items-center space-x-3 mt-6 ">
                                    <input
                                        required
                                        onChange={handleChange}
                                        type="checkbox"
                                        id="agreement"
                                        name="agreement"
                                        className="w-5 h-5 text-[#404040] border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer"
                                    />
                                    <label htmlFor="agreement" className="text-[#404040] lg:text-lg font-medium font-degular ">
                                        I agree to your <Link to={"/privacy-policy"} className="text-[#1434CB] cursor-pointer">privacy policy</Link>  and <Link to={"/term-condiction"} className="text-[#1434CB] cursor-pointer">terms & conditions</Link>
                                    </label>
                                </div>
                            </div>




                        </div>





                        {/* right side  */}
                        <div className=' max-w-[482px] mx-auto w-full ' >

                            <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4  ' >
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >How often:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-xl font-degular ' >{frequency}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >How many dogs:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-xl font-degular ' >{dog}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Total area:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-xl font-degular ' >{selectedArea} sq ft</p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Area to clean:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-xl font-degular ' >{cleanArea}</p>
                                    </div>
                                </div>
                            </div>


                            <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4  ' >
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Price per  visit:</h1>
                                        <p className=' lg:text-lg font-degular text-[#343434] ' >Billed monthly</p>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' >${price}</p>
                                    </div>
                                </div>
                            </div>


                            <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4 ' >
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >50% off for first time cleaning:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#FF434B] lg:text-[26px] text-sm font-semibold font-degular ' >
                                            ${discountPrice}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4 ' >
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >One time charge:</h1>
                                        <p className=' lg:text-lg font-degular text-[#343434] ' >Monthly</p>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' >{charge ? <>+ $15.00 </> : <>0</>} </p>
                                    </div>
                                </div>
                            </div>

                            <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4 ' >
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Total cost:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' >
                                            ${
                                                price.toFixed(2)
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4 ' >
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="free"
                                        name="free"
                                        disabled={coinRemaning <= 0}
                                        className="w-5 h-5 text-[#404040] border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label
                                        htmlFor="free"
                                        className="text-[#404040] lg:text-lg font-medium font-degular"
                                    >
                                        Use free cleanup ( Remaining {coinRemaning > 0 ? coinRemaning : 0} )
                                    </label>
                                </div>
                            </div>


                            <div>
                                {isChecked ? (
                                    <button
                                        onClick={handleSubmits}
                                        className="block mx-auto bg-bgColor px-7 py-4 w-full mt-5 rounded-[30px] text-center text-xl font-degular font-semibold"
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2 justify-center">
                                                Submitting...
                                                <span>
                                                    <svg
                                                        width="14"
                                                        height="15"
                                                        viewBox="0 0 14 15"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M0.31779 12.5459L9.88479 2.97885L2.48719 3.01289L2.49788 0.688399L13.8639 0.636102L13.8116 12.0021L11.4871 12.0128L11.5211 4.6152L1.95414 14.1822L0.31779 12.5459Z"
                                                            fill="black"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                ) : (
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
                                )}
                            </div>



                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    );
};

export default CheckoutForm;
