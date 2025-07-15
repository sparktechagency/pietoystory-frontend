import { Button, Checkbox, Drawer, Form, Input } from "antd";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  MenuOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, {  useState } from "react";
import {
  loginApiPayloadType,
  loginApiResponseType,
} from "../../../type/loginTypes";

import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";


const LoginFrom: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // const locattion = useLocation()

  // locattion.state?.pathname

  const [form] = Form.useForm();
  const [showPhone, setShowPhone] = useState(false);

  let handleSubmit = async (values: loginApiPayloadType) => {
    try {
      setLoading(true);
      let res = await axiosPublic.post<loginApiResponseType>(`/login`, values);
      if (res.status === 200) {
        localStorage.setItem(`token`, res.data?.token);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 10500,
        });
        navigate("/");
        form.resetFields();
        window.document.location.reload();
        return;
      }
    } catch (error: any) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login fail",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };







  return (
    <>

      <div className=" bg-[#f6f6f6] ">
        <div className="flex flex-col lg:flex-row max-w-[1519px]  mx-auto pt-32 lg:pt-20 lg:px-0 px-4  lg:gap-x-20">
          {/* Left Side - Form */}
          <div className="w-full max-w-[748px]">
            <h2 className="lg:text-3xl text-xl font-bold text-black mb-6">
              Login To Your Account
            </h2>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{ marginTop: "8px" }}
            >
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

              <Form.Item
                name={"password"}
                required
                rules={[
                  {
                    required: true,
                    message: "Enter your password.",
                  },
                ]}
                style={{ marginTop: "20px", marginBottom: "0" }}
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="rounded-xl custom-placeholder  "
                  style={{
                    padding: "14px 20px",
                    outline: "none",
                    border: `1px solid #00000033`,
                  }}
                />
              </Form.Item>

              <div className="flex flex-col items-center lg:flex-row lg:items-center justify-between lg:my-9 my-3 ">
                <Form.Item
                  // name="remember"
                  // required
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Remember me",
                  //   },
                  // ]}
                  // valuePropName="checked"
                >
                  <Checkbox
                    style={{ color: "#000000" }}
                    className=" text-[#000000] font-degular font-medium lg:text-xl "
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>

                <div className=" -mt-5 ">
                  <Link
                    to={"/email-verify"}
                    className=" text-[#000000] font-degular font-medium lg:text-xl "
                  >
                    Forgot password ?
                  </Link>
                </div>
              </div>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  block
                  disabled={loading}
                  loading={loading}
                  size="large"
                  htmlType="submit"
                  className="border-none bg-bgColor hover:bg-bgColor text-black font-medium font-degular text-xl h-12  "
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <p className="text-center mt-6 text-[#000000] font-degular lg:text-xl lg:pb-20 ">
              Don’t have an account?{" "}
              <Link to="/create-account" className="text-[#0063E5] underline">
                <span>Register Here</span>
              </Link>
            </p>
          </div>

          {/* Right Side - Image */}
          <div className=" lg:ml-[10%] ">
            <img
              src="/images/registration/regImg.png"
              alt="Registration Illustration"
              className="object-cover rounded-xl lg:h-[422px] h-[200px] mt-4 lg:mt-0 block mx-auto  "
            />
          </div>
        </div>
        <Toaster position="top-center" />
      </div>


    </>
  );
};

export default LoginFrom;
