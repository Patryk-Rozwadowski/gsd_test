import axios from "axios";

const axiosParams = {
	baseURL: process.env.REACT_APP_GH,
	headers: {
		authorization: `token ${process.env.REACT_APP_TOKEN}`,
	},
};

const axiosInstance = axios.create(axiosParams);

export { axiosInstance };
