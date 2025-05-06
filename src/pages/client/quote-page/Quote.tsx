import React from 'react'
import { Link } from 'react-router-dom'

const Quote: React.FC = () => {
    return (
        <div className='bg-[#f6f6f6]  pt-[46px] pb-[87px] ' >
            <div className=' max-w-[1519px] mx-auto ' >
                <div className='' >
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
                    </div>
                    <div className=' -mt-14  ' >
                        <h1 className='text-center text-[#3D3D3D] text-[40px] font-degular ' >Get an Instant Quote</h1>
                        <p className='text-center text-[#3D3D3D] text-xl font-degular font-medium ' >Discover how easy and affordable pet waste removal can <br /> be. No obligations, just clean yards!</p>
                    </div>
                </div>
                <div className=' flex justify-between mt-7  ' >
                    {/* left side  */}
                    <div></div>
                    {/* right side  */}
                    <div className='bg-white pt-[26px] pb-[50px] px-[38px] w-[538px] rounded-[20px] border ' >
                        <h1 className=' text-[#404040] text-2xl font-degular font-semibold text-center ' >Service summary</h1>
                        <p className=' mt-[34px] text-[#404040] font-degular text-[26px] ' >Subscription details</p>
                        <div className=' mt-2.5 rounded-2xl py-3.5 px-5 border space-y-4  ' >
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] text-[22px] font-degular  font-semibold' >How often:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] text-xl font-degular ' >Ones a week</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] text-[22px] font-degular  font-semibold' >How many dogs:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] text-xl font-degular ' >2</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] text-[22px] font-degular  font-semibold' >Total area:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] text-xl font-degular ' >1000 sq ft</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] text-[22px] font-degular  font-semibold' >Area to clean:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] text-xl font-degular ' >Back Yard</p>
                                </div>
                            </div>
                        </div>


                        <div className=' mt-2.5 rounded-2xl py-3.5 px-5 border space-y-4  ' >
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] text-[22px] font-degular  font-semibold' >Price per  visit:</h1>
                                    <p className=' text-lg font-degular text-[#343434] ' >Billed monthly</p>
                                </div>
                                <div>
                                    <p className='text-[#343434] text-[26px] font-semibold font-degular ' >$18.00</p>
                                </div>
                            </div>
                        </div>


                        <div className=' mt-2.5 rounded-2xl py-3.5 px-5 border space-y-4  ' >
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] text-[22px] font-degular  font-semibold' >50% off for first time cleaning:</h1>
                                </div>
                                <div>
                                    <p className='text-[#FF434B] text-[26px] font-semibold font-degular ' >- $9.00</p>
                                </div>
                            </div>
                        </div>

                        <div className=' mt-2.5 rounded-2xl py-3.5 px-5 border space-y-4  ' >
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] text-[22px] font-degular  font-semibold' >One time charge:</h1>
                                    <p className=' text-lg font-degular text-[#343434] ' >Monthly</p>
                                </div>
                                <div>
                                    <p className='text-[#343434] text-[26px] font-semibold font-degular ' >+ $15.00</p>
                                </div>
                            </div>
                        </div>


                        <div className=' mt-2.5 rounded-2xl py-3.5 px-5 border space-y-4  ' >
                            <div className='flex justify-between items-center ' >
                                <div className='  ' >
                                    <h1 className=' text-[#343434] text-[22px] font-degular  font-semibold' >Total cost:</h1>
                                </div>
                                <div>
                                    <p className='text-[#343434] text-[26px] font-semibold font-degular ' >$24.00</p>
                                </div>
                            </div>
                        </div>

                        <button className=' py-4 px-12 bg-bgColor w-full rounded-2xl mt-9 text-textColor text-2xl font-degular flex text-center justify-center mx-auto ' >
                            <Link className=' flex items-center gap-2 ' to={""}>Continue <span>
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 7.34293L13.5298 7.34293L8.27482 2.1361L9.92604 0.5L18 8.5L9.92604 16.5L8.27482 14.8639L13.5298 9.65707L0 9.65707V7.34293Z" fill="black" />
                                </svg>
                            </span> </Link>
                        </button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quote
