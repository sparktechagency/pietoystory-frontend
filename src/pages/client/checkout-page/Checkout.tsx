import React from 'react'
import Footer from '../../../components/client/footer/Footer'
import { Link } from 'react-router-dom'
import StripePayment from '../../../components/client/payment/StripePayment'

const Checkout: React.FC = () => {
    return (
        <div className=' bg-[#f6f6f6]  ' >
            <div className=' max-w-[1519px] mx-auto   pb-12 px-4 lg:px-0 ' >
                <div className=' lg:block hidden' >
                    <div className='flex items-center gap-5 cursor-pointer ' >
                        <Link to={"/" }>
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
















                <h1 className=' lg:text-xl text-textColor font-degular font-medium lg:ml-32 my-3 ' >Billing details</h1>
                <div className=' max-w-[1286px] mx-auto flex flex-col lg:flex-row gap-x-5 my-3 ' >
                    {/* left side  */}
                    <div className=' max-w-[619px] w-full  ' >
                        <form>
                            <div>
                                <input type="text" placeholder='Full address' className=' bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular ' />
                            </div>
                            <div className='flex flex-col lg:flex-row gap-3 my-3 ' >
                                <div className='w-full' >
                                    <input type="text" placeholder='Your first name' className=' bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular ' />
                                </div>
                                <div className=' w-full ' >
                                    <input type="text" placeholder='Last name' className=' bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular ' />
                                </div>
                            </div>
                            <div className=' w-full ' >
                                <input type="text" placeholder='Dog’s name (optional)' className=' bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular ' />
                            </div>
                            <div className="w-full my-3 ">
                                <textarea
                                    className="' bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-7 px-3.5 rounded-[30px] hover:outline-none focus:outline-none border placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular ' "
                                    placeholder="Additional comments"
                                    rows="5"
                                />
                            </div>
                            <div>
                                <div className="w-full mb-6">
                                    <label className="block lg:text-xl font-medium mb-2 font-degular ">Contact information</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="example@gmail.com"
                                            className="bg-[#f6f6f6] w-full lg:py-4 py-2 lg:px-20 px-16 rounded-[30px] border focus:outline-none placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular"
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
                                            type="text"
                                            placeholder="Phone number"
                                            className="bg-[#f6f6f6] w-full lg:py-4 py-2  lg:px-20 px-16 rounded-[30px] border focus:outline-none placeholder:text-[#404040] lg:placeholder:text-xl placeholder:font-degular"
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
                                        type="checkbox"
                                        id="agreement"
                                        name="agreement"
                                        className="w-5 h-5 text-[#404040] border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer"
                                    />
                                    <label htmlFor="agreement" className="text-[#404040] lg:text-lg font-medium font-degular ">
                                        I agree to your <span className="text-[#1434CB] cursor-pointer">privacy policy</span> and <span className="text-[#1434CB] cursor-pointer">terms & conditions</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* right side  */}
                    <div className=' max-w-[482px] mx-auto w-full ' >

                        <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4  ' >
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >How often:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] lg:text-xl font-degular ' >Ones a week</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >How many dogs:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] lg:text-xl font-degular ' >2</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Total area:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] lg:text-xl font-degular ' >1000 sq ft</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Area to clean:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] lg:text-xl font-degular ' >Back Yard</p>
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
                                    <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' >$18.00</p>
                                </div>
                            </div>
                        </div>


                        <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4 ' >
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >50% off for first time cleaning:</h1>
                                </div>
                                <div>
                                    <p className='text-[#FF434B] lg:text-[26px] text-sm font-semibold font-degular ' >- $9.00</p>
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
                                    <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' >+ $15.00</p>
                                </div>
                            </div>
                        </div>

                        <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4 ' >
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] lg:text-[22px] font-degular  font-semibold' >Total cost:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] lg:text-[26px] font-semibold font-degular ' >$24.00</p>
                                </div>
                            </div>
                        </div>
                        <div className=' lg:mt-2.5 mt-2 rounded-2xl lg:py-3.5 py-2 lg:px-5 px-2 border lg:space-y-4 ' >
                            <div className="flex items-center space-x-3  ">
                                <input
                                    type="checkbox"
                                    id="free"
                                    name="free"
                                    className="w-5 h-5 text-[#404040] border-gray-300 rounded focus:ring-0 focus:outline-none cursor-pointer"
                                />
                                <label htmlFor="free" className="text-[#404040] lg:text-lg font-medium font-degular ">
                                    Use free cleanup ( Remaining 8 )
                                </label>
                            </div>
                        </div>
                        <div>
                            <StripePayment></StripePayment>
                        </div>



                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Checkout
