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
import Referral from "../pages/client/referral-page/Referral";
import Profile from "../pages/client/profile/Profile";
import HistoryPage from "../pages/client/history/HistoryPage";
import Checkout from "../pages/client/checkout-page/Checkout";
import Quote from "../pages/client/quote-page/Quote";
import StripePayment from "../components/client/payment/StripePayment";
import UserOtpVerify from "../components/client/user-otp-verify/UserOtpVerify";
import ChangePassword from "../pages/client/setting/ChangePassword";
import UserRegister from "../components/client/user-register/UserRegister";
import PrivateRoute from "../private-route/PrivateRoute";
import QuotePageTwo from "../components/client/quote-page-two/QuotePageTwo";
import CheckoutPageTwo from "../components/client/quote-page-two/CheckoutPageTwo";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "create-account",
                element: <RegisterForm></RegisterForm>
            },
            {
                path: "login",
                element: <LoginFrom></LoginFrom>
            },
            {
                path: "email-verify",
                element: <EmailVerify></EmailVerify>
            },
            {
                path: "otp-verify",
                element: <OtpVerify></OtpVerify>
            },
            {
                path: "password-change",
                element: <SetNewPassword></SetNewPassword>
            },
            
            {
                path: "refer",
                element: <PrivateRoute><Referral></Referral></PrivateRoute>
            },
            
            {
                path: "user-otp-verify",
                element: <UserOtpVerify></UserOtpVerify>
            },
            {
                path: "user-register",
                element: <UserRegister />
            }

        ]
    },
    {
        path: '/privacy-policy',
        element: <PrivacyPolicy></PrivacyPolicy>,
    },
    {
        path: "/term-condiction",
        element: <TermCondiction></TermCondiction>
    }
    ,
    {
        path: "/profile",
        element: <Profile></Profile>
    },
    {
        path: "/history",
        element: <PrivateRoute><HistoryPage></HistoryPage></PrivateRoute>
    },
    {
        path: "/checkout",
        element: <Checkout></Checkout>
    },
    {
        path: "/quote",
        element: <Quote></Quote>
    },
    {
        path: "/payment",
        element: <StripePayment />
    },
    {
        path: "/change-password",
        element: <ChangePassword />
    },
    {
        path : "/quote-page",
        element : <QuotePageTwo></QuotePageTwo>
    },
    {
        path : "/checkout-page-two",
        element : <CheckoutPageTwo></CheckoutPageTwo>
    }
])