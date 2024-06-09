import { Formik, FormikErrors } from "formik";
import { stepType } from "stepsType";
import { Messages } from "../../../../src/utils/Messages";
import Form from "./form";
import { inputs } from "./inputs";

export default function ({ setStep }: stepType) {
	function validate(_values: {
		nomeOuRazaoSocial: any;
		cpfOuCnpj: any;
		email: any;
		nomeFantasia: any;
		inscricaoEstadual: any;
		nomeAdministrador: any;
		municipio: any;
		porte: any;
		ramoAtividade: any;
		descricaoStep1: any;
		cnaes: any;
		telefones: any;
	},
		setErrors: {
			(errors: FormikErrors<{
				nomeOuRazaoSocial: string;
				cpfOuCnpj: string;
				email: string;
				nomeFantasia: string;
				inscricaoEstadual: string;
				nomeAdministrador: string;
				municipio: string;
				porte: string;
				ramoAtividade: string;
				descricaoStep1: string;
				cnaes: never[];
				telefones: { index: number; titulo: string; telefone: string; }[];
			}>): void; (arg0: any): void;
		}) {
		const errors: any = {};

		if (!_values.nomeOuRazaoSocial) {
			errors.nomeOuRazaoSocial = Messages.form.required;
		}
		if (_values.cnaes.length === 0) {
			errors.cnaes = Messages.form.arrayRequired;
		}
		if (!_values.cpfOuCnpj) {
			errors.cpfOuCnpj = Messages.form.required;
		}
		if (!_values.descricaoStep1) {
			errors.descricaoStep1 = Messages.form.required;
		}
		if (!_values.email) {
			errors.email = Messages.form.required;
		}
		if (!_values.inscricaoEstadual) {
			errors.inscricaoEstadual = Messages.form.required;
		}
		if (!_values.municipio) {
			errors.municipio = Messages.form.required;
		}
		if (!_values.nomeAdministrador) {
			errors.nomeAdministrador = Messages.form.required;
		}
		if (!_values.nomeFantasia) {
			errors.nomeFantasia = Messages.form.required;
		}
		if (!_values.nomeOuRazaoSocial) {
			errors.nomeOuRazaoSocial = Messages.form.required;
		}
		if (!_values.porte) {
			errors.porte = Messages.form.required;
		}
		if (!_values.ramoAtividade) {
			errors.ramoAtividade = Messages.form.required;
		}
		const telefoneErrors = [];
		_values.telefones.forEach((telefone, index) => {
			if (!telefone.telefone && telefone.titulo) {
				telefoneErrors[index] = { telefone: Messages.form.required };
			}
		});
		if (telefoneErrors.length > 0) {
			errors.telefones = telefoneErrors;
		}
		if (Object.keys(errors).length > 0) {
			setErrors(errors);
			return false;
		}
		return true;
	}
	return (
		<Formik
			initialValues={inputs}
			validate={(_values) => {
				return {};
			}}
			onSubmit={(values, { setSubmitting, setErrors }) => {
				if (validate(values, setErrors)) {
					localStorage.setItem("step1", JSON.stringify(values));
					setTimeout(() => {
						setSubmitting(false);
						setStep(2);
					}, 400);
				}
			}}
		>
			{(formik) => <Form setStep={setStep} formik={formik} />}
		</Formik>
	);
}