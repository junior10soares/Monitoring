import { axiosInstance } from "./axios";

async function getToken(code: string) {
	const params = {
		grant_type: "authorization_code",
		client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
		code: code,
		redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
	};
	const res = await axiosInstance.post(
		import.meta.env.VITE_AUTH_URL,
		params,
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		},
	);
	return res.data;
}

export { getToken };
