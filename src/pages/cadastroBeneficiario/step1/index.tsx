import { Formik } from "formik";
import { stepType } from "stepsType";
import { Messages } from "../../../../src/utils/Messages";
import Form from "./form";
import { inputs } from "./inputs";

export default function ({ setStep }: stepType) {
	return (
		<Formik
			initialValues={inputs}
			validate={(_values) => {
				const errors: any = {};
				if (!_values.nomeOuRazaoSocial) {
					errors.nomeOuRazaoSocial = Messages.form.required;
				} else if (_values.cnaes.length === 0) {
					errors.cnaes = Messages.form.arrayRequired;
				} else if (!_values.cpfOuCnpj) {
					errors.cpfOuCnpj = Messages.form.required;
				} else if (!_values.descricao) {
					errors.descricao = Messages.form.required;
				} else if (!_values.email) {
					errors.email = Messages.form.required;
				} else if (!_values.inscricaoEstadual) {
					errors.inscricaoEstadual = Messages.form.required;
				} else if (!_values.municipio) {
					errors.municipio = Messages.form.required;
				} else if (!_values.nomeAdministrador) {
					errors.nomeAdministrador = Messages.form.required;
				} else if (!_values.nomeFantasia) {
					errors.nomeFantasia = Messages.form.required;
				} else if (!_values.nomeOuRazaoSocial) {
					errors.nomeOuRazaoSocial = Messages.form.required;
				} else if (!_values.porte) {
					errors.porte = Messages.form.required;
				} else if (!_values.ramoAtividade) {
					errors.ramoAtividade = Messages.form.required;
				} else if (!_values.telefoneAdministrador) {
					errors.telefoneAdministrador = Messages.form.required;
				} else if (!_values.telefoneContabilidade) {
					errors.telefoneContabilidade = Messages.form.required;
				} else if (!_values.telefoneEmpresa) {
					errors.telefoneEmpresa = Messages.form.required;
				} else if (
					_values.telefones.length === 0 ||
					!_values.telefones[0].titulo
				) {
					errors.telefones = Messages.form.arrayRequired;
				}
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				localStorage.setItem("step1", JSON.stringify(values));
				setTimeout(() => {
					setSubmitting(false);
					setStep(2);
				}, 400);
			}}
		>
			{(formik) => <Form setStep={setStep} formik={formik} />}
		</Formik>
	);
}
