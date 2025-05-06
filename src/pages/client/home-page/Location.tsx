import React from 'react';
import { Link } from 'react-router-dom';

const Location: React.FC = () => {
    const locationData = [
        {
            name: "In Maryland",
            location: ["Anne Arundel", "Kent", "Talbot", "Cecil", "Worcester", "Baltimore", "Howard", "Dorchester", "Wicomico", "Montgomery"]
        },
        {
            name: "In Delaware",
            location: ["New Castle", "Kent", "Sussex"]
        },
        {
            name: "In Virginia",
            location: ["Arlington", "Loudoun", "Fairfax", "Prince William"]
        }
    ];

    return (
        <div className="bg-[#f6f6f6] py-10">
            <div className="max-w-[1519px] mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-center mb-2 font-degular">Our Locations</h1>
                <p className="text-center text-lg mb-8 font-degular text-textColor">You can find us in these locations.</p>

                <div className="flex flex-col lg:flex-row justify-between gap-8  ">
                    {locationData.map((region, i) => (
                        <div key={i} className="w-full lg:w-1/3 border p-6 rounded-3xl ">
                            <div className="flex items-center gap-4 mb-4">
                                <span>
                                    <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.893 28.6057C10.893 28.6057 0 19.9163 0 11.3661C0 8.35165 1.26428 5.46063 3.51472 3.32907C5.76516 1.1975 8.8174 0 12 0C15.1826 0 18.2348 1.1975 20.4853 3.32907C22.7357 5.46063 24 8.35165 24 11.3661C24 19.9163 13.107 28.6057 13.107 28.6057C12.501 29.1343 11.5035 29.1286 10.893 28.6057ZM12 16.3388C12.6894 16.3388 13.3721 16.2102 14.0091 15.9603C14.646 15.7104 15.2248 15.3441 15.7123 14.8824C16.1998 14.4206 16.5865 13.8724 16.8504 13.2691C17.1142 12.6658 17.25 12.0192 17.25 11.3661C17.25 10.7131 17.1142 10.0665 16.8504 9.46318C16.5865 8.85986 16.1998 8.31168 15.7123 7.84992C15.2248 7.38816 14.646 7.02188 14.0091 6.77198C13.3721 6.52208 12.6894 6.39345 12 6.39345C10.6076 6.39345 9.27226 6.91736 8.28769 7.84992C7.30312 8.78248 6.75 10.0473 6.75 11.3661C6.75 12.685 7.30312 13.9498 8.28769 14.8824C9.27226 15.8149 10.6076 16.3388 12 16.3388Z" fill="black" />
                                    </svg>
                                </span>
                                <p className="text-[28px] text-textColor font-semibold font-degular">{region.name}</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {region.location.map((loc, j) => (
                                    <div key={j} className="border rounded-[20px] text-center bg-white shadow-sm hover:shadow-md transition">
                                        <p className="text-sm font-degular text-textColor px-1 py-2">{loc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className=' bg-bgColor rounded-[40px] mx-auto block mt-10 lg:w-[480px] px-9 lg:px-0   '>
                    <Link to="/quote" className='flex items-center gap-3 font-medium text-center justify-self-center py-4 text-2xl '>
                        Get a Quote
                        <span>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.838664 12.0459L10.4057 2.47885L3.00806 2.51289L3.01875 0.188399L14.3848 0.136102L14.3325 11.5021L12.008 11.5128L12.042 4.1152L2.47501 13.6822L0.838664 12.0459Z" fill="black" />
                            </svg>
                        </span>
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Location;
