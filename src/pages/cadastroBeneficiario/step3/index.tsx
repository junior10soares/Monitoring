import { Formik, FormikErrors, FormikValues } from "formik";
import { stepType } from "stepsType";
import { monthsData } from "../../../utils/DateTime";
import { isEmpty } from "../../../utils/Global";
import Form from "./form";
import { inputs } from "./inputs";

export default function ({ setStep, setSubsToExclude }: stepType) {
	const validate = (values: FormikValues, setErrors: Function): boolean => {
		var dirty = false;
		const errors: FormikErrors<FormikValues> = {};
		const fieldsToValid = [
			"incentivoFiscal",
			"submodulo",
			"vendaAnualInterestadual",
			"vendaAnualInterna",
			"valoresFundo",
		];

		values.submodulos.forEach((submodulo: any, index: number) => {
			fieldsToValid.forEach((field) => {
				if (isEmpty(submodulo[field])) {
					errors[
						"submodulo"
					] = `Existem campos obrigatórios não preenchidos no submódulo ${
						index + 1
					}`;
					dirty = true;
				}
			});
			if (submodulo.valoresFundo) {
				submodulo.valoresFundo.forEach((valoresFundo) => {
					monthsData.forEach((monthData) => {
						if (isEmpty(valoresFundo[`${monthData.codigo}Valor`])) {
							errors[
								"submodulo"
							] = `Existem campos obrigatórios não preenchidos no submódulo ${
								index + 1
							}`;
							dirty = true;
						}
					});
				});
			}
		});

		setErrors(errors);
		return !dirty;
	};
	return (
		<Formik
			initialValues={inputs}
			onSubmit={(values, { setErrors, setSubmitting }) => {
				if (validate(values, setErrors)) {
					localStorage.setItem("step3", JSON.stringify(values));
					setTimeout(() => {
						setSubmitting(false);
						setStep(4);
					}, 400);
				}
			}}
		>
			{(formik) => (
				<Form
					setSubsToExclude={setSubsToExclude}
					setStep={setStep}
					formik={formik}
				/>
			)}
		</Formik>
	);
}
