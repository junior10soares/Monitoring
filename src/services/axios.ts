import axios, { InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:8085/api",
	headers: {
		common: {
			Authorization: `Bearer ${localStorage.getItem("access_token")}`,
		},
	},
});

// Interceptors
axiosInstance.interceptors.request.use(
	(config): InternalAxiosRequestConfig => {
		return config;
	},
	(error): any => {
		console.log(error);
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	async (response): Promise<any> => {
		return response;
	},
	async (error): Promise<any> => {
		console.log(error);
		return Promise.reject(error);
	},
);
