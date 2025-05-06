import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../components/client/footer/Footer';

const data = [
    {
        zip: '19801',
        frequency: 'Once a week',
        dogs: '3 dogs',
        area: '1000 sq ft',
        cleanArea: 'Backyard',
        cost: '$20.50',
    },
    {
        zip: '19801',
        frequency: 'Once a week',
        dogs: '3 dogs',
        area: '1000 sq ft',
        cleanArea: 'Backyard',
        cost: '$20.50',
    },
    {
        zip: '19801',
        frequency: 'Once a week',
        dogs: '3 dogs',
        area: '1000 sq ft',
        cleanArea: 'Backyard',
        cost: '$20.50',
    },
]
const PreviousHistory: React.FC = () => {
    return (
        <div className=" bg-[#f6f6f6] h-screen ">
            <div className="max-w-[1520px] mx-auto">
                <div className=' flex justify-between items-center pt-11 ' >
                    <div className='flex items-center gap-5 ' >
                        <div className=' w-[55px] h-[53px] bg-white rounded-full flex items-center  justify-center  ' >
                            <span>
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                                </svg>
                            </span>
                        </div>
                        <div>
                            <h1 className=' text-3xl font-degular text-textColor ' >Previous history</h1>
                        </div>
                    </div>
                    
                </div>

                <div className="overflow-x-auto pb-[57px] ">
                    <table className="w-full text-left border-separate  border-spacing-y-4">
                        <thead>
                            <tr className="text-gray-600 text-sm">
                                <th className="px-4 text-xl font-degular text-textColor font-medium text-center ">Zip</th>
                                <th className="px-4 text-xl font-degular text-textColor font-medium text-center ">How often</th>
                                <th className="px-4 text-xl font-degular text-textColor font-medium text-center ">Amount of dogs</th>
                                <th className="px-4 text-xl font-degular text-textColor font-medium text-center ">Total area</th>
                                <th className="px-4 text-xl font-degular text-textColor font-medium text-center ">Area to clean</th>
                                <th className="px-4 text-xl font-degular text-textColor font-medium text-center ">Cost</th>
                                <th className="px-4 text-xl font-degular text-textColor font-medium "></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr
                                    key={i}
                                    className="bg-white rounded-[20px] border-2  border-black shadow-sm text-sm text-gray-700"
                                >
                                    <td className=" text-center px-10 py-[26px] text-textColor font-degular text-2xl font-semibold">{item.zip}</td>
                                    <td className=" text-center px-10 py-[26px] text-xl font-degular font-thin ">{item.frequency}</td>
                                    <td className=" text-center px-10 py-[26px] text-xl font-degular font-thin">{item.dogs}</td>
                                    <td className=" text-center px-10 py-[26px] text-xl font-degular font-thin">{item.area}</td>
                                    <td className=" text-center px-10 py-[26px] text-xl font-degular font-thin">{item.cleanArea}</td>
                                    <td className=" text-center px-10 py-[26px] text-[26px] font-degular font-bold ">{item.cost}</td>
                                    <td className=" text-center px-10 py-[26px] text-xl font-degular font-thin">
                                        <button className=" py-2.5 px-[47px] bg-bgColor rounded-[20px] text-xl font-thin font-degular transition">
                                            <Link to={"/checkout"}>Reorder</Link>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default PreviousHistory;
