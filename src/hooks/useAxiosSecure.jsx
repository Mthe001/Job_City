import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});


const useAxiosSecure = () => {

    return axiosInstance;

};

export default useAxiosSecure;