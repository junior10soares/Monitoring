import axios, { InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:8085/api",
	// headers: {
	// 	common: {
	// 		Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5ZzNld1lTWExtSVFZemVrMGJpenl5OGhNVkUzb3NDYkNPY1BsVzZkeEJBIn0.eyJleHAiOjE3MTA4NTE3MTIsImlhdCI6MTcxMDQxOTcxMiwiYXV0aF90aW1lIjoxNzEwNDE5NzExLCJqdGkiOiI0YWNhOTc4Yy1jMWEwLTQ4YmQtOTM4My0yZDg5NjNlYmM3ZjMiLCJpc3MiOiJodHRwczovL2Rldi5sb2dpbi5tdC5nb3YuYnIvYXV0aC9yZWFsbXMvbXQtcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMjQyYWE5YjEtY2FhZC00MWIzLTllNTItYzU2ZTFjZjY3NjQ5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicHJvamV0by10ZW1wbGF0ZS1pbnRlZ3JhY2FvIiwic2Vzc2lvbl9zdGF0ZSI6ImM…YU5hc2NpbWVudG8iOiIxMi8xMi8xOTgwIiwiZmFtaWx5X25hbWUiOiJERSBURVNURSIsIm5vbWVNYWUiOiJNQUUgRE8gVVNVQVJJTyBERSBURVNURSIsImVtYWlsIjoid3N0LTA5QGhvdG1haWwuY29tIn0.m3TH_8BNl2nma3GujDPJb9OZ1VD5N7l6wHK2wVikmqXUhvgr_L9ueN8gmwpByp8HoTvl9DMiC2LV0eBR9bJweqffxl_S_pW1KDumm1mLrQB0C760C8Bc9Kxey_-Q-ThTkDLv1L5fJLWaDuFxUXEhbkwbsU1sPfw6I4bPGFKURqE_PnyLBGv8_hyUZPaXxPmlUxaM6dDmdJHHbimyabMUip0Ee2-dzXXTLI-Z2aFzNe_DZIDUli73nJM1BdetXQFS4h-x1OwoaVsnC1KOYgB7nh2PTMT0lqyKj7ZR6J1NC15UeXYhGltY_O0Q5_l_yLSqdZ_00FG_yluMY4_B5ZeVIA`,
	// 	},
	// },
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
		if (error.response.status === 401) {
			localStorage.removeItem("access_token");
			window.location.replace("/");
		}
		return Promise.reject(error);
	},
);
