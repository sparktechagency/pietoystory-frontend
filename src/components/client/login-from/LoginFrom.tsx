import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
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

const LoginFrom:React.FC = () => {
    const [showPhone, setShowPhone] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row max-w-[1519px]  mx-auto mt-8 lg:mt-20 px-4 lg:gap-x-20">
            {/* Left Side - Form */}
            <div className="w-full max-w-[748px]">
                <h2 className="text-3xl font-bold text-black mb-6">Login To Your Account</h2>
                <Form layout="vertical" style={{marginTop:"8px"}} >


                    <Form.Item style={{ marginTop: "20px",marginBottom:"0" }} >
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
                                {showPhone ? <span className='mt-2' >'Use Email'</span> : <span className='!mt-3' >Use Phone  Number </span>}
                            </button>
                        </div>
                    </Form.Item>



                    <Form.Item style={{ marginTop: "20px",marginBottom:"0" }}>
                        <Input.Password
                            size="large"
                            placeholder="Password"
                            prefix={<LockOutlined />}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="rounded-xl custom-placeholder  "
                            style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }}
                        />
                    </Form.Item>

                    <div className='flex flex-col items-start lg:flex-row lg:items-center justify-between lg:my-9 my-3 ' >
                        <div>
                            <Form.Item style={{marginBottom:"0"}} >
                                <Checkbox value="Remember me" >
                                    <span className=' lg:text-xl font-degular ' >Remember me</span>
                                </Checkbox>
                            </Form.Item>
                        </div>
                        <div className='' >
                            <Form.Item style={{marginBottom:"0"}} >
                                <Link className={` block lg:text-xl font-degular text-black hover:text-black `} to={`/email-verify`}>Forgot password ?</Link>
                            </Form.Item>
                        </div>
                    </div>





                    <Form.Item style={{ marginBottom: 0 }} >
                        <Button
                            block
                            size="large"
                            htmlType="submit"
                            className="border-none bg-bgColor hover:bg-bgColor text-black font-medium font-degular text-xl h-12 "
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center mt-6 text-[#000000] font-degular lg:text-xl ">
                    Don’t have an account?{' '}
                    <Link to="/login" className="text-[#0063E5] underline">
                        <span>Register Here</span>
                    </Link>
                </p>
            </div>

            {/* Right Side - Image */}
            <div className=" lg:ml-[10%] ">
                <img
                    src="/images/registration/regImg.png"
                    alt="Registration Illustration"
                    className="object-cover rounded-xl lg:h-[422px] mt-4 lg:mt-0 block mx-auto  "
                />
            </div>
        </div>
    );
};

export default LoginFrom;
