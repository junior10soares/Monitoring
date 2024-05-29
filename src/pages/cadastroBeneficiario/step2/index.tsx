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
				const investimentoAcumulado = parseFloat(_values.investimentoAcumulado);
				const totalInvestimentoMensal = Object.values(_values.investimentoMensal).reduce((acc, curr) => {
					const valorNumerico = parseFloat(curr.valor);
					return acc + valorNumerico;
				}, 0);

				if (investimentoAcumulado < totalInvestimentoMensal) {
					errors.investimentoAcumulado = "O valor acumulado não pode ser menor que o investimento anual.";
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