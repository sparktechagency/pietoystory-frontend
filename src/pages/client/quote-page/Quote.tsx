import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { message, Form, Button, Input, Checkbox } from 'antd';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { IoClose } from 'react-icons/io5';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import {
    UserOutlined,
    MailOutlined,
    EnvironmentOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    TeamOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';
import { RegistrationFormValues } from '../../../type/registrationType';
import { ApiResponse } from '../../../type/apiResponseType';
import { loginApiPayloadType, loginApiResponseType } from '../../../type/loginTypes';
import Swal from 'sweetalert2';
import { FaPaw } from 'react-icons/fa';



const Quote: React.FC = () => {
    const [form] = Form.useForm()
    const axiosPublic = useAxiosPublic()
    const [frequency, setFrequency] = useState(0);
    const [dogCount, setDogCount] = useState(1);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [selecetedArea, setSelectedeArea] = useState("");
    const [areaClean, setAreaClean] = useState(null);
    const [selecetedSqarArea, setSelectAreaSqar] = useState(null);
    const [searchParams] = useSearchParams();
    const postCode = searchParams.get('zip-code');
    const token = localStorage.getItem("token");



    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const frequencyLabels = [
        "2x per week",
        "once per week",
        "bi weekly",
        "once a month",
    ];




    useEffect(() => {
        // Only update state when selecetedArea changes
        if (selecetedArea == "0.2 Acre") {
            setSelectAreaSqar(1)
        } else if (selecetedArea == "0.2-1/3 Acre") {
            setSelectAreaSqar(2)
        } else if (selecetedArea == "1/3-1/2 Acre") {
            setSelectAreaSqar(3)
        } else if (selecetedArea == "1/2-3/4 Acre") {
            setSelectAreaSqar(4)
        }


    }, [selecetedArea]);




    const [price, setPrice] = useState(0)




    // discount api integrate 








    const navigate = useNavigate();






    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [openRegistrationModal, setOpenRegistrationModal] = useState<boolean>(false);
    const [response, setResponse] = useState(null);   // full API payload
    const [triggerFetch, setTriggerFetch] = useState(false); // flag to fire request

    /* ---------- 1. handleSubmit: validation + trigger ---------- */
    const handleSubmit = () => {
        if (!postCode) return message.error("Select a postcode.");
        if (!frequencyLabels[frequency]) return message.error("Select a time.");
        if (dogCount <= 0) return message.error("Please select a dog!");
        if (!selecetedArea) return message.error("Please select your area!");
        if (!token) return setLoginModal(true);

        setTriggerFetch(true);        // tells effect to call the API
    };

    /* ---------- 2. effect: fetch quote when trigger turns true ---------- */

    // ✅ Real-time debounced quote fetch
    const fetchQuote = useCallback(
        debounce(async (params) => {
            try {
                const res = await axiosPublic.get(
                    `/quote?zip_code=${params.postCode}` +
                    `&how_often=${params.frequency}` +
                    `&how_many_dogs=${params.dogCount}` +
                    `&total_area_size=${params.selecetedSqarArea}` +
                    `&area_to_clean=${params.areaClean}`,
                );
                
                setResponse(res.data);
            } catch (err) {
                if(err){
                    handleOpenLoginModal()
                }
            }
        }, 10),
        []
    );

    // ✅ Watch input fields and fetch in real time
    useEffect(() => {
        if (
            !postCode ||
            !frequency ||
            !dogCount ||
            !selecetedSqarArea ||
            !areaClean
        )
            return;

        fetchQuote({
            postCode,
            frequency,
            dogCount,
            selecetedSqarArea,
            areaClean,
        });
    }, [postCode, frequency, dogCount, selecetedSqarArea, areaClean]);










    const handleContinue = () => {
        if (!token) {
            setLoginModal(true);
            return;
        }
        if (!response?.total_cost)
            return message.error("Please wait for the quote to be fetched.");

        navigate(
            `/payment?postCode=${postCode}` +
            `&frequency=${frequencyLabels[frequency]}` +
            `&dog=${dogCount}` +
            `&selectedArea=${selecetedSqarArea}` +
            `&cleanArea=${areaClean}` +
            `&discountPrice=${response?.discount_amount}` +
            `&price=${response.total_cost}`
        );
    };




    console.log(`response is ${response}`)










    // hidden scroll 

    useEffect(() => {
        if (openRegistrationModal || loginModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openRegistrationModal, loginModal]);


    // registration modal 

    const [showPhone, setShowPhone] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const registratinFromSubmit = async (values: RegistrationFormValues) => {

        try {
            setLoading(true);
            let res = await axiosPublic.post<ApiResponse>(`/register`, values);
            if (res.status === 201) {
                toast.success(res.data.message);
                form.resetFields();
                return navigate(`/user-otp-verify?email = ${values.email || values.phone_number} `)
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message?.email?.[0] ||
                error.response?.data?.message?.phone_number?.[0] ||
                error.response?.data?.message ||
                "Something went wrong. Please try again.";

            return toast.error(errorMessage);
        } finally {
            setLoading(false)
        }
    }


    // login modal 



    const handleOpenLoginModal = () => {
        setLoginModal(true)
        setOpenRegistrationModal(false)
    }
    let handleLogin = async (values: loginApiPayloadType) => {
        try {
            setLoading(true);
            let res = await axiosPublic.post<loginApiResponseType>(`/login`, values);
            if (res.status === 200) {
                localStorage.setItem(`token`, res.data?.token);
                window.location.href = "/"
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setLoginModal(false)
                form.resetFields();
                return;
            }
        } catch (error: any) {
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response?.data?.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } finally {
            setLoading(false);
        }
    };


    const handleOpenRegistrationModal = () => {
        setOpenRegistrationModal(true);
        setLoginModal(false)
    }







    return (
        <>
            <div className='bg-[#f6f6f6]  pt-[46px] pb-[87px] ' >
                <div className=' max-w-[1519px] mx-auto lg:px-0 px-4 ' >
                    <div className='' >
                        <div className='flex flex-row items-center gap-5 cursor-pointer ' >
                            <Link to={"/"} >
                                <div className=' lg:w-[55px] lg:h-[53px] w-[33px] h-[30px]  bg-white rounded-full flex items-center  justify-center  ' >
                                    <span>
                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                            <div>
                                <h1 className=' lg:text-3xl text-xl font-degular text-textColor ' >Back</h1>
                            </div>
                        </div>
                        <div className=' lg:-mt-14  ' >
                            <h1 className='text-center text-[#3D3D3D] text-2xl lg:text-[40px] font-degular ' >Get an Instant Quote</h1>
                            <div className=' max-w-[459px] mx-auto ' >
                                <p className='text-center   text-[#3D3D3D] lg:text-xl font-degular font-medium ' >Discover how easy and affordable pet waste removal can be. No obligations, just clean yards!</p>
                            </div>
                        </div>
                    </div>
                    <div className=' flex flex-col lg:flex-row justify-between mt-7 gap-6   ' >
                        {/* left side  */}

                        <div className="max-w-[517px] w-full border-2 rounded-[20px] mx-auto p-5 lg:px-[50px] lg:py-[49px] bg-white space-y-6">



                            {/* Zip Code */}
                            <input
                                type="number"
                                defaultValue={postCode}
                                disabled
                                placeholder="Zip Code"
                                className="w-full border bg-white border-gray-300 px-4 lg:px-6 py-3 lg:py-4 text-sm placeholder-gray-400 focus:outline-none rounded-[20px]"
                            />

                            {/* Frequency */}
                            <div>
                                <label className="block font-degular font-medium text-[#404040] mb-3">
                                    How Often
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="3"
                                        value={frequency}
                                        onChange={(e) => setFrequency(Number(e.target.value))}
                                        className="w-full accent-gray-700"
                                    />
                                </div>
                                <div className="flex justify-between text-xs mt-5 text-gray-600">
                                    {frequencyLabels.map((label, idx) => (
                                        <span
                                            key={idx}
                                            className={`${idx === frequency
                                                ? "font-degular text-[16px] font-medium text-[#404040]"
                                                : ""
                                                } `}
                                        >
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Dog Count */}
                            <div>
                                <label className="block font-degular font-medium lg:text-xl  text-lg text-[#404040] mb-5">
                                    How Many Dogs
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="1"
                                        max="4"
                                        value={dogCount}
                                        onChange={(e) => setDogCount(Number(e.target.value))}
                                        className="w-full accent-gray-700 mb-3 border  "
                                    />
                                </div>
                                <div className="flex justify-between  text-gray-700 text-lg  font-semibold">
                                    {[1, 2, 3, 4].map((num, i) => (
                                        <span
                                            className="text-[#404040]  font-degular font-semibold text-[28px]"
                                            key={num}
                                        >
                                            {/* {Array.from({ length: num }, (_, i) => (
                                                                            <FaPaw size={19} key={i} className="inline-block  " />
                                                                        ))} */}

                                            <div className=' flex justify-between ' >
                                                {i === 1 ? (
                                                    <><span className=' flex flex-row gap-1 items-center  ml-12 ' > <FaPaw size={17} /> <FaPaw size={15} /> </span></>
                                                ) : i === 2 ? (
                                                    <><span className=' flex flex-row gap-1 ml-6 items-center  ' > <FaPaw size={17} /> <FaPaw size={15} /> <FaPaw size={15} /> </span></>
                                                ) : i === 3 ? (
                                                    <><span className=' flex flex-row gap-1 items-center  ' > <FaPaw size={17} /> <FaPaw size={15} /> <FaPaw size={15} /> <FaPaw size={15} /> </span></>

                                                ) : (
                                                    <>
                                                        <span>
                                                            <FaPaw size={15} />
                                                        </span>
                                                    </>
                                                )
                                                }
                                            </div>

                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Select: Total Area Size */}
                            <div className="w-full mt-9">
                                <div className="relative mt-5">
                                    <select
                                        onChange={(e) => { setSelectedeArea(e.target.value) }}

                                        className="w-full lg:w-full px-4 lg:px-6 py-3 lg:py-4 bg-gray-100 rounded-xl text-[#40404080] border cursor-pointer appearance-none focus:outline-none focus:ring-0"
                                    >
                                        <option disabled selected value="">
                                            -select total area size-
                                        </option>
                                        <option>0.2 Acre</option>
                                        <option>0.2-1/3 Acre</option>
                                        <option>1/3-1/2 Acre</option>
                                        <option>1/2-3/4 Acre</option>
                                    </select>

                                    {/* Custom Dropdown Icon */}
                                    <span className="absolute right-4 top-4 lg:top-5 text-gray-500 pointer-events-none">
                                        <svg
                                            width="14"
                                            height="8"
                                            viewBox="0 0 14 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M6.429 7.38911L0.771999 1.73212L2.186 0.318115L7.136 5.26812L12.086 0.318115L13.5 1.73212L7.843 7.38911C7.65547 7.57659 7.40116 7.6819 7.136 7.6819C6.87084 7.6819 6.61653 7.57659 6.429 7.38911Z"
                                                fill="#404040"
                                                fillOpacity="0.5"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Select: Area to Clean */}
                            <div className="w-full mt-9">
                                <div className="relative mt-5">
                                    <select
                                        onChange={(e) => { setAreaClean(e.target.value) }}
                                        className="w-full lg:w-full px-4 lg:px-6 py-3 lg:py-4 bg-gray-100 rounded-xl text-[#40404080] border cursor-pointer appearance-none focus:outline-none focus:ring-0"
                                    >
                                        <option disabled selected value="">
                                            Area to clean
                                        </option>
                                        <option>Back Yard</option>
                                        <option>Whole Yard</option>
                                    </select>

                                    {/* Custom Dropdown Icon */}
                                    <span className="absolute right-4 top-4 lg:top-5 text-gray-500 pointer-events-none">
                                        <svg
                                            width="14"
                                            height="8"
                                            viewBox="0 0 14 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M6.429 7.38911L0.771999 1.73212L2.186 0.318115L7.136 5.26812L12.086 0.318115L13.5 1.73212L7.843 7.38911C7.65547 7.57659 7.40116 7.6819 7.136 7.6819C6.87084 7.6819 6.61653 7.57659 6.429 7.38911Z"
                                                fill="#404040"
                                                fillOpacity="0.5"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>




                        </div>


                        {/* right side  */}
                        <div className='bg-white lg:pt-[26px] lg:pb-[50px] py-6 lg:px-[38px] px-1 lg:w-[538px] rounded-[20px] lg:border ' >
                            <h1 className=' text-[#404040] lg:text-2xl text-xl font-degular font-semibold text-center ' >Service summary</h1>
                            <p className=' lg:mt-[34px] mt-2.5 text-[#404040] font-degular lg:text-[26px] ' >Subscription details</p>
                            <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4  ' >
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >How often:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-xl font-degular ' >{frequencyLabels[frequency]}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >How many dogs:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-xl font-degular ' > {dogCount} </p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Total area:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-xl font-degular ' >{selecetedSqarArea}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Area to clean:</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-xl font-degular ' >{areaClean}</p>
                                    </div>
                                </div>
                            </div>


                            <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4  ' >
                                <div className='flex justify-between items-center ' >
                                    <div className='  ' >
                                        <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Price per  visit:</h1>
                                        <p className=' lg:text-lg font-degular text-[#343434] ' >{frequencyLabels[frequency]}</p>
                                    </div>
                                    <div>
                                        <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' > ${response?.price_per_visit} </p>
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
                                            
                                           $ {
                                                response?.getDiscount ? <>{response?.discount_amount}</> : <>0</>
                                            }
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
                                        <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' >
                                            {
                                                response?.getCharge ? <>+ $15.00</> : <>$0</>
                                            }
                                        </p>
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
                                                response?.total_cost
                                            }

                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleContinue} className=' py-4 px-12 bg-bgColor w-full rounded-2xl mt-9 text-textColor text-2xl font-degular flex text-center justify-center mx-auto ' >
                                <span className=' flex items-center gap-2 ' >Continue <span>
                                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 7.34293L13.5298 7.34293L8.27482 2.1361L9.92604 0.5L18 8.5L9.92604 16.5L8.27482 14.8639L13.5298 9.65707L0 9.65707V7.34293Z" fill="black" />
                                    </svg>
                                </span> </span>
                            </button>


                        </div>
                    </div>
                </div>
            </div>
















            {/* registration modal  */}


            {openRegistrationModal && (
                <div className="fixed inset-0 w-full flex items-center justify-center border border-black bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg lg:w-7/12 mx-auto relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setOpenRegistrationModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            <IoClose size={24} />
                        </button>

                        <>
                            <div className=' bg-[#f6f6f6] ' >
                                <div className="flex flex-col lg:flex-row mx-auto pt-12 px-4 gap-8">
                                    {/* Left Side - Form */}
                                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                                        <div className="w-full max-w-xl">
                                            <h2 className="text-3xl font-bold text-black mb-6">Create Your Account</h2>
                                            <Form form={form} onFinish={registratinFromSubmit} layout="vertical">
                                                <Form.Item
                                                    name="full_name"
                                                    required
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Enter your full name.",
                                                        },
                                                    ]}
                                                    style={{ marginBottom: "0px" }}
                                                >
                                                    <Input
                                                        size="large"
                                                        placeholder="Your full name"
                                                        prefix={<UserOutlined />}
                                                        className="rounded-xl custom-placeholder"
                                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    required
                                                    rules={[{ required: true, message: "Enter your email or phone number" }]}
                                                    name={showPhone ? "phone_number" : "email"}
                                                    style={{ marginTop: "20px", width: "100%" }}
                                                >
                                                    <div className="relative">
                                                        <Input
                                                            size="large"
                                                            type={showPhone ? "tel" : "email"}
                                                            placeholder={showPhone ? "Enter your phone number" : "Enter your email"}
                                                            prefix={showPhone ? <PhoneOutlined /> : <MailOutlined />}
                                                            className="rounded-xl custom-placeholder w-full"
                                                            style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPhone(!showPhone)}
                                                            className="text-sm text-blue-600 hover:underline absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                                                        >
                                                            {showPhone ? <> <p className=' text-[#404040]  ' >Use email address</p> </> : <> <p className=' text-[#404040] '  >Use phone number</p> </>}
                                                        </button>
                                                    </div>
                                                </Form.Item>


                                                <Form.Item name={"address"} rules={[{
                                                    required: true,
                                                    message: "Enter your location."
                                                }]} style={{ marginTop: "20px" }} >
                                                    <Input
                                                        size="large"
                                                        placeholder="Your location"
                                                        prefix={<EnvironmentOutlined />} className="rounded-xl custom-placeholder  "
                                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Enter your password.",
                                                        },
                                                    ]}
                                                    style={{ marginTop: "20px" }}
                                                >
                                                    <Input.Password
                                                        size="large"
                                                        placeholder="Password"
                                                        prefix={<LockOutlined />}
                                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                        className="rounded-xl custom-placeholder"
                                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    name="password_confirmation"
                                                    dependencies={["password"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Enter your confirm password.",
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue("password") === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(new Error("Passwords do not match."));
                                                            },
                                                        }),
                                                    ]}
                                                    style={{ marginTop: "20px" }}
                                                >
                                                    <Input.Password
                                                        size="large"
                                                        placeholder="Confirm password"
                                                        prefix={<LockOutlined />}
                                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                        className="rounded-xl custom-placeholder"
                                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                                    />
                                                </Form.Item>

                                                <Form.Item style={{ marginTop: "20px" }}>
                                                    <Input
                                                        size="large"
                                                        placeholder="Referral Code (optional)"
                                                        prefix={<span className='' >{<TeamOutlined />}</span>}
                                                        className="rounded-xl custom-placeholder  "
                                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                                    />
                                                </Form.Item>

                                                <Form.Item>
                                                    <Button
                                                        loading={loading}
                                                        disabled={loading}
                                                        block
                                                        size="large"
                                                        htmlType="submit"
                                                        className="border-none bg-bgColor hover:bg-bgColor text-black font-medium font-degular h-12 "
                                                    >
                                                        Create Account
                                                    </Button>
                                                </Form.Item>
                                            </Form>

                                            <p className="text-center text-sm text-[#000000] lg:pb-16 ">
                                                Already have an account?{' '}
                                                <p className=" text-black cursor-pointer ">
                                                    <span onClick={handleOpenLoginModal} className=' text-[#0063E5] underline ' >Login here</span>
                                                </p>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Side - Image */}
                                    <div className=" ">
                                        <img
                                            src="/images/registration/regImg.png"
                                            alt="Registration Illustration"
                                            className="object-cover rounded-xl mt-[22%] mx-auto block "
                                        />
                                    </div>
                                </div>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                            </div>
                        </>


                    </div>
                </div>
            )}






            {/* loginModal  */}



            {loginModal && (
                <div className="fixed inset-0 w-full flex items-center justify-center border border-black bg-black bg-opacity-50 z-50">
                    <div className="bg-white px-3 rounded-lg shadow-lg lg:w-9/12 w-full mx-auto relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setLoginModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            <IoClose size={24} />
                        </button>

                        <>
                            <div className="flex flex-col lg:flex-row mx-auto pt-12 ">
                                {/* Left Side - Form */}
                                <div className="w-full lg:w-1/2 flex items-center justify-center">
                                    <div className="w-full max-w-xl">
                                        <h2 className="lg:text-3xl text-xl font-bold text-black mb-6">Login Your Account</h2>
                                        <Form form={form} onFinish={handleLogin} layout="vertical">


                                            <Form.Item
                                                required
                                                rules={[{ required: true, message: "Enter your email or phone number" }]}
                                                name={showPhone ? "phone_number" : "email"}
                                                style={{ marginTop: "20px", width: "100%" }}
                                            >
                                                <div className="relative">
                                                    <Input
                                                        size="large"
                                                        type={showPhone ? "tel" : "email"}
                                                        placeholder={showPhone ? "Enter your phone number" : "Enter your email"}
                                                        prefix={showPhone ? <PhoneOutlined /> : <MailOutlined />}
                                                        className="rounded-xl custom-placeholder w-full"
                                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPhone(!showPhone)}
                                                        className="text-sm text-blue-600 hover:underline absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                                                    >
                                                        {showPhone ? <> <p className=' text-[#404040]  ' >Email address</p> </> : <> <p className=' text-[#404040] '  >Phone number</p> </>}
                                                    </button>
                                                </div>
                                            </Form.Item>




                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter your password.",
                                                    },
                                                ]}
                                                style={{ marginTop: "20px" }}
                                            >
                                                <Input.Password
                                                    size="large"
                                                    placeholder="Password"
                                                    prefix={<LockOutlined />}
                                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                    className="rounded-xl custom-placeholder"
                                                    style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                                />
                                            </Form.Item>

                                            <div className="flex flex-col items-center lg:flex-row lg:items-center justify-between lg:my-9 my-3 ">
                                                <Form.Item

                                                >
                                                    <Checkbox
                                                        style={{ color: "#000000" }}
                                                        className=" text-[#000000] font-degular font-medium lg:text-xl "
                                                    >
                                                        Remember me
                                                    </Checkbox>
                                                </Form.Item>

                                                <div className=" -mt-5 ">
                                                    <Link
                                                        to={"/email-verify"}
                                                        className=" text-[#000000] font-degular font-medium lg:text-xl "
                                                    >
                                                        Forgot password ?
                                                    </Link>
                                                </div>
                                            </div>





                                            <Form.Item>
                                                <Button
                                                    loading={loading}
                                                    disabled={loading}
                                                    block
                                                    size="large"
                                                    htmlType="submit"
                                                    className="border-none bg-bgColor hover:bg-bgColor text-black font-medium font-degular h-12 "
                                                >
                                                    Login
                                                </Button>
                                            </Form.Item>
                                        </Form>

                                        <div>
                                            <p className="text-center mt-6 text-[#000000] font-degular lg:text-lg lg:pb-20 ">
                                                Don’t have an account?{" "}
                                                <span onClick={handleOpenRegistrationModal} className="text-[#0063E5] underline cursor-pointer ">
                                                    <span>Register Here</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Image */}
                                <div className=" lg:ml-[10%] ">
                                    <img
                                        src="/images/registration/regImg.png"
                                        alt="Registration Illustration"
                                        className="object-cover rounded-xl lg:h-[422px] h-[200px] mt-4 lg:mt-0 block mx-auto  "
                                    />
                                </div>
                            </div>
                        </>


                    </div>
                </div>
            )}








        </>
    )
}

export default Quote

// to={"/checkout"}