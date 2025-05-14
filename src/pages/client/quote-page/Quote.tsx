import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { message } from 'antd';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';




const Quote: React.FC = () => {
    const axiosPublic = useAxiosPublic()
    const [frequency, setFrequency] = useState(0);
    const [dogCount, setDogCount] = useState(1);
    const [selecetedArea, setSelectedeArea] = useState(null);
    const [areaClean, setAreaClean] = useState(null);
    const [selectAreaSqar, setSelectAreaSqar] = useState(null);
    const [searchParams] = useSearchParams();
    const postCode = searchParams.get('zip-code');
    const token = localStorage.getItem("token")

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const frequencyLabels = [
        "Once a week",
        "Two times a week",
        "Bi-weekly",
        "Once a month",
    ];

    useEffect(() => {
        // Only update state when selecetedArea changes
        const selectArea = selecetedArea ? parseFloat(selecetedArea.split(" ")[0]) : null;
        if (selectArea !== null) {
            setSelectAreaSqar(selectArea * 43560);
        }
    }, [selecetedArea]);




    const [price, setPrice] = useState(0)

    useEffect(() => {

        // 1 acer 

        if (dogCount === 1 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 43560) {
            setPrice(65)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 43560) {
            setPrice(69)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 43560) {
            setPrice(76)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 43560) {
            setPrice(82)
        }
        // Two times a week

        else if (dogCount === 1 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 43560) {
            setPrice(100)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 43560) {
            setPrice(105)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 43560) {
            setPrice(108)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 43560) {
            setPrice(112)
        }

        // Bi-weekly

        else if (dogCount === 1 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 43560) {
            setPrice(53)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 43560) {
            setPrice(56)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 43560) {
            setPrice(61)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 43560) {
            setPrice(67)
        }

        // Once a month

        else if (dogCount === 1 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 43560) {
            setPrice(42)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 43560) {
            setPrice(46.2)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 43560) {
            setPrice(52)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 43560) {
            setPrice(59)
        }


        // 2 acer 
        // Once a week
        if (dogCount === 1 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 87120) {
            setPrice(90)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 87120) {
            setPrice(96)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 87120) {
            setPrice(103)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 87120) {
            setPrice(110)
        }
        // Two times a week

        else if (dogCount === 1 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 87120) {
            setPrice(140)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 87120) {
            setPrice(146)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 87120) {
            setPrice(152)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 87120) {
            setPrice(158)
        }

        // Bi-weekly

        else if (dogCount === 1 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 87120) {
            setPrice(72)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 87120) {
            setPrice(80)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 87120) {
            setPrice(88)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 87120) {
            setPrice(95)
        }

        // Once a month

        else if (dogCount === 1 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 87120) {
            setPrice(58)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 87120) {
            setPrice(65)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 87120) {
            setPrice(72)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 87120) {
            setPrice(80)
        }

        // 3 acer 



        // Once a week
        if (dogCount === 1 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 130680) {
            setPrice(120)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 130680) {
            setPrice(128)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 130680) {
            setPrice(133)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 130680) {
            setPrice(140)
        }
        // Two times a week

        else if (dogCount === 1 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 130680) {
            setPrice(180)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 130680) {
            setPrice(186)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 130680) {
            setPrice(192)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 130680) {
            setPrice(199)
        }

        // Bi-weekly

        else if (dogCount === 1 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 130680) {
            setPrice(100)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 130680) {
            setPrice(107)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 130680) {
            setPrice(114)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 130680) {
            setPrice(121)
        }

        // Once a month

        else if (dogCount === 1 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 130680) {
            setPrice(70)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 130680) {
            setPrice(85)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 130680) {
            setPrice(90)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 130680) {
            setPrice(95)
        }


        // 4 acer 



        // Once a week
        if (dogCount === 1 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 174240) {
            setPrice(165)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 174240) {
            setPrice(174)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 174240) {
            setPrice(183)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Once a week" && selectAreaSqar === 174240) {
            setPrice(193)
        }
        // Two times a week

        else if (dogCount === 1 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 174240) {
            setPrice(210)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 174240) {
            setPrice(220)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 174240) {
            setPrice(230)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Two times a week" && selectAreaSqar === 174240) {
            setPrice(240)
        }

        // Bi-weekly

        else if (dogCount === 1 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 174240) {
            setPrice(130)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 174240) {
            setPrice(140)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 174240) {
            setPrice(150)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Bi-weekly" && selectAreaSqar === 174240) {
            setPrice(160)
        }

        // Once a month

        else if (dogCount === 1 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 174240) {
            setPrice(90)
        } else if (dogCount === 2 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 174240) {
            setPrice(100)
        } else if (dogCount === 3 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 174240) {
            setPrice(110)
        } else if (dogCount === 4 && frequencyLabels[frequency] === "Once a month" && selectAreaSqar === 174240) {
            setPrice(120)
        }








    }, [dogCount, frequency, selectAreaSqar]);


    // discount api integrate 



    const [getDiscount, setDiscount] = useState<boolean>(true);
    const [charge, setCharge] = useState<boolean>(true)

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

    console.log(getDiscount)


    const navigate = useNavigate();

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




    const handleSubmit = async () => {


        if (!postCode) {
            return message.error("Select a postcode.");
        }

        if (!frequencyLabels[frequency]) {
            return message.error("Select a time.");
        }

        if (dogCount <= 0) {
            return message.error("Please select a dog!");
        }

        if (!selecetedArea) {
            return message.error("Please select your area!");
        }
        if (!areaClean) {
            return message.error("Please select your clean area!")
        }

        navigate(`/checkout?postCode=${postCode}&frequency=${frequencyLabels[frequency]}&dog=${dogCount}&selectedArea=${selectAreaSqar}&cleanArea=${areaClean}&price=${price}`)



        // Continue with form submission logic here...
    };









    return (
        <div className='bg-[#f6f6f6]  pt-[46px] pb-[87px] ' >
            <div className=' max-w-[1519px] mx-auto lg:px-0 px-4 ' >
                <div className='' >
                    <div className='flex flex-row items-center gap-5 cursor-pointer ' >
                        <div className=' lg:w-[55px] lg:h-[53px] w-[33px] h-[30px]  bg-white rounded-full flex items-center  justify-center  ' >
                            <Link to={"/"}>
                                <span>
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
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
                            type="text"
                            defaultValue={postCode}
                            placeholder="Zip Code"
                            className="w-full border border-gray-300 px-4 lg:px-6 py-3 lg:py-4 text-sm placeholder-gray-400 focus:outline-none rounded-[20px]"
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
                                            }`}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Dog Count */}
                        <div>
                            <label className="block font-degular font-medium lg:text-xl text-lg text-[#404040] mb-5">
                                How Many Dogs
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="1"
                                    max="4"
                                    value={dogCount}
                                    onChange={(e) => setDogCount(Number(e.target.value))}
                                    className="w-full accent-gray-700 mb-3"
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-gray-700 text-lg font-semibold">
                                {[1, 2, 3, 4].map((num) => (
                                    <span
                                        className="text-[#404040] font-degular font-semibold text-[28px]"
                                        key={num}
                                    >
                                        {num}
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
                                    <option>1 acre</option>
                                    <option>2 acre</option>
                                    <option>3 acre</option>
                                    <option>4 acre</option>
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
                                    <p className='text-[#343434] lg:text-xl font-degular ' >{selectAreaSqar} sq ft</p>
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
                                    <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' > ${price} </p>
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
                                        ${
                                            getDiscount ? <>{price/2}</> : <>0</>
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
                                    <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' >{
                                        charge ? <>+ $15.00</> : <>$0</>
                                    }</p>
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
                                            grantTotal
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button onClick={handleSubmit} className=' py-4 px-12 bg-bgColor w-full rounded-2xl mt-9 text-textColor text-2xl font-degular flex text-center justify-center mx-auto ' >
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
    )
}

export default Quote

// to={"/checkout"}