import axios, { InternalAxiosRequestConfig } from "axios";

console.log(import.meta.env);

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

// Interceptors
axiosInstance.interceptors.request.use(
	(config): InternalAxiosRequestConfig => {
		if (!config.url?.includes("login")) {
			config.headers.setAuthorization(
				`Bearer ${localStorage.getItem("access_token")}`,
			);
		}

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
		if (error.response?.status === 401) {
			localStorage.removeItem("access_token");
			window.location.replace("/");
		}
		return Promise.reject(error);
	},
);
