import { Input, Button, Upload, Form } from 'antd';
import React from 'react'
import Footer from '../../../components/client/footer/Footer';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    const [form] = Form.useForm()
    return (
        <div className=" bg-[#f6f6f6] px-4 lg:px-0 ">
            <div className=' max-w-[1519px] mx-auto ' >
                <div className=' flex justify-between items-center pt-11 ' >
                    <div className='flex items-center gap-5 ' >
                        <div className=' w-[55px] h-[53px] bg-white rounded-full flex items-center  justify-center  ' >
                            <Link to={"/"}>
                                <span>
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                        <div>
                            <h1 className=' text-3xl font-degular text-textColor ' >My profile</h1>
                        </div>
                    </div>
                    <div className=' w-[55px] h-[53px] bg-white rounded-full flex items-center  justify-center  ' >
                        <Link to={"/history"} >
                            <span>
                                <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.6905 5.55554H12.0476V11.1111L16.7352 13.9333L17.5238 12.5888L13.6905 10.2777V5.55554ZM13.1429 0C10.5286 0 8.02138 1.05356 6.1728 2.92892C4.32423 4.80428 3.28571 7.34781 3.28571 9.99996H0L4.33714 14.4777L8.7619 9.99996H5.47619C5.47619 7.93718 6.28393 5.95888 7.72171 4.50026C9.15948 3.04165 11.1095 2.22221 13.1429 2.22221C15.1762 2.22221 17.1262 3.04165 18.564 4.50026C20.0018 5.95888 20.8095 7.93718 20.8095 9.99996C20.8095 12.0628 20.0018 14.0411 18.564 15.4997C17.1262 16.9583 15.1762 17.7777 13.1429 17.7777C11.029 17.7777 9.11238 16.8999 7.73238 15.4888L6.17714 17.0666C7.08795 18.0004 8.17304 18.7408 9.36903 19.2444C10.565 19.7481 11.8479 20.0049 13.1429 19.9999C15.7571 19.9999 18.2643 18.9464 20.1129 17.071C21.9615 15.1957 23 12.6521 23 9.99996C23 7.34781 21.9615 4.80428 20.1129 2.92892C18.2643 1.05356 15.7571 0 13.1429 0Z" fill="black" />
                                </svg>

                            </span>
                        </Link>
                    </div>
                </div>
                {/* Profile Image & Info */}
                <div className=" max-w-[1006px] mx-auto pb-10 lg:pb-[76px] mt-5  ">
                    <form className="space-y-4">
                        {/* Profile Image & Info */}
                        <div className="flex flex-col items-center bg-white mb-6 py-11 rounded-[20px] ">
                            <div className="relative  ">
                                <img
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <Form.Item>
                                    <Upload.Dragger showUploadList={false}>
                                        <div className="absolute bottom-0 -right-2    cursor-pointer">
                                            <svg width="52" height="46" viewBox="0 0 52 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g filter="url(#filter0_d_41_1120)">
                                                    <rect x="6" y="6.5" width="40" height="33" rx="3" fill="white" shape-rendering="crispEdges" />
                                                    <g filter="url(#filter1_d_41_1120)">
                                                        <path d="M33 14C33.7956 14 34.5587 14.3161 35.1213 14.8787C35.6839 15.4413 36 16.2044 36 17V29C36 29.7956 35.6839 30.5587 35.1213 31.1213C34.5587 31.6839 33.7956 32 33 32H19C18.2044 32 17.4413 31.6839 16.8787 31.1213C16.3161 30.5587 16 29.7956 16 29V17C16 16.2044 16.3161 15.4413 16.8787 14.8787C17.4413 14.3161 18.2044 14 19 14H33ZM26 18C24.6739 18 23.4021 18.5268 22.4645 19.4645C21.5268 20.4021 21 21.6739 21 23C21 24.3261 21.5268 25.5979 22.4645 26.5355C23.4021 27.4732 24.6739 28 26 28C27.3261 28 28.5979 27.4732 29.5355 26.5355C30.4732 25.5979 31 24.3261 31 23C31 21.6739 30.4732 20.4021 29.5355 19.4645C28.5979 18.5268 27.3261 18 26 18ZM26 20C26.7956 20 27.5587 20.3161 28.1213 20.8787C28.6839 21.4413 29 22.2044 29 23C29 23.7956 28.6839 24.5587 28.1213 25.1213C27.5587 25.6839 26.7956 26 26 26C25.2044 26 24.4413 25.6839 23.8787 25.1213C23.3161 24.5587 23 23.7956 23 23C23 22.2044 23.3161 21.4413 23.8787 20.8787C24.4413 20.3161 25.2044 20 26 20ZM33 17H32C31.7451 17.0003 31.5 17.0979 31.3146 17.2728C31.1293 17.4478 31.0178 17.687 31.0028 17.9414C30.9879 18.1958 31.0707 18.4464 31.2343 18.6418C31.3979 18.8373 31.6299 18.9629 31.883 18.993L32 19H33C33.2549 18.9997 33.5 18.9021 33.6854 18.7272C33.8707 18.5522 33.9822 18.313 33.9972 18.0586C34.0121 17.8042 33.9293 17.5536 33.7657 17.3582C33.6021 17.1627 33.3701 17.0371 33.117 17.007L33 17Z" fill="black" />
                                                    </g>
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d_41_1120" x="0" y="0.5" width="52" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset />
                                                        <feGaussianBlur stdDeviation="3" />
                                                        <feComposite in2="hardAlpha" operator="out" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_41_1120" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_41_1120" result="shape" />
                                                    </filter>
                                                    <filter id="filter1_d_41_1120" x="12" y="14" width="28" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset dy="4" />
                                                        <feGaussianBlur stdDeviation="2" />
                                                        <feComposite in2="hardAlpha" operator="out" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_41_1120" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_41_1120" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>

                                        </div>
                                    </Upload.Dragger>
                                </Form.Item>
                            </div>
                            <h2 className="text-xl font-semibold mt-1">Maria Johns</h2>
                            <p className=" text-textColor text-lg font-degular ">example@gmail.com</p>
                        </div>

                        {/* Form Fields */}
                        <fieldset className="border border-gray-300 rounded-[20px] px-8 pt-1 pb-3 ">
                            <legend className=" text-sm text-textColor font-degular ">Name</legend>
                            <Input style={{ border: 'none', paddingLeft: 0, backgroundColor: "#f6f6f6", }} defaultValue="Maria Johns" />
                        </fieldset>

                        <fieldset className="border border-gray-300  px-8 pt-1 pb-3 rounded-[20px] ">
                            <legend className="text-sm text-textColor font-degular ">Email</legend>
                            <Input style={{ border: 'none', paddingLeft: 0, backgroundColor: "#f6f6f6", }} defaultValue="example@gmail.com" />
                        </fieldset>

                        <fieldset className="border border-gray-300  px-8 pt-1 pb-3 rounded-[20px]">
                            <legend className="text-sm text-textColor font-degular ">Number</legend>
                            <Input style={{ border: 'none', paddingLeft: 0, backgroundColor: "#f6f6f6", }} defaultValue="+12358-48675" />
                        </fieldset>

                        <div>
                            <label className="text-sm font-medium text-gray-700"></label>
                            <input placeholder=' Home Address ' className=' hover:right-0 hover:outline-none border w-full placeholder:font-degular  placeholder:text-xl placeholder:text-textColor ' style={{ padding: "18px 45px ", borderRadius: "20px", backgroundColor: "#f6f6f6", outline: "none" }} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>

                                <input placeholder='City' style={{ padding: "18px 45px ", borderRadius: "20px", backgroundColor: "#f6f6f6", outline: "none" }} className='hover:right-0 hover:outline-none border w-full placeholder:font-degular  placeholder:text-xl placeholder:text-textColor' />
                            </div>
                            <div>
                                <input placeholder='State' style={{ padding: "18px 45px ", borderRadius: "20px", backgroundColor: "#f6f6f6", outline: "none" }} className='hover:right-0 hover:outline-none border w-full placeholder:font-degular  placeholder:text-xl placeholder:text-textColor' />

                            </div>
                        </div>

                        <div>
                            <input placeholder='Dog name' style={{ padding: "18px 45px ", borderRadius: "20px", backgroundColor: "#f6f6f6", outline: "none" }} className='hover:right-0 hover:outline-none border w-full placeholder:font-degular  placeholder:text-xl placeholder:text-textColor' />

                        </div>

                        <div className="flex justify-center mt-6">
                            <button className='  py-[18px] px-11 bg-[#787878] w-[247px] text-white font-degular text-xl mt-8 rounded-[20px] '  >Save</button>
                        </div>
                    </form>
                </div>


            </div>
            <Footer></Footer>

        </div>
    )
}

export default Profile
