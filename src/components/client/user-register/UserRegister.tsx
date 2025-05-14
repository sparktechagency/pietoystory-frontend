import React, { useState } from 'react';
import { message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import Swal from 'sweetalert2';

const UserRegister = () => {
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(false)

    const referral_code: string | null = searchParams.get('referral_code');

    console.log(referral_code)


    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        full_name: '',
        contact: '',
        address: '',
        password: '',
        password_confirmation: '',
        parent_referral_code: referral_code ? String(referral_code) : ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const axiosPublic = useAxiosPublic();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { full_name, contact, address, password, password_confirmation, parent_referral_code } = formData;

        if (!contact) {
            message.error('Please provide either an Email or Phone Number.');
            return;
        }

        const isEmail = /\S+@\S+\.\S+/.test(contact);
        const isPhoneNumber = /^[0-9]{10,15}$/.test(contact);

        if (!isEmail && !isPhoneNumber) {
            message.error('Please enter a valid Email or Phone Number.');
            return;
        }

        if (password !== password_confirmation) {
            message.error('Passwords do not match.');
            return;
        }

        if (!full_name || !address || !password) {
            message.error('Please fill all required fields.');
            return;
        }



        const payload = {
            full_name,
            address,
            password,
            password_confirmation,
            parent_referral_code,
            ...(isEmail ? { email: contact } : { phone_number: contact })
        };



        try {
            setLoading(true);
            let res = await axiosPublic.post(`/register?ref=${referral_code}`, payload);

            if (res.data.ok) {
                message.success(`User registration successfully`);
                navigate("/user-otp-verify")
                return setFormData({
                    full_name: '',
                    contact: '',
                    address: '',
                    password: '',
                    password_confirmation: '',
                    parent_referral_code: referral_code ? String(referral_code) : ''
                });
            }
            console.log(res);
        } catch (error: any) {

            message.error("Something went wrong.Please try again!")
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Something went wrong.Please try again!`,
                showConfirmButton: false,
                timer: 1500
            });
            return message.error(error.response.data.message)
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <div className=' bg-[#F6F6F6] pb-[15%] ' >
                <div className=' max-w-[1539px] px-4 mx-auto ' >
                    <div className=' flex flex-col items-center justify-between md:flex-row lg:flex-row ' >
                        <div className=' max-w-3xl pt-12 w-full ' >
                            <h1 className=' text-[#000000] font-degular lg:text-5xl text-3xl font-medium mb-5 ' >Create your account</h1>
                            <form onSubmit={handleSubmit} className=" space-y-4 ">
                                {/* Full Name */}
                                <div className="relative">

                                    <span className="absolute left-3 top-4 " >
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0.5C11.3261 0.5 12.5979 1.02678 13.5355 1.96447C14.4732 2.90215 15 4.17392 15 5.5C15 6.82608 14.4732 8.09785 13.5355 9.03553C12.5979 9.97322 11.3261 10.5 10 10.5C8.67392 10.5 7.40215 9.97322 6.46447 9.03553C5.52678 8.09785 5 6.82608 5 5.5C5 4.17392 5.52678 2.90215 6.46447 1.96447C7.40215 1.02678 8.67392 0.5 10 0.5ZM10 13C15.525 13 20 15.2375 20 18V20.5H0V18C0 15.2375 4.475 13 10 13Z" fill="#888888" />
                                        </svg>

                                    </span>
                                    <input
                                        name="full_name"
                                        placeholder="Your full name"
                                        onChange={handleChange}
                                        className="w-full bg-[#F6F6F6] px-10 py-4 rounded-[20px] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular placeholder:font-medium border border-gray-300   focus:outline-none"
                                    />
                                </div>

                                {/* Email or Phone Number */}
                                <div className="relative">
                                    {formData.contact.includes('@') ? (
                                        <MailOutlined className="absolute left-3 top-5 text-lg text-gray-400" />
                                    ) : (
                                        <PhoneOutlined className="absolute left-3 top-5 text-lg text-gray-400" />
                                    )}
                                    <input
                                        name="contact"
                                        placeholder="Email or Phone Number *"
                                        onChange={handleChange}
                                        value={formData.contact}
                                        className="w-full bg-[#F6F6F6] px-10 py-4 rounded-[20px] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular placeholder:font-medium border border-gray-300   focus:outline-none"
                                    />
                                </div>

                                {/* Address */}
                                <div className="relative">
                                    <span className="absolute left-3 top-[18px] text-gray-400"  >
                                        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.262 20.7145C7.262 20.7145 0 14.4222 0 8.23065C0 6.04775 0.842855 3.95425 2.34315 2.4107C3.84344 0.867156 5.87827 0 8 0C10.1217 0 12.1566 0.867156 13.6569 2.4107C15.1571 3.95425 16 6.04775 16 8.23065C16 14.4222 8.738 20.7145 8.738 20.7145C8.334 21.0972 7.669 21.0931 7.262 20.7145ZM8 11.8316C8.45963 11.8316 8.91475 11.7384 9.33939 11.5575C9.76403 11.3765 10.1499 11.1113 10.4749 10.7769C10.7999 10.4425 11.0577 10.0455 11.2336 9.60866C11.4095 9.17178 11.5 8.70353 11.5 8.23065C11.5 7.75777 11.4095 7.28953 11.2336 6.85264C11.0577 6.41576 10.7999 6.0188 10.4749 5.68442C10.1499 5.35005 9.76403 5.08481 9.33939 4.90385C8.91475 4.72288 8.45963 4.62974 8 4.62974C7.07174 4.62974 6.1815 5.00912 5.52513 5.68442C4.86875 6.35973 4.5 7.27563 4.5 8.23065C4.5 9.18567 4.86875 10.1016 5.52513 10.7769C6.1815 11.4522 7.07174 11.8316 8 11.8316Z" fill="#888888" />
                                        </svg>
                                    </span>
                                    <input
                                        name="address"
                                        placeholder="Address *"
                                        onChange={handleChange}
                                        className="w-full bg-[#F6F6F6] px-10 py-4 rounded-[20px] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular placeholder:font-medium border border-gray-300   focus:outline-none"
                                    />
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <span className="absolute left-3 top-4 text-gray-400">
                                        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 21.5C1.45 21.5 0.979333 21.3043 0.588 20.913C0.196666 20.5217 0.000666667 20.0507 0 19.5V9.5C0 8.95 0.196 8.47933 0.588 8.088C0.98 7.69667 1.45067 7.50067 2 7.5H3V5.5C3 4.11667 3.48767 2.93767 4.463 1.963C5.43833 0.988334 6.61733 0.500667 8 0.500001C9.38267 0.499334 10.562 0.987001 11.538 1.963C12.514 2.939 13.0013 4.118 13 5.5V7.5H14C14.55 7.5 15.021 7.696 15.413 8.088C15.805 8.48 16.0007 8.95067 16 9.5V19.5C16 20.05 15.8043 20.521 15.413 20.913C15.0217 21.305 14.5507 21.5007 14 21.5H2ZM8 16.5C8.55 16.5 9.021 16.3043 9.413 15.913C9.805 15.5217 10.0007 15.0507 10 14.5C9.99933 13.9493 9.80367 13.4787 9.413 13.088C9.02233 12.6973 8.55133 12.5013 8 12.5C7.44867 12.4987 6.978 12.6947 6.588 13.088C6.198 13.4813 6.002 13.952 6 14.5C5.998 15.048 6.194 15.519 6.588 15.913C6.982 16.307 7.45267 16.5027 8 16.5ZM5 7.5H11V5.5C11 4.66667 10.7083 3.95833 10.125 3.375C9.54167 2.79167 8.83333 2.5 8 2.5C7.16667 2.5 6.45833 2.79167 5.875 3.375C5.29167 3.95833 5 4.66667 5 5.5V7.5Z" fill="#888888" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password *"
                                        onChange={handleChange}
                                        className="w-full bg-[#F6F6F6] px-10 py-4 rounded-[20px] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular placeholder:font-medium border border-gray-300   focus:outline-none"
                                    />
                                    <div
                                        className="absolute right-2 top-2 cursor-pointer text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeTwoTone className='mt-3' /> : <EyeInvisibleOutlined className=' mt-3 ' />}
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="relative">
                                    <span className="absolute left-3 top-4 text-gray-400">
                                        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 21.5C1.45 21.5 0.979333 21.3043 0.588 20.913C0.196666 20.5217 0.000666667 20.0507 0 19.5V9.5C0 8.95 0.196 8.47933 0.588 8.088C0.98 7.69667 1.45067 7.50067 2 7.5H3V5.5C3 4.11667 3.48767 2.93767 4.463 1.963C5.43833 0.988334 6.61733 0.500667 8 0.500001C9.38267 0.499334 10.562 0.987001 11.538 1.963C12.514 2.939 13.0013 4.118 13 5.5V7.5H14C14.55 7.5 15.021 7.696 15.413 8.088C15.805 8.48 16.0007 8.95067 16 9.5V19.5C16 20.05 15.8043 20.521 15.413 20.913C15.0217 21.305 14.5507 21.5007 14 21.5H2ZM8 16.5C8.55 16.5 9.021 16.3043 9.413 15.913C9.805 15.5217 10.0007 15.0507 10 14.5C9.99933 13.9493 9.80367 13.4787 9.413 13.088C9.02233 12.6973 8.55133 12.5013 8 12.5C7.44867 12.4987 6.978 12.6947 6.588 13.088C6.198 13.4813 6.002 13.952 6 14.5C5.998 15.048 6.194 15.519 6.588 15.913C6.982 16.307 7.45267 16.5027 8 16.5ZM5 7.5H11V5.5C11 4.66667 10.7083 3.95833 10.125 3.375C9.54167 2.79167 8.83333 2.5 8 2.5C7.16667 2.5 6.45833 2.79167 5.875 3.375C5.29167 3.95833 5 4.66667 5 5.5V7.5Z" fill="#888888" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        placeholder="Confirm Password *"
                                        onChange={handleChange}
                                        className="w-full bg-[#F6F6F6] px-10 py-4 rounded-[20px] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular placeholder:font-medium border border-gray-300   focus:outline-none"
                                    />
                                    <div
                                        className="absolute right-2 top-2 cursor-pointer text-gray-500"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeTwoTone className='mt-3' /> : <EyeInvisibleOutlined className='mt-3 ' />}
                                    </div>
                                </div>

                                {/* Parent Referral Code */}
                                <div className="relative">
                                    <span className="absolute left-3 top-4 block text-gray-400">
                                        <svg width="28" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.6 18.2V21H0V18.2C0 18.2 0 12.6 9.8 12.6C19.6 12.6 19.6 18.2 19.6 18.2ZM14.7 4.90004C14.7 3.93091 14.4126 2.98355 13.8742 2.17775C13.3358 1.37195 12.5705 0.74391 11.6751 0.373041C10.7798 0.00217265 9.79456 -0.0948635 8.84406 0.0942036C7.89355 0.283271 7.02045 0.749949 6.33518 1.43523C5.6499 2.1205 5.18322 2.99359 4.99415 3.9441C4.80508 4.8946 4.90212 5.87983 5.27299 6.77518C5.64386 7.67054 6.2719 8.43581 7.07771 8.97423C7.88351 9.51265 8.83087 9.80003 9.8 9.80003C11.0996 9.80003 12.3459 9.28378 13.2648 8.36485C14.1838 7.44593 14.7 6.1996 14.7 4.90004ZM19.516 12.6C20.3766 13.2661 21.0809 14.1126 21.5791 15.0801C22.0774 16.0476 22.3576 17.1126 22.4 18.2V21H28V18.2C28 18.2 28 13.118 19.516 12.6ZM18.2 5.1515e-05C17.2365 -0.00443007 16.2943 0.283594 15.498 0.82605C16.3484 2.01428 16.8057 3.43884 16.8057 4.90004C16.8057 6.36124 16.3484 7.7858 15.498 8.97403C16.2943 9.51648 17.2365 9.80451 18.2 9.80003C19.4996 9.80003 20.7459 9.28378 21.6648 8.36485C22.5838 7.44593 23.1 6.1996 23.1 4.90004C23.1 3.60048 22.5838 2.35415 21.6648 1.43523C20.7459 0.516299 19.4996 5.1515e-05 18.2 5.1515e-05Z" fill="#888888" />
                                        </svg>
                                    </span>
                                    <input
                                        name="parent_referral_code"
                                        placeholder="Parent Referral Code"
                                        defaultValue={referral_code}
                                        readOnly
                                        onChange={handleChange}
                                        className="w-full bg-[#F6F6F6] px-12 font-bold py-4 rounded-[20px] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular placeholder:font-medium border border-gray-300   focus:outline-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className=' mt-9   ' >
                                    <button
                                        type="submit"
                                        className="w-full text-[#000000] font-degular text-xl font-medium py-3 bg-bgColor rounded-[20px] "
                                    >
                                        Submit
                                        {
                                            loading && (
                                                <span>..</span>
                                            )
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className=' mt-[8%] ' >
                            <img src="/images/registration/regImg.png" alt="" className=' block mx-auto bg-cover object-cover ' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserRegister;
