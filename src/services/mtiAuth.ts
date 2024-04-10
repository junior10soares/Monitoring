import { axiosInstance } from "./axios";

async function getToken(code: string) {
	const params = {
		grant_type: "authorization_code",
		client_id: "sistema-sedec-simbef",
		code: code,
		redirect_uri: "http://localhost:3000",
	};
	const res = await axiosInstance.post(
		`${
			import.meta.env.VITE_MTI_LOGIN_URL
		}/realms/mt-realm/protocol/openid-connect/token`,
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
