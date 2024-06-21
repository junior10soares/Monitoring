import { Alert } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { stepType } from "stepsType";
import Form from "./form";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

export default function ({ setStep, submitForm }: stepType) {
	const [show, setShow] = useState(false);

	return (
		<>
			{show && (
				<Alert
					variant="filled"
					className={styles.alert}
					severity="success"
				>
					Registro salvo com sucesso.
				</Alert>
			)}
			<Formik
				initialValues={inputs}
				enableReinitialize
				validate={(_values) => {
					const errors = {};
					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					submitForm(values, setShow, setSubmitting);
				}}
			>
				{(formik) => <Form setStep={setStep} formik={formik} />}
			</Formik>
		</>
	);
}
