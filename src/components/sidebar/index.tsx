import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SedecBanner from "../../assets/sedecbanner.png";
import "./styles.scss";

export default function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div id="sidebar">
				<img
					className="sedec-banner"
					src={SedecBanner}
					alt="sedec banner"
				/>
				{!(location.pathname === "/beneficiario") && (
					<Button
						type="button"
						variant="contained"
						className="logout-button"
						onClick={() => handleClickOpen()}
					>
						Sair
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
								navigate("/beneficiario");
								handleClose();
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
