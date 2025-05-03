import React from 'react'
import Footer from '../../../components/client/footer/Footer'
import { Link } from 'react-router-dom'

const TermCondiction: React.FC = () => {
    return (
        <div>
            <div className='pt-[46px] pb-[65px] bg-[#f6f6f6]  ' >
                <div className=' ' >
                    <div className=' max-w-[1519px] mx-auto flex flex-col lg:flex-row items-start gap-7 ' >
                        {/* left side  */}
                        <div className='flex items-center gap-[22px] ' >
                            <div className=' w-[55px] h-[55px] rounded-full bg-white flex items-center justify-center  ' >
                                <Link to={"/"}><span>
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                                    </svg>

                                </span></Link>
                            </div>
                            <div>
                                <h1 className=' lg:text-3xl font-degular font-medium  ' >Back</h1>
                            </div>
                            <div>

                            </div>
                        </div>
                        {/* right side  */}
                        <div className='relative w-full max-w-[1006px] h-[423px] lg:ml-[10%] '>
                            {/* Background Image */}
                            <img
                                src="/images/privacy/privacyImg.jpg"
                                className="w-full h-full object-cover rounded-[20px]"
                                alt="Terms & Conditions"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute rounded-[20px] inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                            {/* Centered Text */}
                            <div className="absolute inset-0 flex items-center top-[300px] justify-center">
                                <h1 className="text-4xl font-degular font-medium text-white text-center">
                                    Terms & Conditions
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className='max-w-[759px] mx-auto text-[#000000] font-degular text-xl font-medium mt-9 ' >
                        <p className='text-center' >At Clearpath , your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                    </div>

                    <div className='max-w-[1519px] mx-auto mt-[46px] ' >
                        <p className=' text-lg text-[#000000] font-degular font-thin ' >
                            By accessing or using Clearpath's website and services, you agree to be bound by the following terms and conditions. Clearpath provides professional pet waste removal services for residential and commercial properties, subject to availability within our service areas. Users are responsible for providing accurate contact and property information, ensuring safe and accessible service areas, and notifying us of any potential hazards such as aggressive pets or unsafe environments.
                        </p>
                        <p className=' mt-[15px] font-degular font-thin text-[#000000]  ' >
                            All services must be paid for at the time of booking unless otherwise arranged. We accept all major payment methods through secure, third-party processors. You may cancel or reschedule a service at least 24 hours in advance without penalty. Late cancellations may incur a fee, and refunds are only issued in the event of service failure or billing errors.
                        </p>
                        <p className='font-degular font-thin text-[#000000]' >
                            Clearpath is not liable for injuries caused by pets, unsafe environments, or any incidents arising from misinformation or conditions beyond our control, including weather or emergencies. Your privacy is important to us, and all user data is handled in accordance with our Privacy Policy.
                        </p>
                        <p className='font-degular font-thin text-[#000000]' >
                            We reserve the right to update or modify these terms at any time. Continued use of our services after changes have been made implies your acceptance of the revised terms.
                        </p>
                    </div>



                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default TermCondiction
