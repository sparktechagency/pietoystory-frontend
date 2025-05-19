import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    EnvironmentOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    TeamOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { RegistrationFormValues } from '../../../type/registrationType';
import { ApiResponse } from '../../../type/apiResponseType';
import { IoClose } from 'react-icons/io5';
import LoginFromModal from './LoginFromModal';



const RegistrationModal: React.FC = ({ setOpenRegistrationModal }) => {
    const axiosPublic = useAxiosPublic();
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [showPhone, setShowPhone] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (values: RegistrationFormValues) => {

        try {
            setLoading(true);
            let res = await axiosPublic.post<ApiResponse>(`/register`, values);
            if (res.status === 201) {
                toast.success(res.data.message);
                form.resetFields();
                return navigate(`/user-otp-verify?email=${values.email || values.phone_number}`)
            }
        } catch (error: any) {
            console.log(error);
            const errorMessage =
                error.response?.data?.message?.email?.[0] ||
                error.response?.data?.message?.phone_number?.[0] ||
                error.response?.data?.message ||
                "Something went wrong. Please try again.";

            return toast.error(errorMessage);
        } finally {
            setLoading(false)
        }
    }


    // login modal related function

    const [openLogInModal, setOpenLoginModal] = useState<boolean>(false)

    const handleOpenLogInModal = () => {
        console.log(`modal open`)
        setOpenLoginModal(true)
        setOpenRegistrationModal(false)
    }



    return (
        <>

            <div className=' bg-[#f6f6f6] ' >
                <div className="flex flex-col lg:flex-row mx-auto pt-12 px-4 gap-8">
                    {/* Left Side - Form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <div className="w-full max-w-xl">
                            <h2 className="text-3xl font-bold text-black mb-6">Create Your Account</h2>
                            <Form form={form} onFinish={handleSubmit} layout="vertical">
                                <Form.Item
                                    name="full_name"
                                    required
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter your full name.",
                                        },
                                    ]}
                                    style={{ marginBottom: "0px" }}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Your full name"
                                        prefix={<UserOutlined />}
                                        className="rounded-xl custom-placeholder"
                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    required
                                    rules={[{ required: true, message: "Enter your email or phone number" }]}
                                    name={showPhone ? "phone_number" : "email"}
                                    style={{ marginTop: "20px", width: "100%" }}
                                >
                                    <div className="relative">
                                        <Input
                                            size="large"
                                            type={showPhone ? "tel" : "email"}
                                            placeholder={showPhone ? "Enter your phone number" : "Enter your email"}
                                            prefix={showPhone ? <PhoneOutlined /> : <MailOutlined />}
                                            className="rounded-xl custom-placeholder w-full"
                                            style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPhone(!showPhone)}
                                            className="text-sm text-blue-600 hover:underline absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                                        >
                                            {showPhone ? <> <p className=' text-[#404040]  ' >Use email address</p> </> : <> <p className=' text-[#404040] '  >Use phone number</p> </>}
                                        </button>
                                    </div>
                                </Form.Item>


                                <Form.Item name={"address"} rules={[{
                                    required: true,
                                    message: "Enter your location."
                                }]} style={{ marginTop: "20px" }} >
                                    <Input
                                        size="large"
                                        placeholder="Your location"
                                        prefix={<EnvironmentOutlined />} className="rounded-xl custom-placeholder  "
                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter your password.",
                                        },
                                    ]}
                                    style={{ marginTop: "20px" }}
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Password"
                                        prefix={<LockOutlined />}
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        className="rounded-xl custom-placeholder"
                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password_confirmation"
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter your confirm password.",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("Passwords do not match."));
                                            },
                                        }),
                                    ]}
                                    style={{ marginTop: "20px" }}
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Confirm password"
                                        prefix={<LockOutlined />}
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        className="rounded-xl custom-placeholder"
                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                    />
                                </Form.Item>

                                <Form.Item style={{ marginTop: "20px" }}>
                                    <Input
                                        size="large"
                                        placeholder="Referral Code (optional)"
                                        prefix={<span className='' >{<TeamOutlined />}</span>}
                                        className="rounded-xl custom-placeholder  "
                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        loading={loading}
                                        disabled={loading}
                                        block
                                        size="large"
                                        htmlType="submit"
                                        className="border-none bg-bgColor hover:bg-bgColor text-black font-medium font-degular h-12 "
                                    >
                                        Create Account
                                    </Button>
                                </Form.Item>
                            </Form>

                            <p className="text-center text-sm text-[#000000] lg:pb-16 ">
                                Already have an account?{' '}
                                <p className=" text-black cursor-pointer ">
                                    <span onClick={handleOpenLogInModal} className=' text-[#0063E5] underline ' >Login here</span>
                                </p>
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className=" ">
                        <img
                            src="/images/registration/regImg.png"
                            alt="Registration Illustration"
                            className="object-cover rounded-xl mt-[22%] mx-auto block "
                        />
                    </div>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>


            {openLogInModal && (
                <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-7/12 mx-auto relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setOpenLoginModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            <IoClose size={24} />
                        </button>

                        <LoginFromModal></LoginFromModal>
                    </div>
                </div>
            )}

        </>
    );
};

export default RegistrationModal;