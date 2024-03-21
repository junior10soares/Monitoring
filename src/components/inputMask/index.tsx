import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { CustomTextFieldProps } from "customTexteFieldProps";
import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";
import styles from "./inputMask.module.scss";

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
	mascara: string;
	secondMask: string;
	definitions: {};
}

const InputCustomMask = forwardRef<HTMLInputElement, CustomProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, name, mascara, secondMask, definitions, ...other } =
			props;
		const [mask, setMask] = useState(mascara);
		return (
			<IMaskInput
				mask={mask}
				definitions={definitions}
				onAccept={(value: any) => {
					onChange({ target: { name: name, value } });
				}}
				onKeyDownCapture={(ev) => {
					if (
						ev.target.value.length === mascara.length &&
						secondMask &&
						ev.key !== "Backspace"
					) {
						setMask(secondMask);
					} else if (
						ev.target.value.length === mascara.length &&
						ev.key === "Backspace"
					) {
						setMask(mascara);
					}
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
	secondMask,
	definitions,
	col,
	maks,
	error,
	...rest
}: CustomTextFieldProps) {
	const errors = formik.errors[id] as string | undefined;

	return (
		<div className={`col${col} ${styles.customTextFieldContainer}`}>
			<FormControl fullWidth variant="outlined">
				<InputLabel
					error={error || !!errors}
					required={required}
					htmlFor={id}
				>
					{label}
				</InputLabel>
				<OutlinedInput
					value={value ?? formik.values[id]}
					onChange={(ev) => {
						typeof onChange === "function"
							? onChange(ev)
							: formik.handleChange(ev);
					}}
					error={error || !!errors}
					fullWidth
					name={id}
					label={label}
					inputProps={{
						mascara: mascara,
						definitions: definitions,
						secondMask: secondMask,
					}}
					id="formatted-text-mask-input"
					inputComponent={InputCustomMask as any}
					{...rest}
				/>
				{!!formik.errors[id] && (
					<span className={styles.error}>{errors}</span>
				)}
			</FormControl>
		</div>
	);
}
