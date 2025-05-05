import React from 'react'

const PromisseRefer: React.FC = () => {
    interface dataInt {
        icon: string;
        title: string;
        description: string
    }

    let data: dataInt[] = [
        {
            icon: "/images/home-page/icon-1.png",
            title: "Reliable, Hassle free Service",
            description: "Our reliable, hassle-free The PNW’s dog waste removal service ensures timely, efficient visits, leaving your yard pristine. Enjoy more time with your dog—let us handle the mess!"
        },
        {
            icon: "/images/home-page/icon-2.png",
            title: "Satisfaction Guaranteed",
            description: "At Clearpath, we guarantee your satisfaction with our Seattle pooper scooper service. If you’re not happy, we’ll make it right—your happiness is our priority."
        },
        {
            icon: "/images/home-page/icon-3.png",
            title: "Health and Safety Commitment",
            description: "Swoop Scoop® prioritizes health and safety by using sanitary practices and eco-friendly disposal methods, ensuring a clean, safe environment for The PNW pets and families."
        }
    ]


    return (
        <div>
            <div className="bg-[url('/images/home-page/banner-2.png')] bg-cover bg-center w-full  bg-[#f6f6f6] ">
                <div className=' max-w-[1519px] mx-auto ' >
                    <div>
                        <h1>Our Promises for our clients</h1>
                    </div>
                    <div className=' grid grid-cols-3  ' >
                        {
                            data.map((item, i) => {
                                return (
                                    <div key={i} className=' w-[491px] border-2 p-9 rounded-[20px]  ' >
                                        <div className=' w-[100px] h-[100px] rounded-full bg-white mx-auto ' >
                                            <img src={item?.icon} alt="" className=' w-[50px] h-[50px] mx-auto  object-cover flex flex-col  justify-center ' />
                                        </div>
                                        <h1 className='text-center' > {item?.title} </h1>
                                        <p className='text-center' > {item?.description} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PromisseRefer
