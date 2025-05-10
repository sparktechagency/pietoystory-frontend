import React from 'react'
import { Link } from 'react-router-dom';

const PromisseRefer: React.FC = () => {
    interface dataInt {
        icon: string;
        description: string
    }

    let data: dataInt[] = [
        {
            icon: "/images/home-page/icon-1.png",
            description: "Our reliable, hassle-free The PNW’s dog waste removal service ensures timely, efficient visits, leaving your yard pristine. Enjoy more time with your dog—let us handle the mess!"
        },
        {
            icon: "/images/home-page/icon-2.png",
            description: "At Clearpath, we guarantee your satisfaction with our Seattle pooper scooper service. If you’re not happy, we’ll make it right—your happiness is our priority."
        },
        {
            icon: "/images/home-page/icon-3.png",
            description: "Swoop Scoop® prioritizes health and safety by using sanitary practices and eco-friendly disposal methods, ensuring a clean, safe environment for The PNW pets and families."
        }
    ];


    return (
        <div>
            <div className="bg-[url('/images/home-page/banner-2.png')] bg-cover bg-center w-full bg-[#f6f6f6] pt-10 md:pt-16">
                <div className='max-w-[1519px] mx-auto md:px-4 '>
                    <div>
                        
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-10 md:pb-14'>
                        {
                            data.map((item, i) => (
                                <div key={i} className='border-2 p-6 md:p-9 rounded-[20px]'>
                                    <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-white mx-auto flex justify-center items-center'>
                                        <img
                                            src={item?.icon}
                                            alt=""
                                            className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover'
                                        />
                                    </div>
                                
                                    <p className='text-center text-textColor mt-4 md:mt-6 font-degular text-base md:text-xl font-thin'>
                                        {item?.description}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='max-w-[1519px] mx-auto bg-white flex flex-col lg:flex-row gap-y-8 lg:gap-x-36 rounded-[20px] '>
                    <div className='w-full lg:max-w-[861px] lg:px-10 lg:py-9 p-6 '>
                        <h1 className='text-xl md:text-4xl font-degular'>
                            Refer a friend and earn 2 free cleanings
                        </h1>
                        <p className='mt-3 text-textColor font-degular text-base md:text-xl'>
                            Love Clearpath? Share the love! For every friend you refer who signs up for our service,
                            you'll receive 2 free cleanings as a thank you. There's no limit — the more you refer,
                            the more you earn. It’s our way of saying thanks for helping us spread the clean yard joy!
                        </p>
                        <button className='mt-6 px-6 md:px-20 py-3 bg-bgColor rounded-[20px] font-degular text-base md:text-xl'>
                            <Link to="/refer">Refer a friend</Link>
                        </button>
                    </div>

                    <div className='flex justify-center lg:justify-end  '>
                        <img
                            src="/images/home-page/referImg.jpg"
                            alt=""
                            className='w-[250px] h-[250px] md:w-[307px] md:h-[307px] object-cover rounded-[20px]'
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PromisseRefer
