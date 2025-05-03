import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import RegisterForm from "../components/client/register-from/RegisterForm";
import LoginFrom from "../components/client/login-from/LoginFrom";
import EmailVerify from "../components/client/forget-password/EmailVerify";
import OtpVerify from "../components/client/forget-password/OtpVerify";
import SetNewPassword from "../components/client/forget-password/SetNewPassword";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <MainLayout></MainLayout>,
        children : [
            {
                path : "/",
                element : <h1>home page</h1>
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
            }
        ]
    }
])