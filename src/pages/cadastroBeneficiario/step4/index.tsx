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
				const lastLine = [..._values.infoVendas].splice(-1)?.[0];
				if (
					lastLine &&
					(!lastLine.ncm ||
						!lastLine.produtoIncentivado ||
						!lastLine.quantidadeInterestadual ||
						!lastLine.quantidadeInterna ||
						!lastLine.unidadeMedida)
				) {
					errors.infoVendas = Messages.form.lastElementIsEmpty;
				}
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				localStorage.setItem("step4", JSON.stringify(values));
				setTimeout(() => {
					setSubmitting(false);
					setStep(5);
				}, 400);
			}}
		>
			{(formik) => <Form setStep={setStep} formik={formik} />}
		</Formik>
	);
}
