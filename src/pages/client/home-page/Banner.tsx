import React from 'react'

const Banner: React.FC = () => {
    return (
        <div>
            <div className="bg-[url('/images/home-page/home-banner.jpg')] bg-cover bg-center w-full lg:h-[765px] pb-6 border">
                <div className="lg:max-w-[1519px] mx-auto px-4">
                    <div className="max-w-[763px] lg:pt-[131px] md:pt-20 pt-16">
                        <h1 className="lg:text-[45px] md:text-2xl text-xl font-degular text-white leading-10 mb-3">
                            Say Goodbye to Pet Waste Hassles!
                        </h1>
                        <p className="text-white font-degular text-3xl font-thin">
                            Eco-friendly, affordable, and reliable pet waste removal services right at your doorstep.
                        </p>
                        <div className="mt-11">
                            <p className="text-white font-degular text-2xl">
                                Get 50% off in your first month.
                            </p>
                        </div>

                        {/* Input + Button Responsive */}
                        <div className="mt-5 relative w-full max-w-[590px]">
                            <input
                                className="border border-white hover:outline-none focus:outline-none py-6 px-9 pr-44 w-full rounded-[40px] bg-[#BAE9FF99] placeholder:text-[#505050] placeholder:text-2xl font-degular"
                                type="text"
                                placeholder="Zip Code"
                            />

                            {/* Button inside input on large screens */}
                            <button
                                className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-2 bg-white text-black py-5 px-12 w-[200px] rounded-[40px] font-degular text-xl"
                            >
                                Get Quote
                            </button>

                            {/* Button below input on small/medium screens */}
                            <button
                                className="block lg:hidden mt-4 bg-white text-black py-4 px-8 w-full rounded-[40px] font-degular text-xl"
                            >
                                Get Quote
                            </button>
                        </div>
                    </div>

                    {/* Review Box */}
                    <div className="w-[296px] border border-white mt-6 flex gap-2.5 rounded-xl p-6 absolute lg:left-[70%]">
                        <div>
                            <img className="w-12 h-12 rounded-full" src="/images/home-page/banner-1.jpg" />
                        </div>
                        <div>
                            <h1 className="text-black font-degular text-xl">Jenifer Lopej</h1>
                            <div className="flex">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#FF9D00" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Happy Clients */}
                    <div className="mt-32">
                        <h1 className="text-white font-degular text-2xl font-semibold">200 +</h1>
                        <p className="text-[#FFFFFF] text-[22px] font-thin font-degular">Happy Clients</p>
                        <div className="mt-2">
                            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                {[
                                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
                                    "/images/home-page/img-1.jpg",
                                    "/images/home-page/img-2.jpg",
                                    "/images/home-page/img-3.jpg"
                                ].map((src, index) => (
                                    <div className="avatar" key={index}>
                                        <div className="w-12">
                                            <img src={src} />
                                        </div>
                                    </div>
                                ))}
                                <div className="avatar placeholder">
                                    <div className="bg-white w-12 flex items-center justify-center  rounded-full">
                                        <span className="text-black font-bold text-4xl ml-2.5 ">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner
