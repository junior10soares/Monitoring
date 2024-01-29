import { Formik } from "formik";
import { stepType } from "stepsType";
import Form from "./form";

export default function ({ setStep }: stepType) {
	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validate={(_values) => {
				const errors = {};
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
		>
			{(formik) => <Form setStep={setStep} formik={formik} />}
		</Formik>
	);
}
