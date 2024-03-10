import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { getToken } from "../../services/mtiAuth";
import { isEmpty } from "../../utils/Global";

function Root() {
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState(
		localStorage.getItem("access_token") ?? "",
	);
	const navigate = useNavigate();

	useEffect(() => {
		(async function fetchToken() {
			if (token) {
				navigate("/beneficiario");
			}
			const params = new Proxy(
				new URLSearchParams(window.location.search),
				{
					get: (searchParams, prop) => searchParams.get(prop),
				},
			);
			const code = params.code;
			if (code) {
				const tokenres = await getToken(params.code);
				if (tokenres.access_token) {
					localStorage.setItem("access_token", tokenres.access_token);
					setToken(tokenres.access_token);
					navigate("/beneficiario");
				}
			}
		})();
	}, []);

	return (
		<div style={{ maxWidth: "100vw" }}>
			{isLoading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						position: "fixed",
						width: "100%",
						height: "100%",
						backgroundColor: "#c4c4c4d1",
						zIndex: 10000,
					}}
				>
					<CircularProgress />
				</Box>
			)}
			<Sidebar />
			{isEmpty(token) ? (
				<a href="https://dev.login.mt.gov.br/auth/realms/mt-realm/protocol/openid-connect/auth?client_id=projeto-template-integracao&redirect_uri=http://localhost:3000&response_type=code">
					sign in
				</a>
			) : (
				<Outlet context={[isLoading, setIsLoading]} />
			)}
		</div>
	);
}

export default Root;
