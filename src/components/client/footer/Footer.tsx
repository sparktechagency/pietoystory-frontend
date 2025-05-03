import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <div className="backgroundColor pt-12 pb-20">
      <div className="max-w-[1519px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Left Side */}
          <div className="text-white max-w-[517px]">
            <span>
              <img src="/images/navbar/logo.png" alt="Logo" className="w-[150px]" />
            </span>
            <p className="mt-4 font-degular text-2xl">
              Eco-friendly, affordable, and reliable pet waste removal services right at your doorstep.
            </p>

            {/* Contact Section */}
            <div className="mt-7 space-y-4 font-degular text-lg">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.02222 9.15556C5.62222 12.3 8.2 14.8667 11.3444 16.4778L13.7889 14.0333C14.0889 13.7333 14.5333 13.6333 14.9222 13.7667C16.1667 14.1778 17.5111 14.4 18.8889 14.4C19.5 14.4 20 14.9 20 15.5111V19.3889C20 20 19.5 20.5 18.8889 20.5C8.45556 20.5 0 12.0444 0 1.61111C0 1 0.5 0.5 1.11111 0.5H5C5.61111 0.5 6.11111 1 6.11111 1.61111C6.11111 3 6.33333 4.33333 6.74444 5.57778C6.86667 5.96667 6.77778 6.4 6.46667 6.71111L4.02222 9.15556Z" fill="white" />
                </svg>
                <p>+1256987456</p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5 0.5H2.5C1.125 0.5 0.0125 1.625 0.0125 3L0 18C0 19.375 1.125 20.5 2.5 20.5H22.5C23.875 20.5 25 19.375 25 18V3C25 1.625 23.875 0.5 22.5 0.5ZM22.5 5.5L12.5 11.75L2.5 5.5V3L12.5 9.25L22.5 3V5.5Z" fill="white" />
                </svg>
                <p>example@gmail.com</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.262 20.2281C7.262 20.2281 0 14.2354 0 8.33872C0 6.25976 0.842855 4.26595 2.34315 2.79591C3.84344 1.32586 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.32586 13.6569 2.79591C15.1571 4.26595 16 6.25976 16 8.33872C16 14.2354 8.738 20.2281 8.738 20.2281C8.334 20.5926 7.669 20.5887 7.262 20.2281ZM8 11.7682C8.45963 11.7682 8.91475 11.6795 9.33939 11.5071C9.76403 11.3348 10.1499 11.0821 10.4749 10.7637C10.7999 10.4452 11.0577 10.0672 11.2336 9.65111C11.4095 9.23503 11.5 8.78908 11.5 8.33872C11.5 7.88836 11.4095 7.44241 11.2336 7.02633C11.0577 6.61025 10.7999 6.23219 10.4749 5.91374C10.1499 5.59529 9.76403 5.34267 9.33939 5.17033C8.91475 4.99798 8.45963 4.90928 8 4.90928C7.07174 4.90928 6.1815 5.27059 5.52513 5.91374C4.86875 6.55688 4.5 7.42917 4.5 8.33872C4.5 9.24826 4.86875 10.1206 5.52513 10.7637C6.1815 11.4068 7.07174 11.7682 8 11.7682Z" fill="white" />
                </svg>
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Middle Side */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl text-white underline font-degular font-medium">Quick Access</h1>
            <ul className="mt-6 text-xl text-white font-degular font-thin space-y-3">
              <li><Link to="">Home</Link></li>
              <li><Link to="">Privacy Policy</Link></li>
              <li><Link to="">Terms and conditions</Link></li>
              <li><Link to="">Refer a friend</Link></li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex justify-center lg:justify-end">
            <img src="/images/footer/footerImg.png" alt="Footer" className="w-full max-w-[300px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
