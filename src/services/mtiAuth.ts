import { axiosInstance } from "./axios";

async function getToken(code: string) {
	const params = {
		grant_type: "authorization_code",
		client_id: "projeto-template-integracao",
		code: code,
		redirect_uri: "http://localhost:3000",
	};
	const res = await axiosInstance.post(
		"https://dev.login.mt.gov.br/auth/realms/mt-realm/protocol/openid-connect/token",
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
