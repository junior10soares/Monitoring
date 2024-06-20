import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SedecBanner from "../../assets/sedecbanner.png";
import "./styles.scss";

export default function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;
	const isView = pathname?.includes("/view");
	const [open, setOpen] = useState(false);

	useEffect(() => {
		for (let index = 0; index < 5; index++) {
			localStorage.removeItem(`step${index + 1}`);
		}
	}, []);

	const handleClickOpen = () => {
		if (isView) {
			handleLogout();
		} else {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		for (let index = 0; index < 5; index++) {
			localStorage.removeItem(`step${index + 1}`);
			localStorage.removeItem("access_token");
		}
		navigate("/beneficiario");
	};

	return (
		<>
			<div id="sidebar">
				<img
					className="sedec-banner"
					src={SedecBanner}
					alt="sedec banner"
				/>

				{pathname.includes("beneficiario") && (
					<Button
						type="button"
						variant="contained"
						className="logout-button"
						onClick={
							pathname === "/beneficiario"
								? handleClickOpen
								: () => navigate("/beneficiario")
						}
					>
						{pathname === "/beneficiario" ? "Sair" : "Voltar"}
					</Button>
				)}

				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Confirmação"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Deseja mesmo sair sem salvar o formulário?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Não</Button>
						<Button
							onClick={() => {
								handleLogout();
								handleClose();
								window.location.replace(
									`${
										import.meta.env.VITE_MTI_LOGIN_URL
									}/realms/mt-realm/protocol/openid-connect/logout?client_id=${
										import.meta.env.VITE_MTI_LOGIN_CLIENT_ID
									}&redirect_uri=${
										import.meta.env
											.VITE_MTI_LOGIN_REDIREC_URL
									}&response_type=code`,
								);
							}}
							autoFocus
						>
							Sim
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
}
