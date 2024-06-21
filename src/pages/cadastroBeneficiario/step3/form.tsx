import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveIcon from "@mui/icons-material/DeleteOutline";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	Button,
	Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { IIncentivoFiscal } from "incentivoFiscal";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ISubmodulo } from "submodulo";
import ConfirmDialog from "../../../components/confirmDialog";
import { getAllIncentivosFiscais } from "../../../services/incentivoFiscal";
import { getAllSubmodulosByInscricaoEstadual } from "../../../services/submodulo";
import SubmoduloForm from "./components/submoduloForm";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step3Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
	setSubsToExclude: Function;
};

function step3({ setStep, formik, setSubsToExclude }: step3Type) {
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
	const [expanded, setExpanded] = useState<number | false>(false);
	const [show, setShow] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useOutletContext();
	const navigate = useNavigate();
	const dialogRef = useRef(null);
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

		formik.setValues(localItem ?? { submodulos: [] });
	}

	const handleChange =
		(panel: number) =>
		(event: React.SyntheticEvent, isExpanded: boolean) => {
			const isRemoveCLick =
				event.target?.className?.baseVal?.includes("removeIcon");
			if (!isRemoveCLick) {
				setExpanded(isExpanded ? panel : false);
			}
		};

	useEffect(() => {
		if (!!formik.errors.submodulo) {
			setShow(true);
			setTimeout(() => {
				setShow(false);
			}, 3000);
		}
	}, [formik.errors]);

	return (
		<>
			{show && (
				<Alert
					variant="filled"
					className={styles.alert}
					severity="error"
				>
					{formik.errors.submodulo ?? ""}
				</Alert>
			)}
			{formik.values?.submodulos &&
				formik.values.submodulos.map((i, index) => (
					<Accordion
						expanded={expanded === index}
						onChange={handleChange(index)}
						sx={{ margin: "1rem" }}
					>
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
													i.incentivoFiscal?.sigla ??
													""
											  } - ${i.submodulo ?? ""}`
											: ""}
									</Typography>

									<RemoveIcon
										className={styles.removeIcon}
										onClick={async () => {
											dialogRef.current?.handleClickOpen(
												() => {
													var submodulos =
														formik.values
															.submodulos;
													if (submodulos[index].id) {
														setSubsToExclude(
															submodulos[index]
																.id,
														);
													}
													submodulos.splice(index, 1);
													formik.setFieldValue(
														"submodulos",
														submodulos,
													);
												},
											);
										}}
									/>
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
			{!isView && !formik.errors.submodulos && (
				<Button
					type="button"
					variant="contained"
					className={styles.primaryButton}
					style={{ marginLeft: "1rem" }}
					onClick={() => {
						var submodulos = formik.values.submodulos;
						submodulos.push({});
						formik.setFieldValue("submodulos", submodulos);
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
						navigate("/beneficiario");
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					Voltar
				</Button>
				<Button
					type="button"
					variant="contained"
					className={styles.secondaryButton}
					onClick={() => {
						setStep(2);
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					Anterior
				</Button>
				<Button
					type="button"
					variant="contained"
					className={styles.primaryButton}
					onClick={() => {
						formik.submitForm();
					}}
				>
					Próximo
				</Button>
			</div>
			<ConfirmDialog
				message="Tem certeza que deseja fazer a exclusão?"
				ref={dialogRef}
			/>
		</>
	);
}

export default step3;
