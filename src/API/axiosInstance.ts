import axios from "axios";

const axiosParams = {
	baseURL: process.env.REACT_APP_GH,
};

const axiosInstance = axios.create(axiosParams);

export { axiosInstance };
