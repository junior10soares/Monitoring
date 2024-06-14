import { Formik, FormikErrors, FormikValues } from "formik";
import { stepType } from "stepsType";
import Form from "./form";
import { inputs } from "./inputs";

export default function ({ setStep }: stepType) {
	const validate = (values: FormikValues) => {
		const errors: FormikErrors<FormikValues> = {};
		return errors;
	};
	return (
		<Formik
			initialValues={inputs}
			validate={validate}
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
