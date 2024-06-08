import { Alert } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { stepType } from "stepsType";
import { axiosInstance } from "../../../services/axios";
import Form from "./form";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";
import { insertBeneficiario } from "../../../services/beneficiario";

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

					const extractedData = {
						id: step1.id,
						municipio: {
							id: step1?.municipio,//aquitemerro
							nome: responseData?.nome
						},
						nomeOuRazaoSocial: step1?.nomeOuRazaoSocial,
						cpfOuCnpj: step1?.cpfOuCnpj,
						email: step1?.email,
						inscricaoEstadual: step1?.inscricaoEstadual,
						nomeFantasia: step1?.nomeFantasia,
						nomeAdministrador: step1?.nomeAdministrador,
						porte: {
							id: step1?.porte,
							codigo: responseData?.codigo,
							descricao: responseData?.descricao
						},
						ramoAtividade: step1?.ramoAtividade,
						descricao: step1?.descricao,
						version: responseData?.version,
						cnaes: responseData.cnaes?.map((i, index) => ({//erro
							id: i?.id,
							cnae: {
								id: i?.cnae?.id,
								codigo: i?.cnae?.codigo,
								descricao: i?.cnae?.descricao
							},
							isPrincipal: i.isPrincipal
						})),
						telefones: step1.telefones?.map((telefone) => ({
							id: telefone?.id,
							telefone: telefone?.telefone,
							titulo: telefone?.titulo
						})),
						status: responseData.status?.map((status) => ({
							id: status?.id,
							anoReferencia: status?.anoReferencia.toString(),
							statusMonitoramento: {
								id: status?.statusMonitoramento?.id,
								descricao: status?.statusMonitoramento?.descricao
							}
						})),
						dadosEconomicos: {
							id: responseData.dadosEconomicos?.id,
							anoReferencia: responseData?.dadosEconomicos.anoReferencia.toString(),
							investimentoAcumulado: responseData.dadosEconomicos.investimentoAcumulado,
							investimentoMensal: {
								id: responseData.dadosEconomicos?.investimentoMensal?.id,
								janeiroValor: responseData.dadosEconomicos?.investimentoMensal?.janeiroValor,
								fevereiroValor: responseData.dadosEconomicos?.investimentoMensal?.fevereiroValor,
								marcoValor: responseData.dadosEconomicos?.investimentoMensal?.marcoValor,
								abrilValor: responseData.dadosEconomicos?.investimentoMensal?.abrilValor,
								maioValor: responseData.dadosEconomicos?.investimentoMensal?.maioValor,
								junhoValor: responseData.dadosEconomicos?.investimentoMensal?.junhoValor,
								julhoValor: responseData.dadosEconomicos?.investimentoMensal?.julhoValor,
								agostoValor: responseData.dadosEconomicos?.investimentoMensal?.agostoValor,
								setembroValor: responseData.dadosEconomicos?.investimentoMensal?.setembroValor,
								outubroValor: responseData.dadosEconomicos?.investimentoMensal?.outubroValor,
								novembroValor: responseData.dadosEconomicos?.investimentoMensal?.novembroValor,
								dezembroValor: responseData.dadosEconomicos?.investimentoMensal?.dezembroValor
							},
							empregoHomem: {
								id: responseData.dadosEconomicos?.empregoHomem?.id,//aqui tem erro
								janeiroValor: responseData.dadosEconomicos?.empregoHomem?.janeiroValor,
								fevereiroValor: responseData.dadosEconomicos?.empregoHomem?.fevereiroValor,
								marcoValor: responseData.dadosEconomicos?.empregoHomem?.marcoValor,
								abrilValor: responseData.dadosEconomicos?.empregoHomem?.abrilValor,
								maioValor: responseData.dadosEconomicos?.empregoHomem?.maioValor,
								junhoValor: responseData.dadosEconomicos?.empregoHomem?.junhoValor,
								julhoValor: responseData.dadosEconomicos?.empregoHomem?.julhoValor,
								agostoValor: responseData.dadosEconomicos?.empregoHomem?.agostoValor,
								setembroValor: responseData.dadosEconomicos?.empregoHomem?.setembroValor,
								outubroValor: responseData.dadosEconomicos?.empregoHomem?.outubroValor,
								novembroValor: responseData.dadosEconomicos?.empregoHomem?.novembroValor,
								dezembroValor: responseData.dadosEconomicos?.empregoHomem?.dezembroValor
							},
							empregoMulher: {
								id: responseData.dadosEconomicos?.empregoMulher?.id,
								janeiroValor: responseData.dadosEconomicos?.empregoMulher?.janeiroValor,
								fevereiroValor: responseData.dadosEconomicos?.empregoMulher?.fevereiroValor,
								marcoValor: responseData.dadosEconomicos?.empregoMulher?.marcoValor,
								abrilValor: responseData.dadosEconomicos?.empregoMulher?.abrilValor,
								maioValor: responseData.dadosEconomicos?.empregoMulher?.maioValor,
								junhoValor: responseData.dadosEconomicos?.empregoMulher?.junhoValor,
								julhoValor: responseData.dadosEconomicos?.empregoMulher?.julhoValor,
								agostoValor: responseData.dadosEconomicos?.empregoMulher?.agostoValor,
								setembroValor: responseData.dadosEconomicos?.empregoMulher?.setembroValor,
								outubroValor: responseData.dadosEconomicos?.empregoMulher?.outubroValor,
								novembroValor: responseData.dadosEconomicos?.empregoMulher?.novembroValor,
								dezembroValor: responseData.dadosEconomicos?.empregoMulher?.dezembroValor
							}
						},
						incentivoFiscal: {
							id: step3.incentivoFiscal?.id,
							sigla: step3.incentivoFiscal?.sigla,
							descricao: step3.incentivoFiscal?.descricao,
							fundos: step3.incentivoFiscal?.fundos
						},
						vendaAnual: null
					}

					setData(extractedData);
				} catch (error) {
					console.error('Erro na requisição:', error);
				}
			};
			fetchData();
		}
	}, [params.id]);

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
					if (params.id) {
						try {
							const responsePut = await axiosInstance.put(`/beneficiarios/${params.id}`, data);
							if (responsePut.status === 200) {
								setShow(true);
								setTimeout(() => {
									setSubmitting(false);
									setShow(false);
									navigate("/beneficiario");
								}, 1000);
							}
						} catch (error) {
							console.error('Erro ao atualizar beneficiário:', error);
						}
					} else {
						const step1 = JSON.parse(localStorage.getItem("step1") ?? "");
						const step2 = JSON.parse(localStorage.getItem("step2") ?? "");
						const step3 = JSON.parse(localStorage.getItem("step3") ?? "");
						const step4 = JSON.parse(localStorage.getItem("step4") ?? "");
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
							console.error('Erro ao inserir beneficiário:', error);
						}
					}
				}}
			>
				{formik => <Form setStep={setStep} formik={formik} />}
			</Formik>
		</>
	);
}