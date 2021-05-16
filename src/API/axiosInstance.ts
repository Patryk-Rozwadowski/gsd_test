import axios from "axios";

const axiosParams = {
	baseURL: "https://api.github.com",
};

const axiosInstance = axios.create(axiosParams);

export { axiosInstance };
