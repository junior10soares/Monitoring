import { TextField } from "@mui/material";
import { CustomTextFieldProps } from "customTexteFieldProps";
import styles from "./customTextField.module.scss";

export default function CustomTextField({
	id,
	label,
	formik,
	value,
	onChange,
	required = false,
	col,
	...rest
}: CustomTextFieldProps) {
	const error = formik.errors[id] as string | undefined;
	return (
		<div className={`col${col} ${styles.customTextFieldContainer}`}>
			<TextField
				id={id}
				label={label}
				error={!!error}
				value={formik.values[id]}
				onChange={(ev) =>
					typeof onChange === "function"
						? onChange(ev)
						: formik.handleChange(ev)
				}
				required={required}
				variant="outlined"
				className="col12"
				{...rest}
			/>
			{!!formik.errors[id] && (
				<span className={styles.error}>{error}</span>
			)}
		</div>
	);
}
