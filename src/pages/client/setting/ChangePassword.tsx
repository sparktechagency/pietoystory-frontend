import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { MdLockOutline } from 'react-icons/md';

const ChangePassword: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Password Change Values:', values);
        // handle password change logic here
    };

    return (
        <div className=' bg-[#f6f6f6] ' >
            <div className="max-w-[1519px] mx-auto">
                <div className='flex items-center gap-[22px] ' >
                    <div className=' w-[55px] h-[55px] rounded-full bg-white flex items-center justify-center  ' >
                        <Link to={"/"}><span>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                            </svg>

                        </span></Link>
                    </div>
                    <div>
                        <h1 className=' lg:text-3xl font-degular font-medium  text-textColor ' >Change Password</h1>
                    </div>

                </div>


                <div className=' max-w-[1054px]  mx-auto ' >
                    <h2 className="text-4xl font-semibold mt-[71px] text-textColor font-degular ">Change Password</h2>
                    <p className=' text-xl font-degular text-textColor mt-1.5 mb-7 ' >Password must contain 8 characters.</p>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label=""
                            name="currentPassword"
                            rules={[{ required: true, message: 'Please enter your current password' }]}
                        >
                            <Input.Password prefix={<MdLockOutline />} style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }} className=' placeholder:text-2xl ' placeholder='Current Password' />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            rules={[{ required: true, message: 'Please enter your new password' }]}
                            
                        >
                            <Input.Password placeholder='New Password' style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }} prefix={<MdLockOutline />}  />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Please confirm your new password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password style={{ padding: "14px 20px", outline: "none", border: `1px solid #00000033` }} prefix={<MdLockOutline />} placeholder='Confirm password' />
                        </Form.Item>

                        <Form.Item>
                            <Button className=' bg-bgColor border-none font-degular text-xl text-textColor rounded-[20px] h-14 ' htmlType="submit" block>
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
