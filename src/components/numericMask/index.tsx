import { FormControl, TextField } from "@mui/material";
import { CustomTextFieldProps } from "customTexteFieldProps";
import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import styles from "./inputMask.module.scss";

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
	prefix: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
	function NumericFormatCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<NumericFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
						},
					});
				}}
				thousandSeparator="."
				decimalSeparator=","
				decimalScale={2}
				prefix={other.prefix}
			/>
		);
	},
);

export default function NumericMask({
	id,
	label,
	formik,
	value,
	onChange,
	required = false,
	mascara,
	definitions,
	col,
	maks,
	...rest
}: CustomTextFieldProps) {
	const error = formik.errors[id] as string | undefined;

	return (
		<div className={`col${col} ${styles.customTextFieldContainer}`}>
			<FormControl fullWidth variant="outlined">
				<TextField
					id={id}
					label={label}
					error={!!error}
					value={value ?? formik.values[id]}
					onChange={(ev) =>
						typeof onChange === "function"
							? onChange(ev)
							: formik.handleChange(ev)
					}
					required={required}
					variant="outlined"
					className="col12"
					InputProps={{
						inputComponent: NumericFormatCustom as any,
						inputProps: { prefix: rest.prefix },
					}}
					{...rest}
				/>
				{!!formik.errors[id] && <span>{error}</span>}
			</FormControl>
		</div>
	);
}
