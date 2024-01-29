import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import styles from "./customTextField.module.scss";

type CustomTextFieldProps = {
	id: string;
	label: string | undefined;
	value: any;
	formik: FormikProps<any>;
	onChange: Function;
	required: boolean | undefined;
	col: number;
	[key: string]: any;
};

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
				onChange={formik.handleChange}
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
