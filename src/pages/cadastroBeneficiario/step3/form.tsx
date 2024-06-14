import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveIcon from "@mui/icons-material/DeleteOutline";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { IIncentivoFiscal } from "incentivoFiscal";
import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { ISubmodulo } from "submodulo";
import { getAllIncentivosFiscais } from "../../../services/incentivoFiscal";
import { getAllSubmodulosByInscricaoEstadual } from "../../../services/submodulo";
import SubmoduloForm from "./components/submoduloForm";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step3Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step3({ setStep, formik }: step3Type) {
	const [submodulos, setSubmodulos] = useState<ISubmodulo[]>([
		{
			codgBeneficio: "1231",
			nomeBeneficio: "Dale",
		},
		{
			codgBeneficio: "1232",
			nomeBeneficio: "Dele",
		},
		{
			codgBeneficio: "1233",
			nomeBeneficio: "Dole",
		},
	]);
	const [incentivosFiscais, setIncentivosFiscais] = useState<
		IIncentivoFiscal[]
	>([]);
	const [isLoading, setIsLoading] = useOutletContext();
	const { pathname } = useLocation();
	const isView = pathname?.includes("/view");

	useEffect(() => {
		loadData();
		(async function fetch() {
			setIsLoading(true);
			const step1 = JSON.parse(localStorage.getItem("step1") ?? "");
			const incentivos = await getAllIncentivosFiscais();
			setIncentivosFiscais(incentivos);
			const submds = await getAllSubmodulosByInscricaoEstadual(
				step1.inscricaoEstadual,
			);
			// setSubmodulos(submds);
			setIsLoading(false);
		})();
	}, []);

	function loadData() {
		const localItem = JSON.parse(localStorage.getItem("step3"));
		if (localItem?.submodulos && localItem?.submodulos?.length > 0) {
			formik.setValues(localItem);
		}
	}

	return (
		<>
			{formik.values.submodulos.map((i, index) => (
				<Accordion sx={{ margin: "1rem" }}>
					<AccordionSummary
						expandIcon={
							<ArrowDownwardIcon sx={{ color: "white" }} />
						}
						aria-controls="panel1-content"
						id="panel1-header"
						className={styles.accordionTitle}
					>
						<div
							className={`${styles.col1} ${styles.removeButtonDiv}`}
						>
							<>
								<Typography style={{ color: "white" }}>
									{i.incentivoFiscal?.sigla
										? `${
												i.incentivoFiscal?.sigla ?? ""
										  } - ${i.submodulo ?? ""}`
										: ""}
								</Typography>
								{!isView && index > 0 && (
									<RemoveIcon
										className={styles.removeIcon}
										onClick={() => {
											var submodulos =
												formik.values.submodulos;
											submodulos.splice(index, 1);
											formik.setFieldValue(
												"submodulos",
												submodulos,
											);
										}}
									/>
								)}
							</>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<SubmoduloForm
							submodulos={submodulos}
							incentivosFiscais={incentivosFiscais}
							formik={formik}
							setStep={setStep}
							index={index}
						/>
					</AccordionDetails>
				</Accordion>
			))}
			{!isView && (
				<Button
					type="button"
					variant="contained"
					className={styles.primaryButton}
					style={{ marginLeft: "1rem" }}
					onClick={() => {
						var submodulos = formik.values.submodulos;
						submodulos.push([]);
						formik.setFieldValue("submodeulos", submodulos);
					}}
				>
					<AddIcon />
					Adicionar linhas e colunas
				</Button>
			)}
			<div className={`${styles.col12} ${styles.buttonsRigth}`}>
				<Button
					type="button"
					variant="contained"
					className={styles.secondaryButton}
					onClick={() => {
						setStep(2);
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					Voltar
				</Button>
				<Button
					type="button"
					variant="contained"
					className={styles.primaryButton}
					onClick={() => {
						formik.submitForm();
					}}
				>
					Continuar
				</Button>
			</div>
		</>
	);
}

export default step3;
