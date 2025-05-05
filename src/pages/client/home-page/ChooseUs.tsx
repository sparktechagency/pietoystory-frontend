import React from 'react'

const ChooseUs: React.FC = () => {
    interface dataInt {
        icon: string;
        title: string;
        description: string
    }

    let data: dataInt[] = [
        {
            icon: "/images/home-page/why-1.png",
            title: "Reliable & On-Time",
            description: "We respect your time. Our team always arrives on schedule and completes each job thoroughly. You’ll never have to worry about skipped days or inconsistent service — we pride ourselves on being dependable, so your yard stays clean and your routine remains uninterrupted."
        },
        {
            icon: "/images/home-page/why-2.png",
            title: "Eco-Friendly Disposal",
            description: "At ClearPath, we’re committed to sustainability. All collected waste is disposed of in an environmentally responsible manner, reducing our ecological footprint. We follow best practices to ensure your yard stays clean while protecting the environment — because a greener planet benefits pets, people, and communities alike."
        },
        {
            icon: "/images/home-page/why-3.png",
            title: "Pet & Family Safe",
            description: "Your family’s safety is our top priority. We use safe tools and eco-conscious methods to clean your yard without harming pets, children, or plants. No harsh chemicals, no residue — just a fresh, clean lawn where everyone can play, explore, and relax without concern."
        },
        {
            icon: "/images/home-page/why-4.png",
            title: "Flexible Plans",
            description: "We understand every household is different. Whether you need weekly, bi-weekly, or one-time service, we offer customizable plans that match your schedule and budget. ClearPath makes it easy to keep your yard clean — without locking you into contracts or rigid commitments."
        },
        {
            icon: "/images/home-page/why-5.png",
            title: "Locally Owned & Operated",
            description: "We’re more than a service — we’re your neighbors. As a local business, we care deeply about the community we serve. Our team brings a personal touch, fast support, and a true understanding of your needs. Supporting ClearPath means supporting a cleaner, healthier neighborhood."
        },
        {
            icon: "/images/home-page/why-6.png",
            title: "Satisfaction Guaranteed",
            description: "Your satisfaction drives everything we do. If you're not 100% happy with a service visit, we’ll make it right — no questions asked. Our team is trained, courteous, and detail-oriented to ensure every cleanup meets our high standards and leaves you completely satisfied."
        }
    ];
    return (
        <div className=' bg-[#f6f6f6]  ' >
            <div className=' max-w-[1519px] mx-auto ' >
                <div>
                    <h1 className=' text-center text-textColor font-degular font-medium text-[40px] pb-[30px] ' >Why choose us ?</h1>
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
                                <h1 className='text-center text-textColor text-xl md:text-[30px] font-degular mt-4'>
                                    {item?.title}
                                </h1>
                                <p className='text-center text-textColor mt-4 md:mt-6 font-degular text-base md:text-xl font-thin'>
                                    {item?.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ChooseUs
