import { Formik, FormikErrors, FormikValues } from "formik";
import { stepType } from "stepsType";
import { isEmpty } from "../../../utils/Global";
import Form from "./form";
import { inputs } from "./inputs";

export default function ({ setStep, submitForm, handleVoltar }: stepType) {
	const validate = (values: FormikValues, setErrors: Function): boolean => {
		var dirty = false;
		const errors: FormikErrors<FormikValues> = {};
		const fieldsToValid = [
			"ncm",
			"produtoIncentivado",
			"quantidadeInterestadual",
			"quantidadeInterna",
			"unidadeMedida",
		];

		values.infoVendas.forEach((submodulo: any, index: number) => {
			fieldsToValid.forEach((field) => {
				if (isEmpty(submodulo[field])) {
					errors[
						"infoVendas"
					] = `Existem campos obrigatórios não preenchidos na ${
						index + 1
					}˚ linha`;
					dirty = true;
				}
			});
		});

		setErrors(errors);
		return !dirty;
	};
	return (
		<Formik
			initialValues={inputs}
			validate={(_values) => {
				const errors: any = {};
				return errors;
			}}
			onSubmit={(values, { setSubmitting, setErrors }) => {
				if (validate(values, setErrors)) {
					localStorage.setItem("step4", JSON.stringify(values));
					setTimeout(() => {
						setSubmitting(false);
						setStep(5);
					}, 400);
				}
			}}
		>
			{(formik) => (
				<Form
					setStep={setStep}
					formik={formik}
					submitForm={submitForm}
					handleVoltar={handleVoltar}
				/>
			)}
		</Formik>
	);
}
