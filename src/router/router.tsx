import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import RegisterForm from "../components/client/register-from/RegisterForm";
import LoginFrom from "../components/client/login-from/LoginFrom";
import EmailVerify from "../components/client/forget-password/EmailVerify";

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
            }
        ]
    }
])