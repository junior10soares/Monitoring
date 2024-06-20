import { Formik, FormikErrors } from "formik";
import { stepType } from "stepsType";
import { Messages } from "../../../../src/utils/Messages";
import Form from "./form";
import { inputs } from "./inputs";

export default function ({ setStep }: stepType) {
	function validate(
		_values: {
			nomeOuRazaoSocial: any;
			cpfOuCnpj: any;
			email: any;
			nomeFantasia: any;
			inscricaoEstadual: any;
			nomeAdministrador: any;
			municipio: any;
			porte: any;
			ramoAtividade: any;
			cnaes: any;
			telefones: any;
		},
		setErrors: {
			(
				errors: FormikErrors<{
					nomeOuRazaoSocial: string;
					cpfOuCnpj: string;
					email: string;
					nomeFantasia: string;
					inscricaoEstadual: string;
					nomeAdministrador: string;
					municipio: string;
					porte: string;
					ramoAtividade: string;
					cnaes: never[];
					telefones: {
						index: number;
						titulo: string;
						telefone: string;
					}[];
				}>,
			): void;
			(arg0: any): void;
		},
	) {
		const errors: any = {};

		if (!_values.nomeOuRazaoSocial) {
			errors.nomeOuRazaoSocial = Messages.form.required;
		}
		if (_values.cnaes.length === 0) {
			errors.cnaes = Messages.form.arrayRequired;
		}
		if (!_values.cpfOuCnpj) {
			errors.cpfOuCnpj = Messages.form.arrayRequired;
		} else if (
			_values.cpfOuCnpj.length !== 11 &&
			_values.cpfOuCnpj.length !== 14
		) {
			errors.cpfOuCnpj = "Precisa ter exatamente 11 ou 14 caracteres";
		}
		if (!_values.municipio) {
			errors.municipio = Messages.form.required;
		}
		if (!_values.email) {
			errors.email = Messages.form.required;
		}
		if (!_values.inscricaoEstadual) {
			errors.inscricaoEstadual = Messages.form.required;
		} else if (_values.inscricaoEstadual.length < 9) {
			errors.inscricaoEstadual = "Precisa ter no mínimo 9 caracteres";
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
			} else if (
				telefone.telefone &&
				telefone.telefone.length !== 10 &&
				telefone.telefone.length !== 11
			) {
				telefoneErrors[index] = {
					telefone: "Precisa ter 10 ou 11 caracteres",
				};
			}
		});
		if (telefoneErrors.length > 0) {
			errors.telefones = telefoneErrors;
		}
		const requiredPhoneTypes = [
			"ADMINISTRADOR",
			"CONTABILIDADE",
			"EMPRESA",
		];
		const missingPhoneTypes = requiredPhoneTypes.filter(
			(tipo) =>
				!_values.telefones.some(
					(telefone: any) => telefone.titulo === tipo,
				),
		);

		if (missingPhoneTypes.length > 0) {
			errors.missingPhoneTypes =
				"Pelo menos um telefone para administrador, contabilidade e empresa é obrigatório.";
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
