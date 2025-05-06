import React from 'react'

const Checkout: React.FC = () => {
    return (
        <div className=' bg-[#f6f6f6] ' >
            <div className=' max-w-[1519px] mx-auto ' >
                <div>
                    <div className='flex items-center gap-5 ' >
                        <div className=' w-[55px] h-[53px] bg-white rounded-full flex items-center  justify-center  ' >
                            <span>
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                                </svg>
                            </span>
                        </div>
                        <div>
                            <h1 className=' text-3xl font-degular text-textColor ' >Back</h1>
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
                                <div className=' -mt-4 bg-white ' >
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
                <h1>Billing details</h1>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Checkout
