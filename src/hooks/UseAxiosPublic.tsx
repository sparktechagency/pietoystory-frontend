import axios from "axios";
const axiosPublic = axios.create({

    // baseURL: 'http://localhost:3000'

    baseURL: 'http://10.10.10.65:8001/api'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic; 