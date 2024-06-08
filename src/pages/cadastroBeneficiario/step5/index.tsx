import { Alert } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { stepType } from "stepsType";
import { axiosInstance } from "../../../services/axios";
import { insertBeneficiario } from "../../../services/beneficiario";
import Form from "./form";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

export default function ({ setStep }: stepType) {
	const [show, setShow] = useState(false);
	const params = useParams();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (params.id) {
			const fetchData = async () => {
				try {
					const responseGet = await axiosInstance.get(`/beneficiarios/${params.id}`);
					const responseData = responseGet.data;

					// 				setData(extractedData);
					// 			} catch (error) {
					// 				console.error('Erro na requisição:', error);
					// 			}
					// 		};
					// 		fetchData();
					// 	}
					// }, [params.id]);

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
								initialValues={data || inputs}
								enableReinitialize
								validate={(_values) => {
									const errors = {};
									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									const extractedData = {
										id: step1.id,
										municipio: {
											id: step1?.municipio,
										},
										nomeOuRazaoSocial: step1?.nomeOuRazaoSocial,
										cpfOuCnpj: step1?.cpfOuCnpj,
										email: step1?.email,
										inscricaoEstadual: step1?.inscricaoEstadual,
										nomeFantasia: step1?.nomeFantasia,
										nomeAdministrador: step1?.nomeAdministrador,
										porte: {
											id: step1?.porte,
										},
										ramoAtividade: step1?.ramoAtividade,
										descricao: step1?.descricao,
										status: [
											{
												anoReferencia: "2022",
												statusMonitoramento: 1,
											},
										],
										version: 2,
										cnaes: step1.cnaes,
										telefones: step1.telefones?.map((telefone) => ({
											id: telefone?.id,
											telefone: telefone?.telefone,
											titulo: telefone?.titulo,
										})),
										dadosEconomicos: {
											id: step2.id,
											anoReferencia: step2.anoReferencia.toString(),
											investimentoAcumulado: step2.investimentoAcumulado,
											investimentoMensal: {
												id: 42,
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
												id: 40,
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
												id: 41,
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
										incentivoFiscal: {
											id: step3.incentivoFiscal?.id,
											sigla: step3.incentivoFiscal?.sigla,
											descricao: step3.incentivoFiscal?.descricao,
											fundos: step3.incentivoFiscal?.fundos,
										},
										vendaAnual: step4.infoVendas,
									};
									if (params.id) {
										try {
											const responsePut = await axiosInstance.put(
												`/beneficiarios/${params.id}`,
												extractedData,
											);
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
										const step1 = JSON.parse(
											localStorage.getItem("step1") ?? "",
										);
										const step2 = JSON.parse(
											localStorage.getItem("step2") ?? "",
										);
										const step3 = JSON.parse(
											localStorage.getItem("step3") ?? "",
										);
										const step4 = JSON.parse(
											localStorage.getItem("step4") ?? "",
										);
										try {
											const res = await insertBeneficiario({
												...step1,
												...step2,
												...step3,
												...step4,
											});
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
