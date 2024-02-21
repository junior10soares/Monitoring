import { FormikProps } from "formik";

export type CustomTextFieldProps = {
	id: string;
	label?: string | undefined;
	value: any;
	formik: FormikProps<any>;
	onChange?: Function | null;
	required?: boolean | undefined;
	col: number;
	[key: string]: any;
};
