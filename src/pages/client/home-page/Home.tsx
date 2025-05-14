import Banner from './Banner'
import PromisseRefer from './PromisseRefer'
import About from './About'
import Location from './Location'
import ChooseUs from './ChooseUs'
import GetTouchPage from './GetTouchPage'
import React, { useEffect, useRef, useState } from 'react'
import { Drawer, Button, message } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useAxiosPublic from '../../../hooks/UseAxiosPublic'
import { UserProfile, UserProfileApiResponse } from '../../../type/UserProfileDataType'

const Home: React.FC = () => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    const [open, setOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    // Toggle drawer
    const showDrawer = () => setOpen(true)
    const onClose = () => {
        setOpen(false)
        setAccountOpen(false)
    };


    // Outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setAccountOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close dropdown/drawer on resize (sm ↔ lg)
    useEffect(() => {
        const handleResize = () => {
            setAccountOpen(false)
            setOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, []);

    const [loading, setLoading] = useState<boolean>(false);


    const axiosPublic = useAxiosPublic();

    const [profileData, setProfileData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axiosPublic.get<UserProfileApiResponse>(`/profile`, config);
                setProfileData(res.data?.data); // Save data to state
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // 👈 Empty dependency array to run only once


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = ""
    }
    return (
        <div>
            <div className=" bg-[#f6f6f6] ">
                <div className="max-w-[1519px] mx-auto flex gap-x-4 items-center justify-between py-2 lg:px-0 px-4">

                    {/* Logo */}
                    <div className="flex-shrink-0 mx-auto lg:mx-0    ">
                        <NavLink to="/">
                            <img src="/images/navbar/logo.png" alt="Logo" className="h-12   " />
                        </NavLink>
                    </div>

                    {/* Nav menu - Desktop only */}
                    <div className="hidden lg:block w-[1006px] mx-auto">
                        <nav className="flex justify-between px-16 items-center bg-[#b9ecff] h-16 rounded-full font-degular font-medium text-xl">
                            <NavLink to="/">Home</NavLink>
                            <a href="#about">About Us</a>
                            <a href="#touch">Contact Us</a>
                            <NavLink to="/refer">Referrals</NavLink>
                        </nav>
                    </div>

                    {/* Create Account - Desktop only */}
                    <div className="hidden lg:block relative" ref={dropdownRef}>
                        {
                            token && profileData ? (
                                <button
                                    onClick={() => setAccountOpen(!accountOpen)}
                                    className="flex items-center bg-[#b9ecff] rounded-full h-[70px] px-4 space-x-2"
                                >
                                    {profileData.avatar ? (
                                        <img
                                            src={`${profileData.avatar}`}
                                            alt="Profile Avatar"
                                            className="w-12 h-12 rounded-full"
                                        />
                                    ) : (
                                        <svg width="63" height="62" viewBox="0 0 63 62" fill="none">
                                            <rect x="0.155273" width="62" height="62" rx="31" fill="white" />
                                            <path
                                                d="M31.1553 18C32.8792 18 34.5325 18.6848 35.7515 19.9038C36.9705 21.1228 37.6553 22.7761 37.6553 24.5C37.6553 26.2239 36.9705 27.8772 35.7515 29.0962C34.5325 30.3152 32.8792 31 31.1553 31C29.4314 31 27.7781 30.3152 26.5591 29.0962C25.3401 27.8772 24.6553 26.2239 24.6553 24.5C24.6553 22.7761 25.3401 21.1228 26.5591 19.9038C27.7781 18.6848 29.4314 18 31.1553 18ZM31.1553 34.25C38.3378 34.25 44.1553 37.1588 44.1553 40.75V44H18.1553V40.75C18.1553 37.1588 23.9728 34.25 31.1553 34.25Z"
                                                fill="black"
                                            />
                                        </svg>
                                    )}
                                    <span className="text-xl font-degular font-medium text-black">
                                        {profileData.full_name || "User"}
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    to={`/create-account`}
                                    className="flex items-center bg-[#b9ecff] rounded-full h-[70px] px-4 space-x-2 "
                                >
                                    <svg width="63" height="62" viewBox="0 0 63 62" fill="none">
                                        <rect x="0.155273" width="62" height="62" rx="31" fill="white" />
                                        <path
                                            d="M31.1553 18C32.8792 18 34.5325 18.6848 35.7515 19.9038C36.9705 21.1228 37.6553 22.7761 37.6553 24.5C37.6553 26.2239 36.9705 27.8772 35.7515 29.0962C34.5325 30.3152 32.8792 31 31.1553 31C29.4314 31 27.7781 30.3152 26.5591 29.0962C25.3401 27.8772 24.6553 26.2239 24.6553 24.5C24.6553 22.7761 25.3401 21.1228 26.5591 19.9038C27.7781 18.6848 29.4314 18 31.1553 18ZM31.1553 34.25C38.3378 34.25 44.1553 37.1588 44.1553 40.75V44H18.1553V40.75C18.1553 37.1588 23.9728 34.25 31.1553 34.25Z"
                                            fill="black"
                                        />
                                    </svg>
                                    <span className="text-xl font-degular font-medium text-black">Create account</span>
                                </Link>
                            )
                        }

                        {/* Dropdown */}
                        <AnimatePresence>
                            {accountOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-[320px] bg-[#4b4b4b] shadow-lg rounded-[20px] z-50  space-y-2 text-white p-7 text-xl  "
                                >
                                    <div>
                                        <Link to="/profile" className=" font-degular border border-white py-[14px] px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] items-center  ">
                                            <span>
                                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 0.5C11.3261 0.5 12.5979 1.02678 13.5355 1.96447C14.4732 2.90215 15 4.17392 15 5.5C15 6.82608 14.4732 8.09785 13.5355 9.03553C12.5979 9.97322 11.3261 10.5 10 10.5C8.67392 10.5 7.40215 9.97322 6.46447 9.03553C5.52678 8.09785 5 6.82608 5 5.5C5 4.17392 5.52678 2.90215 6.46447 1.96447C7.40215 1.02678 8.67392 0.5 10 0.5ZM10 13C15.525 13 20 15.2375 20 18V20.5H0V18C0 15.2375 4.475 13 10 13Z" fill="white" />
                                                </svg>
                                            </span>

                                            <span>My Account</span>

                                        </Link>
                                    </div>
                                    <div className=' ' >
                                        <Link to="/change-password" className=" font-degular border border-white py-[14px] px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] items-center my-4   ">
                                            <span>
                                                <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 4.5H11.65C11.2381 3.33048 10.4733 2.31762 9.46134 1.60116C8.44934 0.884703 7.23994 0.499954 6 0.5C2.69 0.5 0 3.19 0 6.5C0 9.81 2.69 12.5 6 12.5C7.23994 12.5 8.44934 12.1153 9.46134 11.3988C10.4733 10.6824 11.2381 9.66952 11.65 8.5H12L14 10.5L16 8.5L18 10.5L22 6.46L20 4.5ZM6 9.5C4.35 9.5 3 8.15 3 6.5C3 4.85 4.35 3.5 6 3.5C7.65 3.5 9 4.85 9 6.5C9 8.15 7.65 9.5 6 9.5Z" fill="white" />
                                                </svg>

                                            </span>

                                            <span>Change password</span>

                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/refer" className=" font-degular border border-white py-[14px] px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] items-center  mb-7 ">
                                            <span>
                                                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.1233 8.56078H5.41676C4.45259 8.52665 3.49155 8.68696 2.59327 9.03176C1.69499 9.37657 0.87865 9.89851 0.194906 10.5652L0 10.7879V17.3738H3.3134V13.6355L3.76006 13.1423L3.96309 12.9116C5.02039 11.8478 6.3367 11.0649 7.78812 10.6368C7.0617 10.095 6.48864 9.38037 6.1233 8.56078Z" fill="white" />
                                                    <path d="M21.8295 10.5414C21.1457 9.87467 20.3294 9.35273 19.4311 9.00793C18.5328 8.66312 17.5718 8.50281 16.6076 8.53694C16.3119 8.53849 16.0165 8.55442 15.7224 8.58466C15.3503 9.35357 14.7928 10.0224 14.0982 10.5334C15.6478 10.9529 17.0516 11.7778 18.1587 12.9196L18.3618 13.1423L18.8003 13.6355V17.3818H22V10.7641L21.8295 10.5414Z" fill="white" />
                                                    <path d="M5.39238 7.00973H5.64413C5.52716 6.02601 5.70339 5.03016 6.15156 4.14238C6.59973 3.25459 7.30068 2.51284 8.16979 2.00664C7.85474 1.53525 7.4201 1.15207 6.90843 0.894628C6.39675 0.637188 5.82558 0.514312 5.25085 0.538034C4.67613 0.561755 4.11754 0.731261 3.62979 1.02995C3.14205 1.32864 2.74186 1.74628 2.46843 2.24196C2.19499 2.73765 2.05768 3.29439 2.06994 3.85767C2.08219 4.42095 2.2436 4.97145 2.53835 5.45528C2.8331 5.9391 3.25109 6.33966 3.75139 6.61773C4.25168 6.89579 4.81714 7.04183 5.39238 7.04155V7.00973Z" fill="white" />
                                                    <path d="M16.2178 6.41319C16.227 6.59602 16.227 6.77918 16.2178 6.96202C16.3736 6.98646 16.531 6.99975 16.6888 7.00179H16.8431C17.4158 6.97188 17.9708 6.79723 18.4542 6.49486C18.9375 6.19249 19.3327 5.77269 19.6012 5.27633C19.8697 4.77997 20.0025 4.22398 19.9865 3.66247C19.9705 3.10096 19.8063 2.55308 19.5099 2.07216C19.2136 1.59124 18.7951 1.19367 18.2953 0.918164C17.7955 0.642657 17.2314 0.498597 16.6579 0.50001C16.0843 0.501423 15.521 0.648261 15.0226 0.926228C14.5242 1.20419 14.1078 1.60382 13.8139 2.08619C14.5489 2.55622 15.1533 3.19761 15.5729 3.95282C15.9924 4.70803 16.214 5.55343 16.2178 6.41319Z" fill="white" />
                                                    <path d="M10.8904 9.97658C12.8952 9.97658 14.5205 8.38475 14.5205 6.42113C14.5205 4.45751 12.8952 2.86567 10.8904 2.86567C8.88551 2.86567 7.26025 4.45751 7.26025 6.42113C7.26025 8.38475 8.88551 9.97658 10.8904 9.97658Z" fill="white" />
                                                    <path d="M11.0853 11.8696C10.0247 11.8282 8.96659 11.997 7.97435 12.3661C6.98212 12.7351 6.07626 13.2967 5.31117 14.0172L5.10814 14.2399V19.2748C5.11131 19.4389 5.14744 19.6006 5.21446 19.751C5.28148 19.9013 5.37808 20.0372 5.49874 20.1509C5.61941 20.2647 5.76177 20.3541 5.9177 20.4139C6.07363 20.4738 6.24007 20.5029 6.40752 20.4998H15.7386C15.9061 20.5029 16.0725 20.4738 16.2285 20.4139C16.3844 20.3541 16.5267 20.2647 16.6474 20.1509C16.7681 20.0372 16.8647 19.9013 16.9317 19.751C16.9987 19.6006 17.0348 19.4389 17.038 19.2748V14.2559L16.8431 14.0172C16.0832 13.2941 15.1806 12.7307 14.1905 12.3614C13.2004 11.9921 12.1437 11.8248 11.0853 11.8696Z" fill="white" />
                                                </svg>


                                            </span>

                                            <span className='' >My referrals</span>

                                        </Link>
                                    </div>
                                    <div>
                                        <button className=" font-degular border border-[#FF5E5E] py-[14px] px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] items-center w-full mt-7 text-[#FF5E5E] bg-[#FFFFFF]  ">
                                            <span>
                                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.016 19.5323C10.016 19.2756 10.1182 19.0294 10.2999 18.848C10.4817 18.6665 10.7282 18.5645 10.9852 18.5645H18.7386C18.8243 18.5645 18.9064 18.5305 18.967 18.47C19.0276 18.4095 19.0617 18.3275 19.0617 18.2419V2.75806C19.0617 2.67251 19.0276 2.59046 18.967 2.52997C18.9064 2.46947 18.8243 2.43548 18.7386 2.43548H10.9852C10.7282 2.43548 10.4817 2.33353 10.2999 2.15204C10.1182 1.97055 10.016 1.7244 10.016 1.46774C10.016 1.21108 10.1182 0.964932 10.2999 0.783445C10.4817 0.601958 10.7282 0.5 10.9852 0.5H18.7386C19.9869 0.5 21 1.51161 21 2.75806V18.2419C21 18.8408 20.7617 19.4152 20.3377 19.8386C19.9136 20.2621 19.3384 20.5 18.7386 20.5H10.9852C10.7282 20.5 10.4817 20.398 10.2999 20.2166C10.1182 20.0351 10.016 19.7889 10.016 19.5323Z" fill="#FF5E5E" />
                                                    <path d="M15.6527 11.9387C15.6527 12.2809 15.5166 12.6091 15.2742 12.8511C15.0319 13.0931 14.7032 13.2291 14.3605 13.2291H8.08543C8.05528 13.6875 8.01824 14.146 7.9743 14.6045L7.93554 14.9981C7.9211 15.1464 7.87105 15.2891 7.78962 15.4139C7.70819 15.5388 7.5978 15.6423 7.4678 15.7155C7.33781 15.7887 7.19205 15.8295 7.04289 15.8344C6.89373 15.8394 6.74558 15.8083 6.611 15.7439C4.24814 14.6145 2.10949 13.0674 0.298458 11.1774L0.259691 11.1374C0.0930664 10.9644 0 10.7336 0 10.4936C0 10.2535 0.0930664 10.0228 0.259691 9.8497L0.298458 9.8097C2.10949 7.91972 4.24814 6.37263 6.611 5.24325C6.74558 5.17883 6.89373 5.14778 7.04289 5.15273C7.19205 5.15768 7.33781 5.19848 7.4678 5.27168C7.5978 5.34488 7.70819 5.44831 7.78962 5.57319C7.87105 5.69808 7.9211 5.84073 7.93554 5.98905L7.9743 6.3826C8.01824 6.84023 8.05528 7.29873 8.08543 7.75808H14.3605C14.7032 7.75808 15.0319 7.89403 15.2742 8.13601C15.5166 8.37799 15.6527 8.70619 15.6527 9.04841V11.9387Z" fill="#FF5E5E" />
                                                </svg>



                                            </span>

                                            <span onClick={handleLogout} >Logout</span>

                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>



                    {/* Mobile - Menu Icon */}
                    <div className="lg:hidden">
                        <Button type="text" icon={<MenuOutlined className="text-2xl" />} onClick={showDrawer} />
                    </div>
                </div>

                {/* Drawer for mobile */}
                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={onClose}
                    open={open}
                    width={250}
                >
                    <nav className="flex flex-col gap-y-4 font-degular text-[15px]">
                        <NavLink to="/" onClick={onClose}>Home</NavLink>
                        <a href="#about" onClick={onClose}>About Us</a>
                        <a href="#touch" onClick={onClose}>Contact Us</a>
                        <NavLink to="/refer" onClick={onClose}>Referrals</NavLink>

                        {/* Create Account inside drawer (mobile only) */}
                        {
                            token && profileData ? (
                                <button
                                    onClick={() => setAccountOpen(!accountOpen)}
                                    className="flex items-center bg-[#b9ecff] rounded-full lg:h-[70px] h-12 px-4 space-x-2"
                                >
                                    {profileData.avatar ? (
                                        <img
                                            src={`${profileData.avatar}`}
                                            alt="Profile Avatar"
                                            className="lg:w-12 w-6 border border-black  h-6 lg:h-12 rounded-full"
                                        />
                                    ) : (
                                        <svg width="63" height="62" viewBox="0 0 63 62" fill="none">
                                            <rect x="0.155273" width="62" height="62" rx="31" fill="white" />
                                            <path
                                                d="M31.1553 18C32.8792 18 34.5325 18.6848 35.7515 19.9038C36.9705 21.1228 37.6553 22.7761 37.6553 24.5C37.6553 26.2239 36.9705 27.8772 35.7515 29.0962C34.5325 30.3152 32.8792 31 31.1553 31C29.4314 31 27.7781 30.3152 26.5591 29.0962C25.3401 27.8772 24.6553 26.2239 24.6553 24.5C24.6553 22.7761 25.3401 21.1228 26.5591 19.9038C27.7781 18.6848 29.4314 18 31.1553 18ZM31.1553 34.25C38.3378 34.25 44.1553 37.1588 44.1553 40.75V44H18.1553V40.75C18.1553 37.1588 23.9728 34.25 31.1553 34.25Z"
                                                fill="black"
                                            />
                                        </svg>
                                    )}
                                    <span className="lg:text-xl font-degular font-medium text-black">
                                        {profileData.full_name || "User"}
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    to={`/create-account`}
                                    className="flex items-center bg-[#b9ecff] rounded-full h-[70px] px-4 space-x-2 "
                                >
                                    <svg width="63" height="62" viewBox="0 0 63 62" fill="none">
                                        <rect x="0.155273" width="62" height="62" rx="31" fill="white" />
                                        <path
                                            d="M31.1553 18C32.8792 18 34.5325 18.6848 35.7515 19.9038C36.9705 21.1228 37.6553 22.7761 37.6553 24.5C37.6553 26.2239 36.9705 27.8772 35.7515 29.0962C34.5325 30.3152 32.8792 31 31.1553 31C29.4314 31 27.7781 30.3152 26.5591 29.0962C25.3401 27.8772 24.6553 26.2239 24.6553 24.5C24.6553 22.7761 25.3401 21.1228 26.5591 19.9038C27.7781 18.6848 29.4314 18 31.1553 18ZM31.1553 34.25C38.3378 34.25 44.1553 37.1588 44.1553 40.75V44H18.1553V40.75C18.1553 37.1588 23.9728 34.25 31.1553 34.25Z"
                                            fill="black"
                                        />
                                    </svg>
                                    <span className="text-xl font-degular font-medium text-black">Create account</span>
                                </Link>
                            )
                        }
                    </nav>
                    <AnimatePresence>
                        {accountOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 lg:w-[320px] bg-[#4b4b4b] shadow-lg rounded-[20px] z-50 space-y-1 lg:space-y-2 text-white p-3 lg:p-7 text-xl  "
                            >
                                <div>
                                    <Link to="/account" className=" lg:text-lg text-sm font-degular border border-white lg:py-[14px] py-1 px-3 lg:px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] justify-center  items-center  ">
                                        <span>
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 0.5C11.3261 0.5 12.5979 1.02678 13.5355 1.96447C14.4732 2.90215 15 4.17392 15 5.5C15 6.82608 14.4732 8.09785 13.5355 9.03553C12.5979 9.97322 11.3261 10.5 10 10.5C8.67392 10.5 7.40215 9.97322 6.46447 9.03553C5.52678 8.09785 5 6.82608 5 5.5C5 4.17392 5.52678 2.90215 6.46447 1.96447C7.40215 1.02678 8.67392 0.5 10 0.5ZM10 13C15.525 13 20 15.2375 20 18V20.5H0V18C0 15.2375 4.475 13 10 13Z" fill="white" />
                                            </svg>
                                        </span>

                                        <span>My Account</span>

                                    </Link>
                                </div>
                                <div className=' ' >
                                    <Link to="/change-password" className=" font-degular border lg:text-lg text-sm border-white lg:py-[14px] py-1 px-3 lg:px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] justify-center items-center my-4   ">
                                        <span>
                                            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 4.5H11.65C11.2381 3.33048 10.4733 2.31762 9.46134 1.60116C8.44934 0.884703 7.23994 0.499954 6 0.5C2.69 0.5 0 3.19 0 6.5C0 9.81 2.69 12.5 6 12.5C7.23994 12.5 8.44934 12.1153 9.46134 11.3988C10.4733 10.6824 11.2381 9.66952 11.65 8.5H12L14 10.5L16 8.5L18 10.5L22 6.46L20 4.5ZM6 9.5C4.35 9.5 3 8.15 3 6.5C3 4.85 4.35 3.5 6 3.5C7.65 3.5 9 4.85 9 6.5C9 8.15 7.65 9.5 6 9.5Z" fill="white" />
                                            </svg>

                                        </span>

                                        <span>Change password</span>

                                    </Link>
                                </div>
                                <div>
                                    <Link to="/my-reffer" className=" lg:text-lg text-sm font-degular border border-white lg:py-[14px] py-1 px-3 lg:px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] justify-center items-center my-4    mb-7 ">
                                        <span>
                                            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.1233 8.56078H5.41676C4.45259 8.52665 3.49155 8.68696 2.59327 9.03176C1.69499 9.37657 0.87865 9.89851 0.194906 10.5652L0 10.7879V17.3738H3.3134V13.6355L3.76006 13.1423L3.96309 12.9116C5.02039 11.8478 6.3367 11.0649 7.78812 10.6368C7.0617 10.095 6.48864 9.38037 6.1233 8.56078Z" fill="white" />
                                                <path d="M21.8295 10.5414C21.1457 9.87467 20.3294 9.35273 19.4311 9.00793C18.5328 8.66312 17.5718 8.50281 16.6076 8.53694C16.3119 8.53849 16.0165 8.55442 15.7224 8.58466C15.3503 9.35357 14.7928 10.0224 14.0982 10.5334C15.6478 10.9529 17.0516 11.7778 18.1587 12.9196L18.3618 13.1423L18.8003 13.6355V17.3818H22V10.7641L21.8295 10.5414Z" fill="white" />
                                                <path d="M5.39238 7.00973H5.64413C5.52716 6.02601 5.70339 5.03016 6.15156 4.14238C6.59973 3.25459 7.30068 2.51284 8.16979 2.00664C7.85474 1.53525 7.4201 1.15207 6.90843 0.894628C6.39675 0.637188 5.82558 0.514312 5.25085 0.538034C4.67613 0.561755 4.11754 0.731261 3.62979 1.02995C3.14205 1.32864 2.74186 1.74628 2.46843 2.24196C2.19499 2.73765 2.05768 3.29439 2.06994 3.85767C2.08219 4.42095 2.2436 4.97145 2.53835 5.45528C2.8331 5.9391 3.25109 6.33966 3.75139 6.61773C4.25168 6.89579 4.81714 7.04183 5.39238 7.04155V7.00973Z" fill="white" />
                                                <path d="M16.2178 6.41319C16.227 6.59602 16.227 6.77918 16.2178 6.96202C16.3736 6.98646 16.531 6.99975 16.6888 7.00179H16.8431C17.4158 6.97188 17.9708 6.79723 18.4542 6.49486C18.9375 6.19249 19.3327 5.77269 19.6012 5.27633C19.8697 4.77997 20.0025 4.22398 19.9865 3.66247C19.9705 3.10096 19.8063 2.55308 19.5099 2.07216C19.2136 1.59124 18.7951 1.19367 18.2953 0.918164C17.7955 0.642657 17.2314 0.498597 16.6579 0.50001C16.0843 0.501423 15.521 0.648261 15.0226 0.926228C14.5242 1.20419 14.1078 1.60382 13.8139 2.08619C14.5489 2.55622 15.1533 3.19761 15.5729 3.95282C15.9924 4.70803 16.214 5.55343 16.2178 6.41319Z" fill="white" />
                                                <path d="M10.8904 9.97658C12.8952 9.97658 14.5205 8.38475 14.5205 6.42113C14.5205 4.45751 12.8952 2.86567 10.8904 2.86567C8.88551 2.86567 7.26025 4.45751 7.26025 6.42113C7.26025 8.38475 8.88551 9.97658 10.8904 9.97658Z" fill="white" />
                                                <path d="M11.0853 11.8696C10.0247 11.8282 8.96659 11.997 7.97435 12.3661C6.98212 12.7351 6.07626 13.2967 5.31117 14.0172L5.10814 14.2399V19.2748C5.11131 19.4389 5.14744 19.6006 5.21446 19.751C5.28148 19.9013 5.37808 20.0372 5.49874 20.1509C5.61941 20.2647 5.76177 20.3541 5.9177 20.4139C6.07363 20.4738 6.24007 20.5029 6.40752 20.4998H15.7386C15.9061 20.5029 16.0725 20.4738 16.2285 20.4139C16.3844 20.3541 16.5267 20.2647 16.6474 20.1509C16.7681 20.0372 16.8647 19.9013 16.9317 19.751C16.9987 19.6006 17.0348 19.4389 17.038 19.2748V14.2559L16.8431 14.0172C16.0832 13.2941 15.1806 12.7307 14.1905 12.3614C13.2004 11.9921 12.1437 11.8248 11.0853 11.8696Z" fill="white" />
                                            </svg>


                                        </span>

                                        <span className='' >My referrals</span>

                                    </Link>
                                </div>
                                <div>
                                    <button className=" lg:text-lg text-sm font-degular border border-[#FF5E5E] py-1 lg:py-[14px] px-3 lg:px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] justify-center items-center w-full mt-7 text-[#FF5E5E] bg-[#FFFFFF]  ">
                                        <span>
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.016 19.5323C10.016 19.2756 10.1182 19.0294 10.2999 18.848C10.4817 18.6665 10.7282 18.5645 10.9852 18.5645H18.7386C18.8243 18.5645 18.9064 18.5305 18.967 18.47C19.0276 18.4095 19.0617 18.3275 19.0617 18.2419V2.75806C19.0617 2.67251 19.0276 2.59046 18.967 2.52997C18.9064 2.46947 18.8243 2.43548 18.7386 2.43548H10.9852C10.7282 2.43548 10.4817 2.33353 10.2999 2.15204C10.1182 1.97055 10.016 1.7244 10.016 1.46774C10.016 1.21108 10.1182 0.964932 10.2999 0.783445C10.4817 0.601958 10.7282 0.5 10.9852 0.5H18.7386C19.9869 0.5 21 1.51161 21 2.75806V18.2419C21 18.8408 20.7617 19.4152 20.3377 19.8386C19.9136 20.2621 19.3384 20.5 18.7386 20.5H10.9852C10.7282 20.5 10.4817 20.398 10.2999 20.2166C10.1182 20.0351 10.016 19.7889 10.016 19.5323Z" fill="#FF5E5E" />
                                                <path d="M15.6527 11.9387C15.6527 12.2809 15.5166 12.6091 15.2742 12.8511C15.0319 13.0931 14.7032 13.2291 14.3605 13.2291H8.08543C8.05528 13.6875 8.01824 14.146 7.9743 14.6045L7.93554 14.9981C7.9211 15.1464 7.87105 15.2891 7.78962 15.4139C7.70819 15.5388 7.5978 15.6423 7.4678 15.7155C7.33781 15.7887 7.19205 15.8295 7.04289 15.8344C6.89373 15.8394 6.74558 15.8083 6.611 15.7439C4.24814 14.6145 2.10949 13.0674 0.298458 11.1774L0.259691 11.1374C0.0930664 10.9644 0 10.7336 0 10.4936C0 10.2535 0.0930664 10.0228 0.259691 9.8497L0.298458 9.8097C2.10949 7.91972 4.24814 6.37263 6.611 5.24325C6.74558 5.17883 6.89373 5.14778 7.04289 5.15273C7.19205 5.15768 7.33781 5.19848 7.4678 5.27168C7.5978 5.34488 7.70819 5.44831 7.78962 5.57319C7.87105 5.69808 7.9211 5.84073 7.93554 5.98905L7.9743 6.3826C8.01824 6.84023 8.05528 7.29873 8.08543 7.75808H14.3605C14.7032 7.75808 15.0319 7.89403 15.2742 8.13601C15.5166 8.37799 15.6527 8.70619 15.6527 9.04841V11.9387Z" fill="#FF5E5E" />
                                            </svg>



                                        </span>

                                        <span>Logout</span>

                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Drawer>
            </div>
            <Banner></Banner>
            <PromisseRefer></PromisseRefer>
            <div id='about' >
                <About></About>
                <Location></Location>
            </div>
            <div>
                <ChooseUs></ChooseUs>
            </div>
            <div id='touch' >
                <GetTouchPage></GetTouchPage>
            </div>

        </div>
    )
}

export default Home
