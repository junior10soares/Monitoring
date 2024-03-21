import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./passwordTextField.scss";

function PasswordTextField() {
	const [showPass, setShowPass] = useState(false);
	return (
		<div className="password-input-container">
			{!showPass ? (
				<TextField
					className="password-field"
					id="password"
					label="Senha"
					variant="outlined"
					type="password"
					required
				/>
			) : (
				<TextField
					className="password-field"
					id="password"
					label="Senha"
					variant="outlined"
					required
				/>
			)}

			<div className="eye-icon-div">
				{showPass ? (
					<VisibilityOffIcon
						className="pass-icon"
						onClick={() => {
							setShowPass(!showPass);
						}}
					/>
				) : (
					<RemoveRedEyeIcon
						className="pass-icon"
						onClick={() => {
							setShowPass(!showPass);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default PasswordTextField;
