import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { getToken } from "../../services/mtiAuth";
import { isEmpty } from "../../utils/Global";
import styles from "./rootpage.module.scss";

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
			if (code && !token) {
				const tokenres = await getToken(params.code);
				if (tokenres.access_token) {
					localStorage.setItem("access_token", tokenres.access_token);
					setToken(tokenres.access_token);
					navigate("/beneficiario");
				}
			}
			return code;
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
				<div className={styles.loginDiv}>
					<h1>Você está deslogado, faça o login para prosseguir!</h1>
					<Button
						className={styles.loginBtn}
						type="button"
						variant="contained"
					>
						<a
							className={styles.loginButton}
							href={`${
								import.meta.env.VITE_MTI_LOGIN_URL
							}/realms/mt-realm/protocol/openid-connect/auth?client_id=${
								import.meta.env.VITE_MTI_LOGIN_CLIENT_ID
							}&redirect_uri=${
								import.meta.env.VITE_MTI_LOGIN_REDIREC_URL
							}&response_type=code`}
						>
							Entrar
						</a>
					</Button>
				</div>
			) : (
				<Outlet context={[isLoading, setIsLoading]} />
			)}
		</div>
	);
}

export default Root;
