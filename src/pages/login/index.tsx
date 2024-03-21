import HttpsIcon from "@mui/icons-material/Https";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MatoGrossoImg from "../../assets/mato-grosso-background.jpeg";
import SedecBanner from "../../assets/sedecbanner.png";
import PasswordTextField from "../../components/passwordTextField";
import "../../global.scss";
import "./login.scss";

function Login() {
	return (
		<div className="container">
			<div className="div-image">
				<img
					className="login-image"
					src={MatoGrossoImg}
					alt="paisagem de parque"
				/>
			</div>
			<div className="div-form">
				<div className="login-form-container">
					<img
						className="sedec-banner"
						src={SedecBanner}
						alt="sedec banner"
					/>
					<form action="" className="login-form">
						<TextField
							id="user"
							label="Usuário"
							variant="outlined"
							required
							error={true}
						/>
						<PasswordTextField />

						<div className="forgot-pass-div">
							<HttpsIcon />
							<a href="#">Esqueci minha senha</a>
						</div>

						<Button
							type="button"
							variant="contained"
							className="login-button"
						>
							Acessar
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
