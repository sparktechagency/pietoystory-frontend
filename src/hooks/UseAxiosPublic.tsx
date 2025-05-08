import axios from "axios";
const axiosPublic = axios.create({

    // baseURL: 'http://localhost:3000'

    baseURL: 'http://10.0.80.16:8000/api'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic; 