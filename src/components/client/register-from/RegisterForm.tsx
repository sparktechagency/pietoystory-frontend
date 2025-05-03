import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    EnvironmentOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
    const [showPhone, setShowPhone] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row max-w-[1519px] mx-auto mt-12 px-4 gap-8">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-xl">
                    <h2 className="text-3xl font-bold text-black mb-6">Create Your Account</h2>
                    <Form layout="vertical">
                        <Form.Item style={{ marginBottom: "0px" }}  >
                            <Input
                                size="large"
                                placeholder="Your full name"
                                prefix={<UserOutlined />}
                                className="rounded-xl custom-placeholder  "
                                style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginTop: "20px" }} >
                            <div className="relative">
                                {showPhone ? (
                                    <Input
                                        size="large"
                                        placeholder="Enter your phone number"
                                        prefix={<MailOutlined />}
                                        className="rounded-xl custom-placeholder  "
                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                    />
                                ) : (
                                    <Input
                                        size="large"
                                        placeholder="Enter your email"
                                        prefix={<MailOutlined />}
                                        className="rounded-xl custom-placeholder  "
                                        style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowPhone(!showPhone)}
                                    className="absolute right-3 top-2 mt-2 text-sm text-blue-600 hover:underline"
                                >
                                    {showPhone ? <span className='mt-2' >'Use Email'</span> : <span className='!mt-3' >Use Phone</span>}
                                </button>
                            </div>
                        </Form.Item>

                        <Form.Item style={{ marginTop: "20px" }} >
                            <Input
                                size="large"
                                placeholder="Your location"
                                prefix={<EnvironmentOutlined />} className="rounded-xl custom-placeholder  "
                                style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginTop: "20px" }}>
                            <Input.Password
                                size="large"
                                placeholder="Password"
                                prefix={<LockOutlined />}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className="rounded-xl custom-placeholder  "
                                style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginTop: "20px" }}>
                            <Input.Password
                                size="large"
                                placeholder="Confirm password"
                                prefix={<LockOutlined />}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className="rounded-xl custom-placeholder  "
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
                                block
                                size="large"
                                htmlType="submit"
                                className="border-none bg-bgColor hover:bg-bgColor text-black font-medium font-degular h-12 "
                            >
                                Create Account
                            </Button>
                        </Form.Item>
                    </Form>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className=" ">
                <img
                    src="/images/registration/regImg.png"
                    alt="Registration Illustration"
                    className="object-cover rounded-xl mt-[22%] block "
                />
            </div>
        </div>
    );
};

export default CreateAccount;
