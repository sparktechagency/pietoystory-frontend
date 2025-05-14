import React, { useEffect, useState } from 'react';
import Footer from '../../../components/client/footer/Footer';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { message } from 'antd';

const Profile: React.FC = () => {
    const [userLoginType, setUserLoginType] = useState({ login_type: "" });
    const axiosPublic = useAxiosPublic();
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [profileImage, setProfileImage] = useState<string>("/images/defaultIMg/defaultImage.png"); // Default image initially
    const [avatar, setAvatar] = useState<File | null>(null); // Store selected image file
    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        home_address: "",
        city: "",
        state: "",
        avatar: "",
        dog_names: [""],
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await axiosPublic.get(`/profile`, config);
                setUserLoginType(res.data.data);

                const {
                    full_name,
                    email,
                    phone_number,
                    home_address,
                    city,
                    state,
                    dog_names,
                    avatar,
                } = res.data?.data;

                setFormData({
                    full_name,
                    email,
                    phone_number,
                    home_address,
                    city,
                    state,
                    avatar,
                    dog_names: Array.isArray(dog_names) ? dog_names : [],
                });

                // Set the avatar image if available, otherwise keep default
                if (avatar) {
                    setProfileImage(avatar); // Update profile image if available
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.includes("image")) {
                setProfileImage(URL.createObjectURL(file)); // Preview the uploaded image
                setAvatar(file); // Save the uploaded image file
            } else {
                alert("Please upload a valid image file (jpeg, png, jpg, gif).");
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDogNameChange = (index: number, value: string) => {
        const updatedDogNames = [...formData.dog_names];
        updatedDogNames[index] = value;
        setFormData((prevState) => ({
            ...prevState,
            dog_names: updatedDogNames,
        }));
    };

    const handleAddDog = () => {
        setFormData((prevState) => ({
            ...prevState,
            dog_names: [...prevState.dog_names, ""],
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append("full_name", formData.full_name);
        form.append("email", formData.email);
        form.append("phone_number", formData.phone_number);
        form.append("home_address", formData.home_address);
        form.append("city", formData.city);
        form.append("state", formData.state);

        formData.dog_names.forEach((dog, index) => {
            form.append(`dog_names[${index}]`, dog);
        });

        // If an image was uploaded, append it to the form data
        if (avatar) {
            form.append("avatar", avatar); // Send the new image if uploaded
        } else if (profileImage !== "/images/defaultIMg/defaultImage.png") {
            form.append("avatar", profileImage); // Keep the previous image if no new image uploaded
        }

        try {
            setLoading(true);
            const response = await axiosPublic.post("/update-profile", form, config);
            if(response){
                return message.success(`Profile update successfully`)
            }
        } catch (error: any) {
            return message.error("Profile update fail")
            // return message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="bg-[#f6f6f6] px-4 lg:px-0">
            <div className="max-w-[1519px] mx-auto">
                <div className="flex justify-between items-center pt-11">
                    <div className="flex items-center gap-5">
                        <Link to={"/"}><div className="w-[55px] h-[53px] bg-white rounded-full flex items-center justify-center">
                            <span><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.414 7.914H3.828L8.328 12.414L6.914 13.828L0 6.914L6.914 3.8147e-06L8.328 1.414L3.828 5.914H15.414V7.914Z" fill="black" />
                            </svg>
                            </span>
                        </div></Link>
                        <div>
                            <h1 className="text-3xl font-degular text-textColor">My Profile</h1>
                        </div>
                    </div>
                    <Link to={"/history"}><div className="w-[55px] h-[53px] bg-white rounded-full flex items-center justify-center">
                        <Link to={"/history"}>
                            <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6905 5.55554H12.0476V11.1111L16.7352 13.9333L17.5238 12.5888L13.6905 10.2777V5.55554ZM13.1429 0C10.5286 0 8.02138 1.05356 6.1728 2.92892C4.32423 4.80428 3.28571 7.34781 3.28571 9.99996H0L4.33714 14.4777L8.7619 9.99996H5.47619C5.47619 7.93718 6.28393 5.95888 7.72171 4.50026C9.15948 3.04165 11.1095 2.22221 13.1429 2.22221C15.1762 2.22221 17.1262 3.04165 18.564 4.50026C20.0018 5.95888 20.8095 7.93718 20.8095 9.99996C20.8095 12.0628 20.0018 14.0411 18.564 15.4997C17.1262 16.9583 15.1762 17.7777 13.1429 17.7777C11.029 17.7777 9.11238 16.8999 7.73238 15.4888L6.17714 17.0666C7.08795 18.0004 8.17304 18.7408 9.36903 19.2444C10.565 19.7481 11.8479 20.0049 13.1429 19.9999C15.7571 19.9999 18.2643 18.9464 20.1129 17.071C21.9615 15.1957 23 12.6521 23 9.99996C23 7.34781 21.9615 4.80428 20.1129 2.92892C18.2643 1.05356 15.7571 0 13.1429 0Z" fill="black" />
                            </svg>

                        </Link>
                    </div></Link>
                </div>

                {/* Profile Image & Info */}
                <div className="max-w-[1006px] mx-auto pb-10 lg:pb-[76px] mt-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col items-center bg-white mb-6 py-11 rounded-[20px]">
                            <div className="relative">
                                <img
                                    src={profileImage || "/images/defaultIMg/defaultImage.png"} // Show uploaded image or default if none
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div
                                    className="absolute bottom-0 -right-2 cursor-pointer text-lg"
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                >
                                    📸
                                </div>

                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <h2 className="text-xl font-semibold mt-1">{formData.full_name}</h2>
                            <p className="text-textColor text-lg font-degular">{formData.email}</p>
                        </div>


                        {/* Name Field */}
                        <fieldset className="border border-gray-300 rounded-[20px] px-8 pt-1 pb-3">
                            <legend className="text-sm text-textColor font-degular">Name</legend>
                            <input
                                type="text"
                                name="full_name" // Make sure to use 'full_name' since it's in the state
                                className="w-full hover:outline-none hover:ring-0 bg-[#f6f6f6] focus:outline-none p-2 rounded-md"
                                value={formData.full_name}
                                onChange={handleInputChange}
                            />
                        </fieldset>

                        <fieldset className="border border-gray-300 rounded-[20px] px-8 pt-1 pb-3">
                            <legend className="text-sm text-textColor font-degular">Email</legend>
                            <input
                                type="email"
                                name="email"
                                className="w-full hover:outline-none hover:ring-0  bg-[#f6f6f6]  focus:outline-none  p-2 rounded-md"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={userLoginType.login_type === "email"}
                            />
                        </fieldset>

                        <fieldset className="border border-gray-300 rounded-[20px] px-8 pt-1 pb-3">
                            <legend className="text-sm text-textColor font-degular">Number</legend>
                            <input
                                type="tel"
                                name="phone_number"
                                className="w-full hover:outline-none hover:ring-0  bg-[#f6f6f6]  focus:outline-none  p-2 rounded-md"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                disabled={userLoginType.login_type === "phone_number"}
                            />
                        </fieldset>

                        <fieldset className="border border-gray-300 rounded-[20px] px-8 pt-1 pb-3">
                            <legend className="text-sm text-textColor font-degular">Home Address</legend>
                            <input
                                type="text"
                                name="home_address"
                                className="w-full hover:outline-none hover:ring-0  bg-[#f6f6f6]  focus:outline-none  p-2 rounded-md"
                                value={formData.home_address}
                                onChange={handleInputChange}
                            />
                        </fieldset>

                        <fieldset className="border border-gray-300 rounded-[20px] px-8 pt-1 pb-3">
                            <legend className="text-sm text-textColor font-degular">City</legend>
                            <input
                                type="text"
                                name="city"
                                className="w-full hover:outline-none hover:ring-0  bg-[#f6f6f6]  focus:outline-none  p-2 rounded-md"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </fieldset>

                        <fieldset className="border border-gray-3z00 rounded-[20px] px-8 pt-1 pb-3">
                            <legend className="text-sm text-textColor font-degular">State</legend>
                            <input
                                type="text"
                                name="state"
                                className="w-full hover:outline-none hover:ring-0  bg-[#f6f6f6]  focus:outline-none  p-2 rounded-md"
                                value={formData.state}
                                onChange={handleInputChange}
                            />
                        </fieldset>

                        {/* Dog Names */}
                        {formData.dog_names.map((dog, index) => (
                            <fieldset className="border border-gray-300 rounded-[20px] px-8 pt-1 pb-3" >
                                <legend className="text-sm text-textColor font-degular">Dog name {index + 1} </legend>
                                <input
                                    key={index}
                                    type="text"
                                    value={dog}
                                    placeholder={`Dog Name ${index + 1}`}
                                    onChange={(e) => handleDogNameChange(index, e.target.value)}
                                    className="w-full hover:outline-none hover:ring-0  bg-[#f6f6f6]  focus:outline-none  p-2 rounded-md"
                                />
                            </fieldset>
                        ))}
                        <button type="button" onClick={handleAddDog} className="bg-[#787878] text-white px-4 py-2 rounded-md">
                            + Add Dog Name
                        </button>
                        <div>
                            <button
                                className='py-[18px] px-11 border bg-[#787878] rounded-[20px] w-[22%] text-white font-degular font-medium text-lg block mx-auto flex items-center justify-center gap-2'
                                type='submit'
                                disabled={loading} // Disable the button when loading
                            >
                                {loading ? (
                                    <span className="loader border-white border-t-transparent border-2 w-5 h-5 rounded-full animate-spin"></span>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
