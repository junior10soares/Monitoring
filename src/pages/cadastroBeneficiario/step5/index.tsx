import { Alert } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { stepType } from "stepsType";
import { insertBeneficiario } from "../../../services/beneficiario";
import Form from "./form";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

export default function ({ setStep }: stepType) {
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useOutletContext();

	const navigate = useNavigate();
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
				validate={(_values) => {
					const errors = {};
					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					const step1 = JSON.parse(
						localStorage.getItem("step1") ?? "",
					);
					const step2 = JSON.parse(
						localStorage.getItem("step2") ?? "",
					);
					const step3 = JSON.parse(
						localStorage.getItem("step3") ?? "",
					);
					const step4 = JSON.parse(
						localStorage.getItem("step4") ?? "",
					);
					setIsLoading(true);
					const res = await insertBeneficiario({
						...step1,
						...step2,
						...step3,
						...step4,
					});
					if (res.success) {
						setShow(true);
						for (let index = 0; index < 5; index++) {
							localStorage.removeItem(`step${index + 1}`);
						}
						setTimeout(() => {
							setSubmitting(false);
							setShow(false);
							navigate("/beneficiario");
						}, 1000);
					}
					setIsLoading(false);
				}}
			>
				{(formik) => <Form setStep={setStep} formik={formik} />}
			</Formik>
		</>
	);
}
