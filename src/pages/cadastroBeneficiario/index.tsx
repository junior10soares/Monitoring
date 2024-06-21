import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StepCount from "../../components/stepCount";
import { axiosInstance } from "../../services/axios";
import { insertBeneficiario } from "../../services/beneficiario";
import { excludeSubmoduloById } from "../../services/submodulos";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4/";
import Step5 from "./step5/";
import styles from "./styles.module.scss";

function cadastroBeneficiario() {
	const [step, setStep] = useState(1);
	const [show, setShow] = useState(false);
	const [open, setOpen] = useState(false);
	const [subsToExclude, setSubsToExclude] = useState([]);
	const params = useParams();
	const navigate = useNavigate();
	const { pathname } = location;
	const isView = pathname?.includes("/view");

	function addSubToExclude(id: number) {
		var newSubsToDelete = subsToExclude;
		newSubsToDelete.push(id);
		setSubsToExclude(newSubsToDelete);
	}

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

	const handleVoltar = () => {
		if (isView) {
			navigate("/beneficiario");
		} else {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function submitForm() {
		const step1 = safeParseJSON("step1");
		const step2 = safeParseJSON("step2");
		const step3 = safeParseJSON("step3");
		const step4 = safeParseJSON("step4");

		const steps = {
			...step1,
			dadosEconomicos: step2,
			...step3,
			...step4,
		};

		const extractedData = {
			municipio:
				typeof steps?.municipio === "object"
					? steps?.municipio
					: { id: steps?.municipio },
			nomeOuRazaoSocial: steps?.nomeOuRazaoSocial,
			cpfOuCnpj: steps?.cpfOuCnpj,
			email: steps?.email,
			inscricaoEstadual: steps?.inscricaoEstadual,
			nomeFantasia: steps?.nomeFantasia,
			nomeAdministrador: steps?.nomeAdministrador,
			porte:
				typeof steps?.porte === "object"
					? steps?.porte
					: { id: steps?.porte },
			ramoAtividade: steps?.ramoAtividade,
			descricao: steps?.descricaoStep1,
			status: [
				{
					anoReferencia:
						steps.dadosEconomicos.anoReferencia.toString(),
					statusMonitoramento: 1,
				},
			],
			version: 2,
			cnaes: steps?.cnaes,
			telefones: steps.telefones?.map((telefone) => ({
				id: telefone?.id,
				telefone: telefone?.telefone,
				titulo: telefone?.titulo,
			})),
			dadosEconomicos: {
				id: steps.dadosEconomicos?.id,
				anoReferencia: steps.dadosEconomicos.anoReferencia.toString(),
				investimentoAcumulado:
					steps.dadosEconomicos?.investimentoAcumulado,
				investimentoMensal: {
					id: steps.dadosEconomicos.investimentoMensalId,
					janeiroValor: steps.dadosEconomicos.investimentoMensal.find(
						(i) => i.codigo === "janeiroValor",
					)?.valor,
					fevereiroValor:
						steps.dadosEconomicos.investimentoMensal.find(
							(i) => i.codigo === "fevereiroValor",
						)?.valor,
					marcoValor: steps.dadosEconomicos.investimentoMensal.find(
						(i) => i.codigo === "marcoValor",
					)?.valor,
					abrilValor: steps.dadosEconomicos.investimentoMensal.find(
						(i) => i.codigo === "abrilValor",
					)?.valor,
					maioValor: steps.dadosEconomicos.investimentoMensal.find(
						(i) => i.codigo === "maioValor",
					)?.valor,
					junhoValor: steps.dadosEconomicos.investimentoMensal.find(
						(i) => i.codigo === "junhoValor",
					)?.valor,
					julhoValor: steps.dadosEconomicos.investimentoMensal.find(
						(i) => i.codigo === "julhoValor",
					)?.valor,
					agostoValor: steps.dadosEconomicos.investimentoMensal.find(
						(i) => i.codigo === "agostoValor",
					)?.valor,
					setembroValor:
						steps.dadosEconomicos.investimentoMensal.find(
							(i) => i.codigo === "setembroValor",
						)?.valor,
					outubroValor: steps.dadosEconomicos.investimentoMensal.find(
						(i) => i.codigo === "outubroValor",
					)?.valor,
					novembroValor:
						steps.dadosEconomicos.investimentoMensal.find(
							(i) => i.codigo === "novembroValor",
						)?.valor,
					dezembroValor:
						steps.dadosEconomicos.investimentoMensal.find(
							(i) => i.codigo === "dezembroValor",
						)?.valor,
				},
				empregoHomem: {
					id: steps.dadosEconomicos.empregoHomemId,
					janeiroValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "janeiroValor",
					)?.valor,
					fevereiroValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "fevereiroValor",
					)?.valor,
					marcoValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "marcoValor",
					)?.valor,
					abrilValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "abrilValor",
					)?.valor,
					maioValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "maioValor",
					)?.valor,
					junhoValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "junhoValor",
					)?.valor,
					julhoValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "julhoValor",
					)?.valor,
					agostoValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "agostoValor",
					)?.valor,
					setembroValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "setembroValor",
					)?.valor,
					outubroValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "outubroValor",
					)?.valor,
					novembroValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "novembroValor",
					)?.valor,
					dezembroValor: steps.dadosEconomicos.empregoHomem.find(
						(i) => i.codigo === "dezembroValor",
					)?.valor,
				},
				empregoMulher: {
					id: steps.dadosEconomicos.empregoMulherId,
					janeiroValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "janeiroValor",
					)?.valor,
					fevereiroValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "fevereiroValor",
					)?.valor,
					marcoValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "marcoValor",
					)?.valor,
					abrilValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "abrilValor",
					)?.valor,
					maioValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "maioValor",
					)?.valor,
					junhoValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "junhoValor",
					)?.valor,
					julhoValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "julhoValor",
					)?.valor,
					agostoValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "agostoValor",
					)?.valor,
					setembroValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "setembroValor",
					)?.valor,
					outubroValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "outubroValor",
					)?.valor,
					novembroValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "novembroValor",
					)?.valor,
					dezembroValor: steps.dadosEconomicos.empregoMulher.find(
						(i) => i.codigo === "dezembroValor",
					)?.valor,
				},
			},
			incentivoFiscal: steps.submodulos[0].incentivoFiscal,
			submodulos: steps.submodulos.map((i) => ({
				...i,
				codigoRcr: "123",
				vendaAnualInterestadual: i.vendaAnualInterestadual,
				vendaAnualInterna: i.vendaAnualInterna,
				recolhimentoFundos: i.valoresFundo.map((valorFundo) => ({
					...valorFundo,
					anoReferencia:
						steps.dadosEconomicos.anoReferencia.toString(),
				})),
			})),

			vendaAnual: steps.infoVendas,
		};

		if (params.id) {
			try {
				extractedData.id = step1.id;
				const responsePut = await axiosInstance.put(
					`/beneficiarios/${params.id}`,
					extractedData,
				);

				subsToExclude.forEach((element) => {
					excludeSubmoduloById(element);
				});

				if (responsePut.status === 200) {
					setShow(true);
					setTimeout(() => {
						setShow(false);
						navigate("/beneficiario");
					}, 1000);
				}
			} catch (error) {
				console.error("Erro ao atualizar beneficiário:", error);
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
						setShow(false);
						navigate("/beneficiario");
					}, 1000);
				}
			} catch (error) {
				console.error("Erro ao inserir beneficiário:", error);
			}
		}
	}

	return (
		<div>
			{show && (
				<Alert
					variant="filled"
					className={styles.alert}
					severity="success"
				>
					Registro salvo com sucesso.
				</Alert>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Confirmação"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Os dados alterados não foram salvos, deseja mesmo sair
						sem salvar o formulário?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Não</Button>
					<Button
						onClick={() => {
							navigate("/beneficiario");
							handleClose();
						}}
						autoFocus
					>
						Sim
					</Button>
				</DialogActions>
			</Dialog>
			<StepCount activeStep={step} setStep={setStep} />
			{step === 1 && (
				<Step1
					setStep={setStep}
					submitForm={submitForm}
					handleVoltar={handleVoltar}
				/>
			)}
			{step === 2 && (
				<Step2
					setStep={setStep}
					submitForm={submitForm}
					handleVoltar={handleVoltar}
				/>
			)}
			{step === 3 && (
				<Step3
					setSubsToExclude={addSubToExclude}
					setStep={setStep}
					submitForm={submitForm}
					handleVoltar={handleVoltar}
				/>
			)}
			{step === 4 && (
				<Step4
					setStep={setStep}
					submitForm={submitForm}
					handleVoltar={handleVoltar}
				/>
			)}
			{step === 5 && (
				<Step5
					subsToExclude={subsToExclude}
					setStep={setStep}
					submitForm={submitForm}
					handleVoltar={handleVoltar}
				/>
			)}
		</div>
	);
}

export default cadastroBeneficiario;
