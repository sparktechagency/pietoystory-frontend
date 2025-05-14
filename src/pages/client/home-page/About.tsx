import React from 'react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
    return (
        <div className='bg-[#f6f6f6] pt-10 md:pt-10' id='/about' >
            <div className='max-w-[1519px] mx-auto px-4 md:px-6'>
                <h1 className='text-center text-2xl md:text-[40px] font-degular text-textColor font-thin'>
                    About us
                </h1>

                <div className='flex flex-col lg:flex-row gap-y-8 lg:gap-x-[138px]  md:mt-[50px]'>
                    {/* Left Text Content */}
                    <div className='w-full lg:max-w-[643px] py-6 md:py-11'>
                        <h1 className='text-xl md:text-[28px] text-textColor font-degular font-medium'>
                            - At Clearpath,
                        </h1>
                        <h1 className='mt-2 text-base md:text-2xl text-textColor font-degular'>
                            We're passionate about two things — pets and cleanliness. We know that owning a pet brings
                            endless joy, but cleaning up after them? Not so much. That’s where we come in.
                        </h1>
                        <p className='mt-5 md:mt-7 text-base md:text-xl font-degular text-textColor'>
                            Founded with a mission to make pet ownership easier and communities cleaner, we offer
                            professional pet waste removal services that are reliable, affordable, and eco-friendly.
                            Whether you’re a busy pet parent, a landlord, or a community manager, we’re here to keep
                            your outdoor spaces fresh and waste-free — so you can spend more time enjoying your pets
                            and less time worrying about the mess.
                        </p>
                            <Link to="/quote-page" className='flex items-center w-[250px]  gap-3 font-medium mt-6 md:mt-7 px-4 md:px-12 py-4 md:py-6 bg-bgColor rounded-[40px] font-degular text-sm md:text-xl '>
                                Instant Quote
                                <span>
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.838664 12.0459L10.4057 2.47885L3.00806 2.51289L3.01875 0.188399L14.3848 0.136102L14.3325 11.5021L12.008 11.5128L12.042 4.1152L2.47501 13.6822L0.838664 12.0459Z" fill="black" />
                                    </svg>
                                </span>
                            </Link>
                    </div>

                    {/* Right Image Content */}
                    <div className='w-full lg:max-w-[738px] flex flex-col gap-3'>
                        <div className='flex flex-col sm:flex-row gap-3'>
                            <img src="/images/home-page/aboutImg-1.jpg" alt="" className='w-full sm:w-[60%] h-[200px] sm:h-[240px] object-cover rounded-[20px]' />
                            <img src="/images/home-page/aboutImg-2.jpg" alt="" className='w-full sm:w-[40%] h-[200px] sm:h-[240px] object-cover rounded-[20px]' />
                        </div>
                        <div className='flex flex-col sm:flex-row gap-3'>
                            <img src="/images/home-page/aboutImg-3.jpg" alt="" className='w-full sm:w-1/2 h-[200px] sm:h-[240px] object-cover rounded-[20px]' />
                            <img src="/images/home-page/aboutImg-4.jpg" alt="" className='w-full sm:w-1/2 h-[200px] sm:h-[240px] object-cover rounded-[20px]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default About
