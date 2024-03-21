import { Formik } from "formik";
import { stepType } from "stepsType";
import Form from "./form";
import { inputs } from "./inputs";

export default function ({ setStep }: stepType) {
	return (
		<Formik
			initialValues={inputs}
			validate={(_values) => {
				const errors = {};
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				localStorage.setItem("step3", JSON.stringify(values));
				setTimeout(() => {
					setSubmitting(false);
					setStep(4);
				}, 400);
			}}
		>
			{(formik) => <Form setStep={setStep} formik={formik} />}
		</Formik>
	);
}
