import axios from "axios";
const axiosPublic = axios.create({

    // baseURL: 'http://localhost:3000'

    baseURL: 'http://103.186.20.110:9090/api'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic; 