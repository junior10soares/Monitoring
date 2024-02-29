import { Formik } from "formik";
import { stepType } from "stepsType";
import { Messages } from "../../../utils/Messages";
import Form from "./form";
import { inputs } from "./inputs";

export default function ({ setStep }: stepType) {
	return (
		<Formik
			initialValues={inputs}
			validate={(_values) => {
				const errors: any = {};
				if (!_values.anoReferencia) {
					errors.anoReferencia = Messages.form.required;
				}
				if (!_values.investimentoAcumulado) {
					errors.investimentoAcumulado = Messages.form.required;
				}
				const meses = Object.keys(_values.investimentoMensal);
				for (let index = 0; index < meses.length; index++) {
					const element = meses[index];
					if (!element) {
						errors.investimentoMensal = Messages.form.required;
					}
				}
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				localStorage.setItem("step2", JSON.stringify(values));
				setTimeout(() => {
					setSubmitting(false);
					setStep(3);
				}, 400);
			}}
		>
			{(formik) => <Form setStep={setStep} formik={formik} />}
		</Formik>
	);
}
