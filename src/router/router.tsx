import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import RegisterForm from "../components/client/register-from/RegisterForm";
import LoginFrom from "../components/client/login-from/LoginFrom";
import EmailVerify from "../components/client/forget-password/EmailVerify";
import OtpVerify from "../components/client/forget-password/OtpVerify";
import SetNewPassword from "../components/client/forget-password/SetNewPassword";
import PrivacyPolicy from "../pages/client/privacy-policy-page/PrivacyPolicy";
import TermCondiction from "../pages/client/term-condiction-page/TermCondiction";
import Home from "../pages/client/home-page/Home";
import About from "../pages/client/home-page/About";
import Referral from "../pages/client/referral-page/Referral";
import Profile from "../pages/client/profile/Profile";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <MainLayout></MainLayout>,
        children : [
            {
                path : "/",
                element : <Home></Home>
            },
            {
                path : "create-account",
                element : <RegisterForm></RegisterForm>
            },
            {
                path : "login",
                element : <LoginFrom></LoginFrom>
            },
            {
                path : "email-verify",
                element : <EmailVerify></EmailVerify>
            },
            {
                path : "otp-verify",
                element : <OtpVerify></OtpVerify>
            },
            {
                path : "password-change",
                element : <SetNewPassword></SetNewPassword>
            },
            {
                path : "about",
                element : <About></About>
            },{
                path : "refer",
                element : <Referral></Referral>
            },
        ]
    },
    {
        path : '/privacy-policy',
        element : <PrivacyPolicy></PrivacyPolicy> ,
    },
    {
        path : "/term-condiction",
        element : <TermCondiction></TermCondiction>
    }
    ,
    {
        path : "/profile",
        element : <Profile></Profile>
    }
])