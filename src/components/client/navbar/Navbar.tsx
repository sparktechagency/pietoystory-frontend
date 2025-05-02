import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
    return (
        <div className="">
            <div className="max-w-[1519px] mx-auto flex items-center justify-between py-2 px-6">

                {/* Logo */}
                <div className="flex-shrink-0">
                    <NavLink to="/">
                        <img src="/images/navbar/logo.png" alt="Logo" className="h-12" />
                    </NavLink>
                </div>

                {/* Nav menu */}
                <div className=" w-[1006px] ">
                    <nav className="flex justify-between px-20 items-center bg-[#b9ecff] py-4 rounded-full ">
                        <NavLink
                            to="/"
                            className="text-sm font-medium text-black hover:underline"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="text-sm font-medium text-black hover:underline"
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className="text-sm font-medium text-black hover:underline"
                        >
                            Contact Us
                        </NavLink>
                        <NavLink
                            to="/referrals"
                            className="text-sm font-medium text-black hover:underline"
                        >
                            Referrals
                        </NavLink>
                    </nav>
                </div>

                {/* Create Account */}
                <div className="flex-shrink-0">
                    <Link
                        to="/create-account"
                        className="flex items-center bg-[#b9ecff] rounded-full px-4 py-2 space-x-2"
                    >
                        <FaUserCircle className="text-xl text-black" />
                        <span className="text-sm font-medium text-black">Create account</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
