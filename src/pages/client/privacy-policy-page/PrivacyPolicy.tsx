import React from 'react'
import Footer from '../../../components/client/footer/Footer'
import { Link, useNavigate } from 'react-router-dom'

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();
    window.scrollTo(0,0);
    const navigateHomePage = () => {
        navigate("/")
    }
    return (
        <>
            <div className='pt-[46px] pb-[65px] bg-[#f6f6f6]  ' >
                <div className=' ' >
                    <div className=' max-w-[1519px] mx-auto flex flex-col lg:flex-row items-start gap-7 ' >
                        {/* left side  */}
                        <div onClick={navigateHomePage} className='flex items-center gap-[22px] cursor-pointer ' >
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
                                alt="Privacy Policy"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute rounded-[20px] inset-0 bg-gradient-thttps://www.youtube.com/watch?v=rmW6T72_RAU&list=PL_XxuZqN0xVAO0uVm0ClJ3wsKHJw6G_TL&index=2&pp=iAQBo-t from-black/80 to-transparent"></div>

                            {/* Centered Text */}
                            <div className="absolute inset-0 flex items-center top-[300px] justify-center">
                                <h1 className="text-4xl font-degular font-medium text-white text-center">
                                    Privacy Policy
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className='max-w-[759px] mx-auto text-[#000000] font-degular text-xl font-medium mt-9 ' >
                        <p className='text-center' >At Clearpath , your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                    </div>


                    <div className='max-w-[1519px] mx-auto mt-9 px-4'>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-9">
                            {/* Section 1 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">1. Information We Collect</h3>
                                <ul className="list-disc list-inside font-degular text-[16px] font-thin space-y-1">
                                    <li className='ml-3 ' >Personal Information: Name, email, phone number, address (provided when booking services or contacting us).</li>
                                    <li className='ml-3 ' >Usage Data: Information about how you interact with our website (pages visited, time spent, etc.).</li>
                                    <li className='ml-3 ' >Cookies: We use cookies to improve your browsing experience and track website performance.</li>
                                </ul>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
                                <ul className="list-disc list-inside font-degular text-[16px] font-thin space-y-1">
                                    <li className='ml-3' >To provide and manage our pet waste removal services.</li>
                                    <li className='ml-3' >To communicate with you about appointments, quotes, and promotions.</li>
                                    <li className='ml-3' >To improve our website and customer experience.</li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">3. Sharing Your Information</h3>
                                <ul className="list-disc list-inside font-degular text-[16px] font-thin space-y-1">
                                    <li className='ml-3' >We do not sell, trade, or rent your personal information. We may share data with trusted third-party providers only when necessary to operate our services (e.g., payment processing, email notifications).</li>
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">4. Data Security</h3>
                                <ul className="list-disc list-inside font-degular text-[16px] font-thin space-y-1">
                                    <li className='ml-3' >We implement appropriate security measures to protect your information from unauthorized access, alteration, or disclosure.</li>
                                </ul>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">5. Your Choices</h3>
                                <ul className="list-disc list-inside font-degular text-[16px] font-thin space-y-1">
                                    <li className='ml-3' >You can opt out of promotional emails at any time and request access, correction, or deletion of your data by contacting us.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </>
    )
}

export default PrivacyPolicy
