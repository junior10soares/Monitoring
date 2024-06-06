import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Autocomplete,
	Button,
	Card,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CustomTextField from "../../../components/customTextField";
import NumericMask from "../../../components/numericMask";
import TreeDropdown from "../../../components/treeDropdown";
import { getAllIncentivosFiscais } from "../../../services/incentivoFiscal";
import { getAllNcms } from "../../../services/ncmService";
import { getAllSubmodulosByInscricaoEstadual } from "../../../services/submodulo";
import { formatBRCurrency } from "../../../utils/Currency";
import { monthsData } from "../../../utils/DateTime";
import { isEmpty } from "../../../utils/Global";
import { unidadesDeMedida } from "../../../utils/Unm";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";
import { getUnidadeMedida } from "../../../services/beneficiario";

type step5Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step5({ setStep, formik }: step5Type) {
	const [ncms, setNcms] = useState([]);
	const [incentivosFiscais, setIncentivosFiscais] = useState<
		IIncentivoFiscal[]
	>([]);
	const [submodulos, setSubmodulos] = useState<ISubmodulo[]>([]);
	const [isLoading, setIsLoading] = useOutletContext();
	const [unidadeMedida, setUnidadeMedida] = useState([]);
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		(async function fetch() {
			const listUnidadeMedida = await getUnidadeMedida();
			setUnidadeMedida(listUnidadeMedida)
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
			setSubmodulos(submds);
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
		var localItem2 = localStorage.getItem("step2");
		var localItem3 = localStorage.getItem("step3");
		var localItem4 = localStorage.getItem("step4");
		if (localItem2 && localItem3 && localItem4) {
			formik.setValues({
				...JSON.parse(localItem2),
				...JSON.parse(localItem3),
				...JSON.parse(localItem4),
			});
		}
	}

	console.log("step5", formik.values)

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
								className={`${styles.col3} ${styles.monthTitle}`}
							>
								Empregos direto (mulher)
							</span>
						</div>
						{monthsData.map(({ codigo, label }, index) => {
							return (
								<div className={styles.TableInputs}>
									<span
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

					<Accordion sx={{ margin: "1rem" }}>
						<AccordionSummary
							expandIcon={
								<ArrowDownwardIcon sx={{ color: "white" }} />
							}
							aria-controls="panel1-content"
							id="panel1-header"
							className={styles.accordionTitle}
						>
							<Typography>
								{formik.values.incentivoFiscal.sigla} -{" "}
								{formik.values.submodulo}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Card className={styles.innerCard}>
								<h1 className={styles.title}>Sub Módulos</h1>
								<h3 className={styles.subtitle}>
									Preencha corretamente o formulário
								</h3>
								<h3 className={styles.yearTitle}>
									Ano de referência
								</h3>
								<h3 className={styles.year}>
									{new Date().getFullYear() - 1}
								</h3>
								<div className={styles.beneficiarioForm}>
									<FormControl className="col6">
										<InputLabel
											required
											id="incentivoFiscal"
										>
											Incentivo Fiscal
										</InputLabel>
										<Select
											name="incentivoFiscal"
											label="Incentivo Fiscal"
											labelId="id"
											placeholder="Selecione um incentivo"
											value={
												formik.values.incentivoFiscal
													?.id
											}
											required
											fullWidth
											disabled={true}
										>
											{incentivosFiscais.map(
												(
													{
														id,
														sigla,
													}: IIncentivoFiscal,
													index,
												) => {
													return (
														<MenuItem
															key={index}
															value={id}
														>
															{sigla}
														</MenuItem>
													);
												},
											)}
										</Select>
									</FormControl>
									<FormControl className="col6">
										<InputLabel required id="submodulo">
											{formik.values.submodulo
												? ""
												: "Submódulo"}
										</InputLabel>
										<Select
											name="submodulo"
											label="Submódulo"
											labelId="submodulo"
											placeholder="Selecione um Submodulo"
											value={formik.values?.submodulo}
											fullWidth
											required
											disabled={true}
										>
											{submodulos.map(
												(
													{
														codgBeneficio,
														nomeBeneficio,
													}: ISubmodulo,
													index,
												) => {
													return (
														codgBeneficio && (
															<MenuItem
																key={index}
																value={
																	codgBeneficio
																}
															>
																{codgBeneficio}{" "}
																-{" "}
																{nomeBeneficio}
															</MenuItem>
														)
													);
												},
											)}
										</Select>
									</FormControl>
									<NumericMask
										id="vendaAnualInterna"
										name="vendaAnualInterna"
										formik={formik}
										prefix="R$"
										fixedDecimalScale
										label="Venda anual interna"
										required
										col={6}
										onChange={formik.handleChange}
										disabled={true}
										value={
											formik.values?.vendaAnualInterna ??
											""
										}
										className={`${styles.tableInput}`}
									/>
									<NumericMask
										id="vendaAnualInterestadual"
										name="vendaAnualInterestadual"
										formik={formik}
										prefix="R$"
										fixedDecimalScale
										label="Venda anual interestadual"
										col={6}
										onChange={formik.handleChange}
										required
										disabled={true}
										value={
											formik.values
												?.vendaAnualInterestadual ?? ""
										}
										className={`${styles.tableInput}`}
									/>
									{formik?.values?.incentivoFiscal?.fundos
										?.length > 0 && (
											<>
												<div className={styles.monthsTitle}>
													<span
														className={`${styles.col2} ${styles.monthTitle}`}
													>
														Mês referência
													</span>
													{formik.values?.incentivoFiscal?.fundos?.map(
														({ sigla }: IFundo) => {
															return (
																<span
																	className={`${styles?.[
																		`col${Math.ceil(
																			10 /
																			formik
																				.values
																				?.incentivoFiscal
																				?.fundos
																				.length,
																		)}`
																	]
																		} ${styles.monthTitle
																		}`}
																>
																	{sigla}
																</span>
															);
														},
													)}
												</div>
												{monthsData.map(
													({ codigo, label }) => {
														return (
															<div
																className={
																	styles.TableInputs
																}
															>
																<span
																	className={`${styles.col2} ${styles.monthTitle}`}
																>
																	{label}
																</span>
																{formik.values?.incentivoFiscal?.fundos?.map(
																	({
																		sigla,
																		id,
																	}: IFundo) => {
																		return (
																			<NumericMask
																				id={`${sigla}-valor`}
																				name={`${sigla}-valor`}
																				formik={
																					formik
																				}
																				disabled={
																					true
																				}
																				col={Math.ceil(
																					10 /
																					formik
																						.values
																						?.incentivoFiscal
																						?.fundos
																						.length,
																				)}
																				prefix="R$"
																				fixedDecimalScale
																				label=""
																				required
																				value={
																					formik.values?.valoresFundo?.find(
																						(
																							i: IValorFundo,
																						) =>
																							i
																								.fundoIncentivo
																								.id ===
																							id,
																					)?.[
																					`${codigo}Valor`
																					]
																				}
																				className={`${styles.tableInput}`}
																			/>
																		);
																	},
																)}
															</div>
														);
													},
												)}
											</>
										)}
								</div>
							</Card>
						</AccordionDetails>
					</Accordion>
				</Card>
			</div>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Informações de venda anual</h1>
					<div className={styles.beneficiarioForm}>
						<div className={styles.tableHeader}>
							<span
								className={`${styles.col3} ${styles.monthTitles}`}
							>
								NCM
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitles}`}
							>
								Produto incentivado
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitles}`}
							>
								Unidade de medida
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitles}`}
							>
								Quantidade interna
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitles}`}
							>
								Quant. Interestadual
							</span>
							<span className={styles.col1}></span>
						</div>
						<div
							className={`${styles.TableInputs}`}
						>
							{/* <div className={`${styles.col3} card`}>
								<TreeDropdown
									data={ncms}
									value={
										formik.values?.ncm
									}
									onChange={(ev) => {
										const selectedNcm = ev.target.value;
										formik.setFieldValue('ncm', selectedNcm);
									}}
									disabled={true}
									placeholder="Selecione um NCM"
								/>
							</div>

							<CustomTextField
								id={`produto-incentivado`}
								name={`produto-incentivado`}
								label=""
								col={2}
								formik={formik}
								disabled={true}
								error={!!formik.errors.infoVendas}
								value={
									formik.values?.produtoIncentivado
								}
							/>
							<Autocomplete
								id="unidadeMedida"
								options={unidadeMedida}
								disableListWrap
								className={styles.col2}
								placeholder="Selecione uma unidade de medida"
								disabled={true}
								disableCloseOnSelect
								getOptionLabel={(option) => `${option.descricao}`}
								value={unidadeMedida.find(option => option.codigo === formik.values?.unidadeMedida?.codigo) || null}
								onChange={(_, option) => {
									formik.setFieldValue(`unidadeMedida`, option);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Unidade de Medida"
										placeholder="Selecione uma unidade de medida"
										error={!!formik.errors.infoVendas}
									/>
								)}
							/>
							<NumericMask
								id={`quantidade-interna`}
								name={`quantidade-interna`}
								formik={formik}
								label=""
								error={!!formik.errors.infoVendas}
								col={2}
								disabled={true}
								required={false}
								value={
									formik.values?.quantidadeInterna
								}
								onChange={(ev: { target: { value: string }; }) =>
									formik.setFieldValue(
										`quantidadeInterna`,
										parseFloat(ev.target.value) || 0,
									)
								}
							/>
							<NumericMask
								id={`quantidade-interestadual`}
								name={`quantidade-interestadual`}
								formik={formik}
								label=""
								col={2}
								disabled={true}
								error={!!formik.errors.infoVendas}
								required={false}
								value={
									formik.values?.quantidadeInterestadual
								}
								onChange={(ev: { target: { value: string }; }) =>
									formik.setFieldValue(
										`quantidadeInterestadual`,
										parseFloat(ev.target.value) || 0,
									)
								}
							/> */}
							{Array.isArray(formik.values.infoVendas) && formik.values.infoVendas.map((linha, index) => (
								<div key={index} style={{ display: 'flex' }}>
									<div className={styles.TableInputs}>
										<div className={`${styles.col3} card`}>
											<TreeDropdown
												data={ncms}
												onChange={(ev) => {
													const selectedNcm = ev.target.value;
													formik.setFieldValue(`infoVendas.${index}.ncm`, selectedNcm);
												}}
												value={linha.ncm}
												placeholder="Selecione um NCM"
											/>
										</div>
										<CustomTextField
											id={`produto-incentivado-${index}`}
											name={`infoVendas.${index}.produtoIncentivado`}
											label=""
											col={2}
											formik={formik}
											disabled
											error={!!formik.errors.infoVendas?.[index]?.produtoIncentivado}
											value={linha.produtoIncentivado}
											onChange={(ev) =>
												formik.setFieldValue(
													`infoVendas.${index}.produtoIncentivado`,
													ev.target.value
												)
											}
										/>
										<Autocomplete
											id={`unidadeMedida-${index}`}
											options={unidadeMedida}
											disableListWrap
											className={styles.col2}
											placeholder="Selecione uma unidade de medida"
											disabled
											disableCloseOnSelect
											getOptionLabel={(option) => option.descricao}
											value={unidadeMedida.find(option => option.id === linha.unidadeMedida?.id) || null}
											onChange={(_, newValue) => {
												formik.setFieldValue(`infoVendas.${index}.unidadeMedida`, newValue);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Unidade de Medida"
													placeholder="Selecione uma unidade de medida"
													error={!!formik.errors.infoVendas?.[index]?.unidadeMedida}
												/>
											)}
										/>
										<NumericMask
											id={`quantidade-interna-${index}`}
											name={`infoVendas.${index}.quantidadeInterna`}
											formik={formik}
											label=""
											error={!!formik.errors.infoVendas?.[index]?.quantidadeInterna}
											col={2}
											disabled
											required={false}
											value={linha.quantidadeInterna}
											onChange={(ev) =>
												formik.setFieldValue(
													`infoVendas.${index}.quantidadeInterna`,
													parseFloat(ev.target.value) || 0
												)
											}
										/>
										<NumericMask
											id={`quantidade-interestadual-${index}`}
											name={`infoVendas.${index}.quantidadeInterestadual`}
											formik={formik}
											label=""
											col={2}
											disabled
											error={!!formik.errors.infoVendas?.[index]?.quantidadeInterestadual}
											required={false}
											value={linha.quantidadeInterestadual}
											onChange={(ev) =>
												formik.setFieldValue(
													`infoVendas.${index}.quantidadeInterestadual`,
													parseFloat(ev.target.value) || 0
												)
											}
										/>
									</div>
								</div>
							))}
							<div
								className={`${styles.col1} ${styles.removeButtonDiv}`}
							></div>
						</div>
					</div>
				</Card>
				<div className={`${styles.col12} ${styles.buttonsRigth}`}>
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
						Voltar
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
