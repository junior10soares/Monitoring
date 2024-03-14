import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { CustomTextFieldProps } from "customTexteFieldProps";
import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";
import styles from "./inputMask.module.scss";

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
	mascara: string;
	definitions: {};
}

const InputCustomMask = forwardRef<HTMLInputElement, CustomProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, name, mascara, definitions, ...other } = props;
		const [mascara, setmascara] = useState();
		return (
			<IMaskInput
				mask={mascara}
				definitions={definitions}
				onAccept={(value: any) => {
					onChange({ target: { name: name, value } });
				}}
				onKeyDownCapture={(ev) => {
					console.log(ev);
				}}
				maxLength={20}
				unmask
				inputRef={ref}
				overwrite
				{...other}
			/>
		);
	},
);

export default function InputMask({
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
				<InputLabel required={required} htmlFor={id}>
					{label}
				</InputLabel>
				<OutlinedInput
					value={value ?? formik.values[id]}
					onChange={(ev) => {
						typeof onChange === "function"
							? onChange(ev)
							: formik.handleChange(ev);
					}}
					error={!!error}
					fullWidth
					name={id}
					label={label}
					inputProps={{
						mascara: mascara,
						definitions: definitions,
					}}
					id="formatted-text-mask-input"
					inputComponent={InputCustomMask as any}
					{...rest}
				/>
				{!!formik.errors[id] && (
					<span className={styles.error}>{error}</span>
				)}
			</FormControl>
		</div>
	);
}
