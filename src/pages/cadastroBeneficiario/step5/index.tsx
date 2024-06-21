import { Alert } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { stepType } from "stepsType";
import { axiosInstance } from "../../../services/axios";
import { insertBeneficiario } from "../../../services/beneficiario";
import { excludeSubmoduloById } from "../../../services/submodulos";
import Form from "./form";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

const safeParseJSON = (item) => {
	const storedItem = localStorage.getItem(item);
	if (storedItem) {
		try {
			return JSON.parse(storedItem);
		} catch (e) {
			console.error(`Error parsing JSON from ${item}:`, e);
			return {};
		}
	}
	return {};
};

export default function ({ setStep, subsToExclude }: stepType) {
	const [show, setShow] = useState(false);
	const params = useParams();

	const step1 = safeParseJSON("step1");
	const step2 = safeParseJSON("step2");
	const step3 = safeParseJSON("step3");
	const step4 = safeParseJSON("step4");

	const navigate = useNavigate();
	return (
		<>
			{show && (
				<Alert
					variant="filled"
					className={styles.alert}
					severity="success"
				>
					Registro salvo com sucesso.
				</Alert>
			)}
			<Formik
				initialValues={inputs}
				enableReinitialize
				validate={(_values) => {
					const errors = {};
					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					const extractedData = {
						municipio: values?.municipio,
						nomeOuRazaoSocial: values?.nomeOuRazaoSocial,
						cpfOuCnpj: values?.cpfOuCnpj,
						email: values?.email,
						inscricaoEstadual: values?.inscricaoEstadual,
						nomeFantasia: values?.nomeFantasia,
						nomeAdministrador: values?.nomeAdministrador,
						porte: values?.porte,
						ramoAtividade: values?.ramoAtividade,
						descricao: values?.descricaoStep1,
						status: [
							{
								anoReferencia: step2.anoReferencia.toString(),
								statusMonitoramento: 1,
							},
						],
						version: 2,
						cnaes: values?.cnaes,
						telefones: values.telefones?.map((telefone) => ({
							id: telefone?.id,
							telefone: telefone?.telefone,
							titulo: telefone?.titulo,
						})),
						dadosEconomicos: {
							id: step2?.id,
							anoReferencia: step2.anoReferencia.toString(),
							investimentoAcumulado:
								values?.investimentoAcumulado,
							investimentoMensal: {
								id: values.investimentoMensalId,
								janeiroValor: values.investimentoMensal.find(
									(i) =>
										i.codigo === "janeiro" ||
										"janeiroValor",
								)?.valor,
								fevereiroValor: values.investimentoMensal.find(
									(i) =>
										i.codigo === "fevereiro" ||
										"fevereiroValor",
								)?.valor,
								marcoValor: values.investimentoMensal.find(
									(i) => i.codigo === "marco" || "marcoValor",
								)?.valor,
								abrilValor: values.investimentoMensal.find(
									(i) => i.codigo === "abril" || "abrilValor",
								)?.valor,
								maioValor: values.investimentoMensal.find(
									(i) => i.codigo === "maio" || "maioValor",
								)?.valor,
								junhoValor: values.investimentoMensal.find(
									(i) => i.codigo === "junho" || "junhoValor",
								)?.valor,
								julhoValor: values.investimentoMensal.find(
									(i) => i.codigo === "julho" || "julhoValor",
								)?.valor,
								agostoValor: values.investimentoMensal.find(
									(i) =>
										i.codigo === "agosto" || "agostoValor",
								)?.valor,
								setembroValor: values.investimentoMensal.find(
									(i) =>
										i.codigo === "setembro" ||
										"setembroValor",
								)?.valor,
								outubroValor: values.investimentoMensal.find(
									(i) =>
										i.codigo === "outubro" ||
										"outubroValor",
								)?.valor,
								novembroValor: values.investimentoMensal.find(
									(i) =>
										i.codigo === "novembro" ||
										"novembroValor",
								)?.valor,
								dezembroValor: values.investimentoMensal.find(
									(i) =>
										i.codigo === "dezembro" ||
										"dezembroValor",
								)?.valor,
							},
							empregoHomem: {
								id: values.empregoHomemId,
								janeiroValor: values.empregoHomem.find(
									(i) =>
										i.codigo === "janeiro" ||
										"janeiroValor",
								)?.valor,
								fevereiroValor: values.empregoHomem.find(
									(i) =>
										i.codigo === "fevereiro" ||
										"fevereiroValor",
								)?.valor,
								marcoValor: values.empregoHomem.find(
									(i) => i.codigo === "marco" || "marcoValor",
								)?.valor,
								abrilValor: values.empregoHomem.find(
									(i) => i.codigo === "abril" || "abrilValor",
								)?.valor,
								maioValor: values.empregoHomem.find(
									(i) => i.codigo === "maio" || "maioValor",
								)?.valor,
								junhoValor: values.empregoHomem.find(
									(i) => i.codigo === "junho" || "junhoValor",
								)?.valor,
								julhoValor: values.empregoHomem.find(
									(i) => i.codigo === "julho" || "julhoValor",
								)?.valor,
								agostoValor: values.empregoHomem.find(
									(i) =>
										i.codigo === "agosto" || "agostoValor",
								)?.valor,
								setembroValor: values.empregoHomem.find(
									(i) =>
										i.codigo === "setembro" ||
										"setembroValor",
								)?.valor,
								outubroValor: values.empregoHomem.find(
									(i) =>
										i.codigo === "outubro" ||
										"outubroValor",
								)?.valor,
								novembroValor: values.empregoHomem.find(
									(i) =>
										i.codigo === "novembro" ||
										"novembroValor",
								)?.valor,
								dezembroValor: values.empregoHomem.find(
									(i) =>
										i.codigo === "dezembro" ||
										"dezembroValor",
								)?.valor,
							},
							empregoMulher: {
								id: values.empregoMulherId,
								janeiroValor: values.empregoMulher.find(
									(i) =>
										i.codigo === "janeiro" ||
										"janeiroValor",
								)?.valor,
								fevereiroValor: values.empregoMulher.find(
									(i) =>
										i.codigo === "fevereiro" ||
										"fevereiroValor",
								)?.valor,
								marcoValor: values.empregoMulher.find(
									(i) => i.codigo === "marco" || "marcoValor",
								)?.valor,
								abrilValor: values.empregoMulher.find(
									(i) => i.codigo === "abril" || "abrilValor",
								)?.valor,
								maioValor: values.empregoMulher.find(
									(i) => i.codigo === "maio" || "maioValor",
								)?.valor,
								junhoValor: values.empregoMulher.find(
									(i) => i.codigo === "junho" || "junhoValor",
								)?.valor,
								julhoValor: values.empregoMulher.find(
									(i) => i.codigo === "julho" || "julhoValor",
								)?.valor,
								agostoValor: values.empregoMulher.find(
									(i) =>
										i.codigo === "agosto" || "agostoValor",
								)?.valor,
								setembroValor: values.empregoMulher.find(
									(i) =>
										i.codigo === "setembro" ||
										"setembroValor",
								)?.valor,
								outubroValor: values.empregoMulher.find(
									(i) =>
										i.codigo === "outubro" ||
										"outubroValor",
								)?.valor,
								novembroValor: values.empregoMulher.find(
									(i) =>
										i.codigo === "novembro" ||
										"novembroValor",
								)?.valor,
								dezembroValor: values.empregoMulher.find(
									(i) =>
										i.codigo === "dezembro" ||
										"dezembroValor",
								)?.valor,
							},
						},
						incentivoFiscal: values.submodulos[0].incentivoFiscal,
						submodulos: values.submodulos.map((i) => ({
							...i,
							codigoRcr: "123",
							vendaAnualInterestadual: i.vendaAnualInterestadual,
							vendaAnualInterna: i.vendaAnualInterna,
							recolhimentoFundos: i.valoresFundo.map(
								(valorFundo) => ({
									...valorFundo,
									anoReferencia:
										step2.anoReferencia.toString(),
								}),
							),
						})),

						vendaAnual: step4.infoVendas,
					};

					if (params.id) {
						try {
							extractedData.id = step1.id;
							const responsePut = await axiosInstance.put(
								`/beneficiarios/${params.id}`,
								extractedData,
							);

							await subsToExclude.forEach((element) => {
								excludeSubmoduloById(element);
							});

							if (responsePut.status === 200) {
								setShow(true);
								setTimeout(() => {
									setSubmitting(false);
									setShow(false);
									navigate("/beneficiario");
								}, 1000);
							}
						} catch (error) {
							console.error(
								"Erro ao atualizar beneficiário:",
								error,
							);
						}
					} else {
						try {
							const res = await insertBeneficiario(extractedData);
							if (res.success) {
								setShow(true);
								for (let index = 0; index < 5; index++) {
									localStorage.removeItem(`step${index + 1}`);
								}
								setTimeout(() => {
									setSubmitting(false);
									setShow(false);
									navigate("/beneficiario");
								}, 1000);
							}
						} catch (error) {
							console.error(
								"Erro ao inserir beneficiário:",
								error,
							);
						}
					}
				}}
			>
				{(formik) => <Form setStep={setStep} formik={formik} />}
			</Formik>
		</>
	);
}
