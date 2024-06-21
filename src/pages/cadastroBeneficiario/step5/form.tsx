import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Autocomplete,
	Button,
	Card,
	TextField,
	Typography,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FieldArray, FormikProps } from "formik";
import { IIncentivoFiscal } from "incentivoFiscal";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ISubmodulo } from "submodulo";
import CustomTextField from "../../../components/customTextField";
import NumericMask from "../../../components/numericMask";
import TreeDropdown from "../../../components/treeDropdown";
import { getUnidadeMedida } from "../../../services/beneficiario";
import { getAllIncentivosFiscais } from "../../../services/incentivoFiscal";
import { getAllNcms } from "../../../services/ncmService";
import { getAllSubmodulosByInscricaoEstadual } from "../../../services/submodulo";
import { formatBRCurrency } from "../../../utils/Currency";
import { monthsData } from "../../../utils/DateTime";
import { isEmpty } from "../../../utils/Global";
import SubmoduloForm from "../step3/components/submoduloForm";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step5Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step5({ setStep, formik }: step5Type) {
	const [ncms, setNcms] = useState([]);
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
	const [unidadeMedida, setUnidadeMedida] = useState([]);
	const [showButton, setShowButton] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		(async function fetch() {
			const listUnidadeMedida = await getUnidadeMedida();
			setUnidadeMedida(listUnidadeMedida);
		})();
	}, []);

	useEffect(() => {
		loadData();
		(async function fetch() {
			setIsLoading(true);
			const list = await getAllNcms();
			setNcms(list);
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

	useEffect(() => {
		const urlPattern = /^\/beneficiario\/view\/\d+$/;
		const url = window.location.pathname;
		if (urlPattern.test(url)) {
			setShowButton(true);
		}
	}, []);

	function loadData() {
		var localItem1 = localStorage.getItem("step1");
		var localItem2 = localStorage.getItem("step2");
		var localItem3 = localStorage.getItem("step3");
		var localItem4 = localStorage.getItem("step4");
		if (localItem1 && localItem2 && localItem3 && localItem4) {
			formik.setValues({
				...JSON.parse(localItem1),
				...JSON.parse(localItem2),
				...JSON.parse(localItem3),
				...JSON.parse(localItem4),
			});
		}
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Dados do beneficiário</h1>
					<h3 className={styles.yearTitle}>Ano de referência</h3>
					<h3 className={styles.year}>
						{new Date().getFullYear() - 1}
					</h3>
					<div className={styles.beneficiarioForm}>
						<div className={styles.monthsTitle}>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Mês referência
							</span>
							<span
								style={{ marginRight: "20px" }}
								className={`${styles.col3} ${styles.monthTitle}`}
							>
								Investimento mensal
							</span>
							<span
								className={`${styles.col3} ${styles.monthTitle}`}
							>
								Empregos direto (homem)
							</span>
							<span
								style={{ marginRight: "-40px" }}
								className={`${styles.col3} ${styles.monthTitle}`}
							>
								Empregos direto (mulher)
							</span>
						</div>
						{monthsData.map(({ codigo, label }, index) => {
							return (
								<div className={styles.TableInputs}>
									<span
										style={{
											textAlign: "center",
											marginLeft: "20px",
										}}
										className={`${styles.col2} ${styles.monthTitle}`}
									>
										{label}
									</span>
									<NumericMask
										id={`${codigo}-investimento-mensal`}
										name={`${codigo}-investimento-mensal`}
										formik={formik}
										col={3}
										prefix="R$"
										label=""
										fixedDecimalScale
										disabled={true}
										onChange={(ev: {
											target: { value: string };
										}) => {
											const newInvestimentoMensal = [
												...formik.values
													.investimentoMensal,
											];
											newInvestimentoMensal[index] = {
												codigo,
												valor: ev.target.value,
											};
											formik.setFieldValue(
												"investimentoMensal",
												newInvestimentoMensal,
											);
										}}
										required={false}
										value={
											formik.values.investimentoMensal?.[
												index
											]?.valor
										}
										className={`${styles.tableInput}`}
									/>
									<NumericMask
										id={`${codigo}-empregos-direto-homem`}
										formik={formik}
										col={3}
										label=""
										disabled={true}
										onChange={(ev: {
											target: { value: string };
										}) => {
											const newEmpregosHomem = [
												...formik.values.empregoHomem,
											];
											newEmpregosHomem[index] = {
												codigo,
												valor: ev.target.value,
											};
											formik.setFieldValue(
												"empregoHomem",
												newEmpregosHomem,
											);
										}}
										required={false}
										value={
											formik.values.empregoHomem?.[index]
												?.valor
										}
										className={`${styles.tableInput}`}
									/>
									<NumericMask
										id={`${codigo}-empregos-direto-mulher`}
										formik={formik}
										col={3}
										label=""
										disabled={true}
										onChange={(ev: {
											target: { value: string };
										}) => {
											const newEmpregosMulher = [
												...formik.values.empregoMulher,
											];
											newEmpregosMulher[index] = {
												codigo,
												valor: ev.target.value,
											};
											formik.setFieldValue(
												"empregoMulher",
												newEmpregosMulher,
											);
										}}
										required={false}
										value={
											formik.values.empregoMulher?.[index]
												?.valor
										}
										className={`${styles.tableInput}`}
									/>
								</div>
							);
						})}
						<div className={styles.totals}>
							<span className={styles.monthTitle}>
								Investimento anual:
								{formatBRCurrency(
									Array.isArray(
										formik.values?.investimentoMensal,
									)
										? formik.values?.investimentoMensal?.reduce(
												(total, item) =>
													total +
													parseFloat(
														!isEmpty(item?.valor)
															? item?.valor
															: "0",
													),
												0,
										  )
										: 0,
								)}
							</span>
							<span
								className={`${styles.monthTitle} ${styles.totalAcumulado}`}
							>
								Investimento acumulado:
								<NumericMask
									id="investimentoAcumulado"
									name="investimentoAcumulado"
									formik={formik}
									prefix="R$"
									label=""
									fixedDecimalScale
									disabled={true}
									col={6}
									onChange={formik.handleChange}
									required={true}
									value={formik.values.investimentoAcumulado}
									className={`${styles.tableInput}`}
								/>
							</span>
						</div>
					</div>
				</Card>
			</div>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Sub Módulos</h1>
					<h3 className={styles.yearTitle}>Ano de referência</h3>
					<h3 className={styles.year}>
						{new Date().getFullYear() - 1}
					</h3>

					{formik.values?.submodulos?.map((i, index) => (
						<Accordion sx={{ margin: "1rem" }}>
							<AccordionSummary
								expandIcon={
									<ArrowDownwardIcon
										sx={{ color: "white" }}
									/>
								}
								aria-controls="panel1-content"
								id="panel1-header"
								className={styles.accordionTitle}
							>
								<Typography style={{ color: "white" }}>
									{i.incentivoFiscal?.sigla
										? `${
												i.incentivoFiscal?.sigla ?? ""
										  } - ${i.submodulo ?? ""}`
										: ""}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<SubmoduloForm
									submodulos={submodulos}
									incentivosFiscais={incentivosFiscais}
									formik={formik}
									index={index}
									forceIsView={true}
								/>
							</AccordionDetails>
						</Accordion>
					))}
					{formik.values?.submodulos?.length === 0 && (
						<h2 className={styles.message}>
							Nenhum Item Encontrado
						</h2>
					)}
				</Card>
			</div>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Informações de venda anual</h1>
					<h3 className={styles.subtitle}>
						Preencha corretamente o formulário
					</h3>
					<div className={styles.beneficiarioForm}>
						<div className={styles.tableHeader}>
							<span
								className={`${styles.col4} ${styles.monthTitle}`}
							>
								NCM
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Produto incentivado
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Unidade de medida
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Quantidade interna
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Quant. Interestadual
							</span>
						</div>

						<FieldArray name="infoVendas">
							{() => (
								<>
									{formik.values.infoVendas.map(
										(linha, index) => (
											<div
												key={index}
												className={styles.TableInputs}
											>
												<div
													style={{
														display: "flex",
														flexDirection: "column",
													}}
													className={`${styles.col4} card`}
												>
													<div
														style={{
															minHeight: "20px",
														}}
													>
														<TreeDropdown
															data={ncms}
															onChange={(ev) => {
																const selectedNcm =
																	ev.target
																		.value;
																formik.setFieldValue(
																	`infoVendas[${index}].ncm.id`,
																	selectedNcm,
																);
															}}
															value={
																linha?.ncm?.id
															}
															placeholder="Selecione um NCM"
															disabled={true}
														/>
														{formik.errors
															.infoVendas?.[index]
															?.ncm && (
															<span
																className={
																	styles.error
																}
															>
																{
																	formik
																		.errors
																		.infoVendas[
																		index
																	].ncm
																}
															</span>
														)}
													</div>
												</div>
												<CustomTextField
													id={`infoVendas[${index}].produtoIncentivado`}
													name={`infoVendas[${index}].produtoIncentivado`}
													label=""
													col={2}
													formik={formik}
													disabled={true}
													required
													error={
														!!formik.errors
															?.infoVendas?.[
															index
														]?.produtoIncentivado
													}
													value={
														linha.produtoIncentivado
													}
													onChange={(ev) =>
														formik.setFieldValue(
															`infoVendas[${index}].produtoIncentivado`,
															ev.target.value,
														)
													}
												/>
												<Autocomplete
													id={`infoVendas[${index}].unidadeMedida`}
													options={unidadeMedida}
													disableListWrap
													className={styles.col2}
													placeholder="Selecione uma unidade de medida"
													disabled={true}
													disableCloseOnSelect
													getOptionLabel={(option) =>
														option.descricao
													}
													value={
														unidadeMedida.find(
															(option) =>
																option.id ===
																linha
																	.unidadeMedida
																	?.id,
														) || null
													}
													onChange={(_, newValue) => {
														formik.setFieldValue(
															`infoVendas[${index}].unidadeMedida`,
															newValue,
														);
													}}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Unidade de Medida"
															placeholder="Selecione uma unidade de medida"
															error={
																!!formik.errors
																	?.infoVendas?.[
																	index
																]?.unidadeMedida
															}
															helperText={
																formik.errors
																	?.infoVendas?.[
																	index
																]?.unidadeMedida
																	? "Campo Obrigatório!"
																	: ""
															}
														/>
													)}
												/>
												<NumericMask
													id={`infoVendas[${index}].quantidadeInterna`}
													name={`infoVendas[${index}].quantidadeInterna`}
													formik={formik}
													label=""
													error={
														!!formik.errors
															?.infoVendas?.[
															index
														]?.quantidadeInterna
													}
													col={2}
													disabled={true}
													required
													value={
														linha.quantidadeInterna ===
														0
															? ""
															: linha.quantidadeInterna
													}
													onChange={(ev) =>
														formik.setFieldValue(
															`infoVendas[${index}].quantidadeInterna`,
															parseFloat(
																ev.target.value,
															) || 0,
														)
													}
												/>
												<NumericMask
													id={`infoVendas[${index}].quantidadeInterestadual`}
													name={`infoVendas[${index}].quantidadeInterestadual`}
													formik={formik}
													label=""
													col={2}
													disabled={true}
													error={
														!!formik.errors
															?.infoVendas?.[
															index
														]
															?.quantidadeInterestadual
													}
													required
													value={
														linha.quantidadeInterestadual ===
														0
															? ""
															: linha.quantidadeInterestadual
													}
													onChange={(ev) =>
														formik.setFieldValue(
															`infoVendas[${index}].quantidadeInterestadual`,
															parseFloat(
																ev.target.value,
															) || 0,
														)
													}
												/>
											</div>
										),
									)}
								</>
							)}
						</FieldArray>
					</div>
				</Card>
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
							setStep(4);
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							});
						}}
					>
						Anterior
					</Button>
					{!showButton && (
						<Button
							type="submit"
							variant="contained"
							className={styles.primaryButton}
						>
							Salvar
						</Button>
					)}
				</div>
			</div>
		</form>
	);
}

export default step5;
