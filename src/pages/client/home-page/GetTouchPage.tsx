import React, { useState } from 'react'
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { ApiResponse } from '../../../type/apiResponseType';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const GetTouchPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    enquiry: '',
  });

  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const { full_name, email, enquiry } = formData;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token} `
    }
  }

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(!full_name){
        return message.error(`Enter your full name.`)
      }
      if(!email){
        return message.error(`Enter your email.`)
      }
      if(!enquiry){
        return message.error(`Enter your message.`)
      }
      setLoading(true);
      const res = await axiosPublic.post<ApiResponse>(`/send-enquiry`, { full_name, email, enquiry }, config);
      console.log(res);

      if (res.status === 201) {
        message.success(`Enquiry data sent successfully.`);
        setFormData({ full_name: "", email: "", enquiry: "" }); // Clear the form data
        return;
      }
    } catch (error: any) {
      navigate("/login")
      return message.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id='touch' className='bg-[#f6f6f6] lg:pb-28 md:pb-20 pb-10 ' >
      <div className=' max-w-[1731px] mx-auto bg-bgColor rounded-3xl lg:p-11 md:p-7 p-4  ' >
        <div className=' hidden lg:flex justify-between ' >
          <img src="/images/home-page/quote-1.png" className='  ' alt="" />
          <img src="/images/home-page/quote-2.png" className='mt-2 object-cover ' alt="" />
        </div>
        <h1 className='text-center text-textColor lg:text-[40px] md:text-[30px] text-xl font-degular font-medium ' >Get in Touch with us</h1>

        <div className='    lg:mt-12 lg:mx-12 lg:flex lg:justify-between lg:items-center gap-x-10 ' >
          <div className=' lg:w-[748px]  ' >


            <div className='' >
              <h1 className=' text-textColor font-degular lg:text-3xl text-lg font-medium text-center lg:text-start ' >Lets Talk About Your Next Pet Disposal</h1>
              <p className=' lg:mt-4 lg:text-xl font-degular text-textColor  font-thin text-justify mt-2 ' >Have questions? Ready to schedule a cleanup? We’re here to help! Reach out to us anytime — we’d love to hear from you.</p>
              <div className=" space-y-2 font-degular text-lg lg:mt-8 mt-3 ">
                {/* Phone */}
                <div className=" flex items-center gap-4">
                  <span>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.02222 9.15556C5.62222 12.3 8.2 14.8667 11.3444 16.4778L13.7889 14.0333C14.0889 13.7333 14.5333 13.6333 14.9222 13.7667C16.1667 14.1778 17.5111 14.4 18.8889 14.4C19.5 14.4 20 14.9 20 15.5111V19.3889C20 20 19.5 20.5 18.8889 20.5C8.45556 20.5 0 12.0444 0 1.61111C0 1 0.5 0.5 1.11111 0.5H5C5.61111 0.5 6.11111 1 6.11111 1.61111C6.11111 3 6.33333 4.33333 6.74444 5.57778C6.86667 5.96667 6.77778 6.4 6.46667 6.71111L4.02222 9.15556Z" fill="black" />
                    </svg>

                  </span>
                  <p>+1256987456</p>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <span>
                    <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.5 0.5H2.5C1.125 0.5 0.0125 1.625 0.0125 3L0 18C0 19.375 1.125 20.5 2.5 20.5H22.5C23.875 20.5 25 19.375 25 18V3C25 1.625 23.875 0.5 22.5 0.5ZM22.5 5.5L12.5 11.75L2.5 5.5V3L12.5 9.25L22.5 3V5.5Z" fill="black" />
                    </svg>

                  </span>
                  <p>example@gmail.com</p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <span>
                    <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.262 20.2281C7.262 20.2281 0 14.2354 0 8.33872C0 6.25976 0.842855 4.26595 2.34315 2.79591C3.84344 1.32586 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.32586 13.6569 2.79591C15.1571 4.26595 16 6.25976 16 8.33872C16 14.2354 8.738 20.2281 8.738 20.2281C8.334 20.5926 7.669 20.5887 7.262 20.2281ZM8 11.7682C8.45963 11.7682 8.91475 11.6795 9.33939 11.5071C9.76403 11.3348 10.1499 11.0821 10.4749 10.7637C10.7999 10.4452 11.0577 10.0672 11.2336 9.65111C11.4095 9.23503 11.5 8.78908 11.5 8.33872C11.5 7.88836 11.4095 7.44241 11.2336 7.02633C11.0577 6.61025 10.7999 6.23219 10.4749 5.91374C10.1499 5.59529 9.76403 5.34267 9.33939 5.17033C8.91475 4.99798 8.45963 4.90928 8 4.90928C7.07174 4.90928 6.1815 5.27059 5.52513 5.91374C4.86875 6.55688 4.5 7.42917 4.5 8.33872C4.5 9.24826 4.86875 10.1206 5.52513 10.7637C6.1815 11.4068 7.07174 11.7682 8 11.7682Z" fill="black" />
                    </svg>

                  </span>
                  <p>Dhaka, Bangladesh</p>
                </div>
                <div className=' hidden lg:flex justify-end relative -top-16  ' >
                  <span>
                    <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.65556 15.4086C1.04345 16.7325 0.449152 18.5853 0.470281 20.2047C0.488311 21.8403 1.10816 23.4849 2.21779 24.836C3.32743 26.1872 4.8201 27.115 6.42093 27.4507C8.00309 27.7835 9.93829 27.5635 11.5504 26.2396C13.1625 24.9157 13.7568 23.0629 13.7357 21.4435C13.7177 19.8079 13.0978 18.1634 11.9882 16.8122C10.8785 15.461 9.38586 14.5333 7.78503 14.1976C6.20287 13.8647 4.26767 14.0847 2.65556 15.4086ZM18.9395 2.03558C17.3274 3.35952 16.7331 5.2123 16.7542 6.8317C16.7723 8.46725 17.3921 10.1118 18.5018 11.463C19.6114 12.8142 21.1041 13.7419 22.7049 14.0776C24.287 14.4105 26.2222 14.1905 27.8344 12.8666C29.4465 11.5427 30.0408 9.68987 30.0196 8.07047C30.0016 6.43492 29.3818 4.79034 28.2721 3.43918C27.1625 2.08801 25.6698 1.16022 24.069 0.824533C22.4868 0.491649 20.5516 0.711656 18.9395 2.03558ZM2.89188 35.6173C1.27977 36.9412 0.685472 38.794 0.706601 40.4134C0.724632 42.049 1.34448 43.6935 2.45411 45.0447C3.56375 46.3959 5.05642 47.3237 6.65725 47.6593C8.23941 47.9922 10.1746 47.7722 11.7867 46.4483C13.3988 45.1244 13.9931 43.2716 13.972 41.6522C13.954 40.0166 13.3341 38.3721 12.2245 37.0209C11.1149 35.6697 9.62219 34.7419 8.02135 34.4062C6.43919 34.0734 4.50399 34.2934 2.89188 35.6173ZM20.8042 20.907C16.8961 24.1165 15.4329 28.238 15.3598 31.9207C15.2828 35.5521 16.5369 38.9518 18.3003 41.0991C20.355 43.601 23.5902 43.855 26.6664 43.0788C29.6934 42.3158 32.8027 40.524 35.2583 38.5073C37.714 36.4907 40.0783 33.7918 41.4131 30.9682C42.7694 28.1043 43.1526 24.8788 41.0978 22.3768C39.3344 20.2296 36.2435 18.3384 32.6663 17.7078C29.0408 17.0581 24.7156 17.6948 20.8042 20.907ZM38.7166 6.19664C37.1045 7.52057 36.5102 9.37335 36.5313 10.9928C36.5493 12.6283 37.1692 14.2729 38.2788 15.624C39.3885 16.9752 40.8811 17.903 42.482 18.2387C44.0641 18.5716 45.9993 18.3516 47.6114 17.0276C49.2235 15.7037 49.8178 13.8509 49.7967 12.2315C49.7787 10.596 49.1588 8.9514 48.0492 7.60023C46.9396 6.24906 45.4469 5.32128 43.8461 4.98559C42.2639 4.6527 40.3287 4.87271 38.7166 6.19664Z" fill="white" />
                    </svg>

                  </span>
                </div>
              </div>
            </div>

          </div>
          <div className=' lg:w-[667px] w-full mt-4 lg:mt-0  ' >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full mt-1 px-[30px] rounded-[30px] py-4  border bg-[#F6F6F6] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular focus:outline-none focus:ring-0 "
                  placeholder="Your Full Name"
                  
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-[30px] rounded-[30px] py-4  border bg-[#F6F6F6] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular focus:outline-none focus:ring-0 "
                  placeholder="Your Email"
                  
                />
              </div>

              <div>
                <textarea
                  name="enquiry"
                  value={formData.enquiry}
                  onChange={handleChange}
                  className="w-full mt-1 px-[30px] rounded-[30px] py-4  border bg-[#F6F6F6] placeholder:text-[#000000] placeholder:text-lg placeholder:font-degular focus:outline-none focus:ring-0 "
                  placeholder="Your Enquiry"
                  rows="6"
                  
                />
              </div>

              <div className=' flex justify-end ' >
                <button
                disabled = {loading}
                  type="submit"
                  className=" px-[30px] py-[18px] bg-white text-textColor font-degular text-lg rounded-[30px] flex items-center gap-5   "
                >
                  {
                    loading ? <>...Send
                      <span>
                        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.73269 17.9017C1.33305 18.0616 0.953393 18.0264 0.593715 17.7962C0.234038 17.566 0.0541992 17.2315 0.0541992 16.7927L0.0541992 11.3976L9.6456 8.99971L0.0541992 6.60186L0.0541992 1.2067C0.0541992 0.767092 0.234038 0.432593 0.593715 0.203198C0.953393 -0.026196 1.33305 -0.0613648 1.73269 0.0976925L20.1961 7.8907C20.6957 8.11051 20.9455 8.48017 20.9455 8.99971C20.9455 9.51924 20.6957 9.88891 20.1961 10.1087L1.73269 17.9017Z" fill="black" />
                        </svg>

                      </span></> : <>
                      Send
                      <span>
                        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.73269 17.9017C1.33305 18.0616 0.953393 18.0264 0.593715 17.7962C0.234038 17.566 0.0541992 17.2315 0.0541992 16.7927L0.0541992 11.3976L9.6456 8.99971L0.0541992 6.60186L0.0541992 1.2067C0.0541992 0.767092 0.234038 0.432593 0.593715 0.203198C0.953393 -0.026196 1.33305 -0.0613648 1.73269 0.0976925L20.1961 7.8907C20.6957 8.11051 20.9455 8.48017 20.9455 8.99971C20.9455 9.51924 20.6957 9.88891 20.1961 10.1087L1.73269 17.9017Z" fill="black" />
                        </svg>

                      </span>
                    </>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>


        <div className=' lg:flex justify-between hidden ' >
          <span>
            <svg width="59" height="39" viewBox="0 0 59 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9643 0C16.8782 0 15.2431 1.05465 14.2316 2.31953C13.2076 3.59492 12.6429 5.25924 12.6429 7.00765C12.6429 8.75606 13.2076 10.4204 14.2316 11.6958C15.2431 12.9571 16.8782 14.0153 18.9643 14.0153C21.0504 14.0153 22.6855 12.9606 23.6969 11.6958C24.721 10.4204 25.2857 8.75606 25.2857 7.00765C25.2857 5.25924 24.721 3.59492 23.6969 2.31953C22.6855 1.05815 21.0504 0 18.9643 0ZM40.0357 0C37.9496 0 36.3145 1.05465 35.3031 2.31953C34.279 3.59492 33.7143 5.25924 33.7143 7.00765C33.7143 8.75606 34.279 10.4204 35.3031 11.6958C36.3145 12.9571 37.9496 14.0153 40.0357 14.0153C42.1218 14.0153 43.7569 12.9606 44.7684 11.6958C45.7924 10.4204 46.3571 8.75606 46.3571 7.00765C46.3571 5.25924 45.7924 3.59492 44.7684 2.31953C43.7569 1.05815 42.1218 0 40.0357 0ZM6.32143 15.7672C4.23536 15.7672 2.60021 16.8219 1.58879 18.0867C0.564714 19.3621 0 21.0265 0 22.7749C0 24.5233 0.564714 26.1876 1.58879 27.463C2.60021 28.7244 4.23536 29.7825 6.32143 29.7825C8.4075 29.7825 10.0426 28.7279 11.0541 27.463C12.0781 26.1876 12.6429 24.5233 12.6429 22.7749C12.6429 21.0265 12.0781 19.3621 11.0541 18.0867C10.0426 16.8254 8.4075 15.7672 6.32143 15.7672ZM29.5 15.7672C24.4429 15.7672 20.6964 18.0237 18.3026 20.8232C15.9384 23.5807 14.75 27.004 14.75 29.7825C14.75 33.0201 17.0889 35.2695 19.9589 36.622C22.7824 37.9534 26.3224 38.5421 29.5 38.5421C32.6776 38.5421 36.2176 37.9569 39.0411 36.622C41.9069 35.2695 44.25 33.0201 44.25 29.7825C44.25 27.004 43.0616 23.5807 40.6974 20.8232C38.3079 18.0202 34.5614 15.7672 29.5 15.7672ZM52.6786 15.7672C50.5925 15.7672 48.9574 16.8219 47.9459 18.0867C46.9219 19.3621 46.3571 21.0265 46.3571 22.7749C46.3571 24.5233 46.9219 26.1876 47.9459 27.463C48.9574 28.7244 50.5925 29.7825 52.6786 29.7825C54.7646 29.7825 56.3998 28.7279 57.4112 27.463C58.4353 26.1876 59 24.5233 59 22.7749C59 21.0265 58.4353 19.3621 57.4112 18.0867C56.3998 16.8254 54.7646 15.7672 52.6786 15.7672Z" fill="white" />
            </svg>
          </span>
          <span>
            <svg width="42" height="59" viewBox="0 0 42 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M35.6874 13.3021C35.1635 11.2829 33.7319 9.96503 32.2536 9.30371C30.7619 8.63279 29.0091 8.50418 27.3167 8.94331C25.6243 9.38244 24.1552 10.3471 23.1779 11.6586C22.211 12.9544 21.5974 14.8029 22.1213 16.8221C22.6453 18.8413 24.0768 20.1592 25.5552 20.8205C27.0469 21.4914 28.7997 21.62 30.492 21.1809C32.1844 20.7418 33.6535 19.7772 34.6309 18.4656C35.5978 17.1698 36.2113 15.3213 35.6874 13.3021ZM40.9797 33.6981C40.4557 31.6789 39.0242 30.361 37.5458 29.6997C36.0541 29.0288 34.3013 28.9002 32.6089 29.3393C30.9166 29.7784 29.4474 30.7431 28.4701 32.0546C27.5032 33.3504 26.8897 35.1989 27.4136 37.2181C27.9375 39.2374 29.3691 40.5552 30.8474 41.2165C32.3391 41.8874 34.0919 42.016 35.7843 41.5769C37.4767 41.1378 38.9458 40.1732 39.9231 38.8616C40.89 37.5658 41.5036 35.7173 40.9797 33.6981ZM17.2502 5.02454C16.7263 3.00533 15.2948 1.68749 13.8164 1.02617C12.3247 0.355247 10.5719 0.226638 8.87952 0.665768C7.18716 1.10489 5.71802 2.06951 4.74071 3.38108C3.77379 4.6769 3.16024 6.52539 3.68417 8.5446C4.2081 10.5638 5.63963 11.8816 7.11799 12.543C8.60971 13.2139 10.3625 13.3425 12.0549 12.9034C13.7472 12.4642 15.2164 11.4996 16.1937 10.1881C17.1606 8.89224 17.7742 7.04374 17.2502 5.02454ZM23.0717 27.4601C21.8016 22.5651 18.6765 19.5054 15.3655 17.8916C12.1025 16.2957 8.49054 16.0051 5.80107 16.703C2.66732 17.5161 1.07741 20.3451 0.489087 23.4627C-0.0905256 26.5302 0.228799 30.1045 1.02687 33.1802C1.82494 36.256 3.28043 39.5355 5.28176 41.9333C7.31063 44.3675 10.0765 46.0705 13.2102 45.2574C15.8997 44.5596 18.9147 42.5494 20.9901 39.5684C23.1031 36.5515 24.3429 32.3593 23.0717 27.4601ZM28.8932 49.8958C28.3693 47.8766 26.9377 46.5587 25.4594 45.8974C23.9677 45.2265 22.2149 45.0979 20.5225 45.537C18.8301 45.9761 17.361 46.9407 16.3837 48.2523C15.4168 49.5481 14.8032 51.3966 15.3271 53.4158C15.8511 55.435 17.2826 56.7529 18.761 57.4142C20.2527 58.0851 22.0055 58.2137 23.6978 57.7746C25.3902 57.3355 26.8593 56.3708 27.8367 55.0593C28.8036 53.7635 29.4171 51.915 28.8932 49.8958Z" fill="white" />
            </svg>

          </span>
        </div>



      </div>

    </section>
  )
}

export default GetTouchPage
