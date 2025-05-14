import React, { useEffect, useState, useRef } from "react";

import { Copy } from "lucide-react";
import { Button, Drawer, message } from "antd";
import moment from "moment";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { UserProfile, UserProfileApiResponse } from "../../../type/UserProfileDataType";
import { MenuOutlined } from '@ant-design/icons';
import Banner from "../home-page/Banner";
import PromisseRefer from "../home-page/PromisseRefer";
import About from "../home-page/About";
import Location from "../home-page/Location";
import ChooseUs from "../home-page/ChooseUs";
import GetTouchPage from "../home-page/GetTouchPage";

const Referral: React.FC = () => {
  const [copied, setCopied] = useState(false);



  const [loading, setLoading] = useState(false);
  const [totalRefer, setTotalRefer] = useState("");
  const [totalReferList, setTotalReferList] = useState([]);
  const [user, setUser] = useState(null);
  const [userCoinData, setUserCoinData] = useState(null);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const axiosPublic = useAxiosPublic();
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 📌 Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosPublic.get<UserProfileApiResponse>(`/profile`, config);
        setProfileData(data?.data);
      } catch (error: any) {
        return message.error(error.response.data.message)
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);







  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/all-referred-info`, config);
        if (res.data) {
          setTotalRefer(res.data?.totalRefer);
          setTotalReferList(res.data?.totalReferList);
          setUser(res.data?.user);
          setUserCoinData(res.data?.userCoinData);
        }
      } catch (error: any) {
        return message.error(error.response.data?.message)
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const baseURl = window.location.origin;

  const referralLink = `${baseURl}/user-register?referral_code=${user?.referral_code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    message.success("Copy successfully.");
    setTimeout(() => setCopied(false), 2000);
  };









  // 📌 Toggle Drawer
  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setAccountOpen(false);
  };

  // 📌 Outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 📌 Window Resize Handler (debounced)
  useEffect(() => {
    const handleResize = () => {
      setAccountOpen(false);
      setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📌 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // 📌 Loading State
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="font-degular font-semibold text-lg">Loading...</h1>
      </div>
    );
  }














  return (
    <div className=" bg-[#f6f6f6] " >
      <div className="max-w-[1519px]  mx-auto flex gap-x-4 items-center justify-between py-2 lg:px-0 px-4">

        {/* Logo */}
        <div className="flex-shrink-0 mx-auto lg:mx-0    ">
          <NavLink to="/">
            <img src="/images/navbar/logo.png" alt="Logo" className="h-12   " />
          </NavLink>
        </div>

        {/* Nav menu - Desktop only */}
        <div className="hidden lg:block w-[1006px] mx-auto">
          <nav className="flex justify-between px-16 items-center bg-[#b9ecff] h-16 rounded-full font-degular font-medium text-xl">
            <NavLink className={"text-black"} to="/">Home</NavLink>
            <a className={"text-black"} href="#about">About Us</a>
            <a className={"text-black"} href="#touch">Contact Us</a>
            <NavLink className={"text-black"} to="/refer">Referrals</NavLink>
          </nav>
        </div>

        {/* Create Account - Desktop only */}
        <div className="hidden   lg:block relative" ref={dropdownRef}>


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
                    className="w-12 h-12 border-2 border-black p-0.5 rounded-full"
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
            ) : <>
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
            </>
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
                  <button onClick={handleLogout} className=" font-degular border border-[#FF5E5E] py-[14px] px-6 rounded-[20px] shadow-md flex flex-row gap-x-[13px] items-center w-full mt-7 text-[#FF5E5E] bg-[#FFFFFF]  ">
                    <span>
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.016 19.5323C10.016 19.2756 10.1182 19.0294 10.2999 18.848C10.4817 18.6665 10.7282 18.5645 10.9852 18.5645H18.7386C18.8243 18.5645 18.9064 18.5305 18.967 18.47C19.0276 18.4095 19.0617 18.3275 19.0617 18.2419V2.75806C19.0617 2.67251 19.0276 2.59046 18.967 2.52997C18.9064 2.46947 18.8243 2.43548 18.7386 2.43548H10.9852C10.7282 2.43548 10.4817 2.33353 10.2999 2.15204C10.1182 1.97055 10.016 1.7244 10.016 1.46774C10.016 1.21108 10.1182 0.964932 10.2999 0.783445C10.4817 0.601958 10.7282 0.5 10.9852 0.5H18.7386C19.9869 0.5 21 1.51161 21 2.75806V18.2419C21 18.8408 20.7617 19.4152 20.3377 19.8386C19.9136 20.2621 19.3384 20.5 18.7386 20.5H10.9852C10.7282 20.5 10.4817 20.398 10.2999 20.2166C10.1182 20.0351 10.016 19.7889 10.016 19.5323Z" fill="#FF5E5E" />
                        <path d="M15.6527 11.9387C15.6527 12.2809 15.5166 12.6091 15.2742 12.8511C15.0319 13.0931 14.7032 13.2291 14.3605 13.2291H8.08543C8.05528 13.6875 8.01824 14.146 7.9743 14.6045L7.93554 14.9981C7.9211 15.1464 7.87105 15.2891 7.78962 15.4139C7.70819 15.5388 7.5978 15.6423 7.4678 15.7155C7.33781 15.7887 7.19205 15.8295 7.04289 15.8344C6.89373 15.8394 6.74558 15.8083 6.611 15.7439C4.24814 14.6145 2.10949 13.0674 0.298458 11.1774L0.259691 11.1374C0.0930664 10.9644 0 10.7336 0 10.4936C0 10.2535 0.0930664 10.0228 0.259691 9.8497L0.298458 9.8097C2.10949 7.91972 4.24814 6.37263 6.611 5.24325C6.74558 5.17883 6.89373 5.14778 7.04289 5.15273C7.19205 5.15768 7.33781 5.19848 7.4678 5.27168C7.5978 5.34488 7.70819 5.44831 7.78962 5.57319C7.87105 5.69808 7.9211 5.84073 7.93554 5.98905L7.9743 6.3826C8.01824 6.84023 8.05528 7.29873 8.08543 7.75808H14.3605C14.7032 7.75808 15.0319 7.89403 15.2742 8.13601C15.5166 8.37799 15.6527 8.70619 15.6527 9.04841V11.9387Z" fill="#FF5E5E" />
                      </svg>



                    </span>

                    <span  >Logout</span>

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



      <div className="bg-[#f6f6f6] pb-10 lg:pb-[76px] ">
        <div className="max-w-[1519px] mx-auto ">
          <div className="relative flex flex-col items-center">
            {/* Top image */}
            <img
              src="/images/refer/referImg.png"
              alt="Refer a friend"
              className="w-[83px] h-[117px] object-cover mb-[-28px] z-10"
            />

            {/* Card with heading */}
            <div className="bg-white py-2.5 px-6 sm:px-12  rounded-[20px] text-center z-20 lg:w-[549px] ">
              <h1 className="text-textColor font-degular text-sm lg:text-[20px] sm:text-[24px]">
                Refer a friend and get 2 free cleanings
              </h1>
            </div>

            {/* Referral Link */}
            <div className=" mt-3 lg:mt-10 lg:w-[863px] flex lg:flex-row flex-col items-center lg:gap-x-4 lg:mb-4 lg:mr-36  ">
              <p className="lg:text-xl text-sm font-degular text-textColor lg:min-w-[130px] mb-3 lg:mb-0 ">
                Referral link:
              </p>

              <div className="flex items-center lg:w-full border border-black rounded-full lg:px-4 px-2 py-3   relative">
                <span className=" text-textColor font-degular text-sm lg:text-[22px] ">
                  {referralLink}
                </span>

                <button
                  onClick={handleCopy}
                  className="ml-auto text-gray-500 hover:text-black transition"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className=" text-textColor font-degular lg:text-xl mb-2 my-3 lg:my-0 ">
              Total refer: {totalRefer}{" "}
            </h1>
          </div>
          <div className="  flex lg:flex-row flex-col gap-2.5  ">
            <div className=" bg-white  p-7 rounded-[20px]  flex-1  ">
              <h1 className="flex items-center gap-x-3.5 ">
                <svg
                  width="23"
                  height="21"
                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6905 6.05554H12.0476V11.6111L16.7352 14.4333L17.5238 13.0888L13.6905 10.7777V6.05554ZM13.1429 0.5C10.5286 0.5 8.02138 1.55356 6.1728 3.42892C4.32423 5.30428 3.28571 7.84781 3.28571 10.5H0L4.33714 14.9777L8.7619 10.5H5.47619C5.47619 8.43718 6.28393 6.45888 7.72171 5.00026C9.15948 3.54165 11.1095 2.72221 13.1429 2.72221C15.1762 2.72221 17.1262 3.54165 18.564 5.00026C20.0018 6.45888 20.8095 8.43718 20.8095 10.5C20.8095 12.5628 20.0018 14.5411 18.564 15.9997C17.1262 17.4583 15.1762 18.2777 13.1429 18.2777C11.029 18.2777 9.11238 17.3999 7.73238 15.9888L6.17714 17.5666C7.08795 18.5004 8.17304 19.2408 9.36903 19.7444C10.565 20.2481 11.8479 20.5049 13.1429 20.4999C15.7571 20.4999 18.2643 19.4464 20.1129 17.571C21.9615 15.6957 23 13.1521 23 10.5C23 7.84781 21.9615 5.30428 20.1129 3.42892C18.2643 1.55356 15.7571 0.5 13.1429 0.5Z"
                    fill="black"
                  />
                </svg>
                <span className=" text-textColor text-xl font-degular ">
                  Previous referrals
                </span>
              </h1>
              <div className="p-5">
                {Array.isArray(totalReferList) && totalReferList.length > 0 ? (
                  totalReferList.map((item, i) => (
                    <div key={i} className="mb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
                        <h1 className="text-base sm:text-lg md:text-xl text-textColor font-degular">
                          {i + 1}. {item?.user?.full_name || "N/A"}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl font-degular font-thin text-textColor">
                          {item?.user?.email || "No Email Provided"}
                        </p>
                        <p className="text-base sm:text-lg md:text-xl font-degular font-thin text-textColor">
                          {item?.created_at
                            ? moment(item?.created_at).format("DD MMMM YYYY")
                            : "Date Not Available"}
                        </p>
                        <p className="text-base sm:text-lg md:text-xl font-degular font-thin text-textColor">
                          +2
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No Referrals Found</p>
                )}
              </div>
            </div>
            <div className="  ">
              <div className=" flex-1 lg:px-8 px-4 py-3.5 lg:py-7 rounded-[20px] bg-white lg:w-[491px] lg:h-[375px]  ">
                <h1 className="flex items-center gap-x-3.5 ">
                  <svg
                    width="19"
                    height="27"
                    viewBox="0 0 19 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.10416 14.469L0.893564 0.981876C0.852139 0.9044 0.826465 0.819569 0.818008 0.732226C0.809551 0.644883 0.818476 0.556739 0.844274 0.472826C0.896376 0.303356 1.01404 0.16141 1.17139 0.0782135C1.32873 -0.00498302 1.51286 -0.0226146 1.68328 0.0291973C1.76766 0.054852 1.84614 0.0967833 1.91422 0.152597C1.98231 0.208411 2.03868 0.277015 2.0801 0.35449L9.29137 13.8416L10.314 13.3004C10.6256 13.1356 10.9669 13.0335 11.3183 12.9999C11.6696 12.9663 12.0242 13.0019 12.3617 13.1046C12.6993 13.2072 13.0132 13.375 13.2855 13.5984C13.5578 13.8217 13.7832 14.0962 13.9488 14.4062L14.3842 15.2207L19 21.9382L13.1291 25.0417L11.0954 21.0442L9.89673 21.6475L11.9426 25.6697L9.42574 27L6.40565 19.438L5.97094 18.6242C5.80522 18.3143 5.70251 17.9749 5.66867 17.6256C5.63483 17.2762 5.67053 16.9236 5.77372 16.588C5.87691 16.2523 6.04559 15.9401 6.2701 15.6693C6.49462 15.3985 6.77058 15.1743 7.08223 15.0095L8.10416 14.469ZM10.9442 14.481L7.71245 16.1895C7.55663 16.2718 7.41864 16.3839 7.30639 16.5194C7.19413 16.6548 7.10979 16.8108 7.0582 16.9787C7.0066 17.1465 6.98875 17.3228 7.00567 17.4975C7.02259 17.6722 7.07395 17.8418 7.15681 17.9968L7.59151 18.8106L13.197 15.8467L12.7616 15.0336C12.6788 14.8786 12.566 14.7414 12.4299 14.6298C12.2937 14.5181 12.1368 14.4343 11.968 14.383C11.7992 14.3316 11.6219 14.3139 11.4463 14.3307C11.2706 14.3475 11.1 14.3986 10.9442 14.481Z"
                      fill="black"
                    />
                    <path
                      d="M5.21915 20.9887C5.10517 20.8526 4.94149 20.767 4.76409 20.7508C4.58669 20.7347 4.4101 20.7892 4.27314 20.9025L4.2671 20.9079L4.22544 20.9399C4.16508 20.9848 4.10347 21.0281 4.04067 21.0696C3.87405 21.1798 3.62545 21.3301 3.30564 21.4811C2.48359 21.874 1.58393 22.0801 0.671878 22.0845C0.493685 22.0845 0.32279 22.1549 0.196789 22.2802C0.0707871 22.4055 0 22.5754 0 22.7526C0 22.9298 0.0707871 23.0997 0.196789 23.225C0.32279 23.3504 0.493685 23.4207 0.671878 23.4207C1.78384 23.4165 2.8809 23.1661 3.88345 22.6878C4.19601 22.5402 4.49775 22.371 4.78646 22.1813C4.89445 22.1094 4.99978 22.0337 5.10224 21.9542L5.1224 21.9388L5.12912 21.9335L5.13113 21.9308H5.13247L5.13315 21.9295C5.26995 21.816 5.35586 21.6532 5.37199 21.4768C5.38812 21.3004 5.33314 21.1248 5.21915 20.9887ZM6.6059 24.3862C6.65488 24.4592 6.68892 24.5411 6.70608 24.6272C6.72323 24.7132 6.72317 24.8018 6.70588 24.8879C6.6886 24.974 6.65444 25.0558 6.60535 25.1287C6.55626 25.2016 6.49321 25.2642 6.41979 25.3129L6.41845 25.3143L6.41576 25.3156L6.40904 25.3196L6.38821 25.333L6.31162 25.3817C5.90949 25.6268 5.49157 25.8453 5.06058 26.0359C4.26642 26.3866 3.1585 26.7615 2.01563 26.7615C1.83744 26.7615 1.66655 26.6911 1.54054 26.5658C1.41454 26.4405 1.34376 26.2705 1.34376 26.0933C1.34376 25.9161 1.41454 25.7462 1.54054 25.6209C1.66655 25.4956 1.83744 25.4252 2.01563 25.4252C2.88773 25.4252 3.79611 25.1319 4.51435 24.8145C4.88877 24.6489 5.25191 24.4592 5.60145 24.2466C5.62787 24.231 5.64713 24.219 5.65923 24.2105L5.67267 24.2025L5.67401 24.2011C5.74741 24.1524 5.82975 24.1186 5.91631 24.1015C6.00288 24.0845 6.09197 24.0845 6.17851 24.1017C6.26505 24.1189 6.34733 24.1529 6.42066 24.2017C6.494 24.2505 6.55694 24.3132 6.6059 24.3862Z"
                      fill="black"
                    />
                  </svg>

                  <span className=" text-textColor lg:text-xl font-degular ">
                    Free cleanings
                  </span>
                </h1>
                <div className=" flex justify-between py-2 px-5 border rounded-[20px] text-textColor lg:text-xl font-degular mt-7 ">
                  <h1>Total earned</h1>
                  <p>{userCoinData?.earn_coins}</p>
                </div>
                <div className=" flex justify-between py-2 px-5 border rounded-[20px] text-textColor lg:text-xl font-degular mt-7 ">
                  <h1>Used</h1>
                  <p> {userCoinData?.used_coins} </p>
                </div>
                <div className=" flex justify-between py-2 px-5 border rounded-[20px] text-textColor lg:text-xl font-degular mt-7 ">
                  <h1>Remaining</h1>
                  <p>{userCoinData?.remaining_coins}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Referral;
