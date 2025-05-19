import React, { useEffect, useState, useRef } from "react";

import { Copy } from "lucide-react";
import { Button, Drawer, message } from "antd";
import moment from "moment";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { Link, NavLink } from 'react-router-dom';
import { UserProfile, UserProfileApiResponse } from "../../../type/UserProfileDataType";


const Referral: React.FC = () => {
  const [copied, setCopied] = useState(false);



  const [loading, setLoading] = useState(false);
  const [totalRefer, setTotalRefer] = useState("");
  const [totalReferList, setTotalReferList] = useState([]);
  const [user, setUser] = useState(null);
  const [userCoinData, setUserCoinData] = useState(null);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [open, setOpen] = useState(false);

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
    console.log(`copy`)
    setTimeout(() => setCopied(false), 2000);
  };





  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="font-degular font-semibold text-lg">Loading...</h1>
      </div>
    );
  }














  return (
    <div className=" bg-[#f6f6f6] " >



      <div className="bg-[#f6f6f6] pb-10 lg:pb-[76px] ">
        <div className="max-w-[1519px] mx-auto ">


          <div className='flex items-center gap-[22px] pt-10 ' >
            <Link to={"/"}><div className=' w-[55px] h-[55px] rounded-full bg-white flex items-center justify-center  ' >
              <span>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                </svg>

              </span>
            </div></Link>
            <div>
              <h1 className=' lg:text-3xl font-degular font-medium  ' >Back</h1>
            </div>
            <div>

            </div>
          </div>


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
