import { Button } from "@mui/material";
import SedecBanner from "../../assets/sedecbanner.png";
import "./styles.scss";

export default function Sidebar() {
	return (
		<>
			<div id="sidebar">
				<img
					className="sedec-banner"
					src={SedecBanner}
					alt="sedec banner"
				/>
				<Button
					type="button"
					variant="contained"
					className="logout-button"
				>
					Sair
				</Button>
			</div>
		</>
	);
}
