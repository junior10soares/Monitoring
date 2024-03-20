import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveIcon from "@mui/icons-material/DeleteOutline";
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
import { FormikProps } from "formik";
import { INcm } from "ncm";
import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import CustomTextField from "../../../components/customTextField";
import NumericMask from "../../../components/numericMask";
import { getAllNcms } from "../../../services/ncmService";
import { Messages } from "../../../utils/Messages";
import { unidadesDeMedida } from "../../../utils/Unm";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step4Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step4({ setStep, formik }: step4Type) {
	const [ncms, setNcms] = useState([]);
	const { pathname } = useLocation();
	const [isLoading, setIsLoading] = useOutletContext();
	const isView = pathname?.includes("/view");

	useEffect(() => {
		loadData();
		(async function fetch() {
			setIsLoading(true);
			const list = await getAllNcms();
			setNcms(list);
			setIsLoading(false);
		})();
	}, []);

	function loadData() {
		const localItem = localStorage.getItem("step4");
		if (localItem) {
			formik.setValues(JSON.parse(localItem));
		}
	}

	function addLinha(ev) {
		ev.preventDefault();
		var lines = formik.values.infoVendas;
		const lastLinha = lines.slice(-1)[0];
		if (
			!lastLinha.ncm ||
			!lastLinha.produtoIncentivado ||
			!lastLinha.quantidadeInterestadual ||
			!lastLinha.quantidadeInterna ||
			!lastLinha.unidadeMedida
		) {
			formik.setFieldError(
				"infoVendas",
				Messages.form.lastElementIsEmpty,
			);
		} else {
			lines.push({
				ncm: null,
				produtoIncentivado: "",
				quantidadeInterestadual: "",
				quantidadeInterna: "",
				unidadeMedida: "",
			});
			formik.setFieldValue("infoVendas", lines);
		}
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Informações de venda anual</h1>
					<h3 className={styles.subtitle}>
						Preencha corretamente o formulário
					</h3>
					<div className={styles.beneficiarioForm}>
						<div className={styles.tableHeader}>
							<span
								className={`${styles.col3} ${styles.monthTitle}`}
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
							<span className={styles.col1}></span>
						</div>
						{Object.keys(formik.values?.infoVendas ?? {})?.map(
							(item, index) => (
								<div className={`${styles.TableInputs}`}>
									{/* <Autocomplete
										id="ncm"
										options={ncms}
										disableListWrap
										className={styles.col3}
										placeholder="Selecione um NCM"
										disabled={isView}
										disableCloseOnSelect
										renderOption={(props, option: INcm) => {
											return (
												<Accordion>
													<Accordion>
														<AccordionSummary
															expandIcon={
																<ArrowDownwardIcon />
															}
														>
															<Typography>
																{option.codigo}{" "}
																-{" "}
																{
																	option.descricao
																}
															</Typography>
														</AccordionSummary>
														<AccordionDetails>
															{option.children &&
																option.children
																	.length >
																	0 &&
																option.children.map(
																	(
																		avo: INcm,
																	) => (
																		<Accordion>
																			<AccordionSummary
																				expandIcon={
																					<ArrowDownwardIcon />
																				}
																			>
																				<Typography>
																					{
																						avo.codigo
																					}{" "}
																					-{" "}
																					{
																						avo.descricao
																					}
																				</Typography>
																			</AccordionSummary>
																			<AccordionDetails>
																				{avo.children &&
																					avo
																						.children
																						.length >
																						0 &&
																					avo.children.map(
																						(
																							pai: INcm,
																						) => (
																							<Accordion>
																								<AccordionSummary
																									expandIcon={
																										<ArrowDownwardIcon />
																									}
																								>
																									<Typography>
																										{
																											pai.codigo
																										}{" "}
																										-{" "}
																										{
																											pai.descricao
																										}
																									</Typography>
																								</AccordionSummary>
																								<AccordionDetails>
																									<ul>
																										{pai.children &&
																											pai
																												.children
																												.length >
																												0 &&
																											pai.children.map(
																												(
																													filho: INcm,
																												) => (
																													<li
																														{...props}
																													>
																														{
																															filho.codigo
																														}{" "}
																														-{" "}
																														{
																															filho.descricao
																														}
																													</li>
																												),
																											)}
																									</ul>
																								</AccordionDetails>
																							</Accordion>
																						),
																					)}
																			</AccordionDetails>
																		</Accordion>
																	),
																)}
														</AccordionDetails>
													</Accordion>
												</Accordion>
											);
										}}
										getOptionLabel={(option) =>
											`${option.codigo} - ${option.descricao}`
										}
										value={
											formik.values?.infoVendas[index]
												?.ncm
										}
										onChange={(_, value) => {
											formik.setFieldValue(
												`infoVendas[${index}].ncm`,
												value,
											);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												label="NCM"
												placeholder="Selecione um NCM"
												error={
													!!formik.errors.infoVendas
												}
											/>
										)}
									/> */}

									<FormControl className="col3">
										<InputLabel required id="ncm">
											NCM
										</InputLabel>
										<Select
											id="ncm"
											name="ncm"
											label="NCM"
											labelId="municipio"
											placeholder="Selecione um Ncm"
											value={
												formik.values?.infoVendas[index]
													?.ncm
											}
											fullWidth
											onChange={formik.handleChange}
											disabled={isView}
										>
											{ncms.map((bisavos: INcm) => (
												<Accordion>
													<Accordion>
														<AccordionSummary
															expandIcon={
																<ArrowDownwardIcon />
															}
														>
															<Typography>
																{bisavos.codigo}{" "}
																-{" "}
																{
																	bisavos.descricao
																}
															</Typography>
														</AccordionSummary>
														<AccordionDetails>
															{bisavos.children &&
																bisavos.children
																	.length >
																	0 &&
																bisavos.children.map(
																	(
																		avo: INcm,
																	) => (
																		<Accordion>
																			<AccordionSummary
																				expandIcon={
																					<ArrowDownwardIcon />
																				}
																			>
																				<Typography>
																					{
																						avo.codigo
																					}{" "}
																					-{" "}
																					{
																						avo.descricao
																					}
																				</Typography>
																			</AccordionSummary>
																			<AccordionDetails>
																				{avo.children &&
																					avo
																						.children
																						.length >
																						0 &&
																					avo.children.map(
																						(
																							pai: INcm,
																						) => (
																							<Accordion>
																								<AccordionSummary
																									expandIcon={
																										<ArrowDownwardIcon />
																									}
																								>
																									<Typography>
																										{
																											pai.codigo
																										}{" "}
																										-{" "}
																										{
																											pai.descricao
																										}
																									</Typography>
																								</AccordionSummary>
																								<AccordionDetails>
																									{pai.children &&
																										pai
																											.children
																											.length >
																											0 &&
																										pai.children.map(
																											(
																												filho: INcm,
																											) => (
																												<MenuItem
																													key={
																														filho.id
																													}
																													value={
																														filho.id
																													}
																												>
																													{
																														filho.codigo
																													}{" "}
																													-{" "}
																													{
																														filho.descricao
																													}
																												</MenuItem>
																											),
																										)}
																								</AccordionDetails>
																							</Accordion>
																						),
																					)}
																			</AccordionDetails>
																		</Accordion>
																	),
																)}
														</AccordionDetails>
													</Accordion>
												</Accordion>
											))}
										</Select>
									</FormControl>

									<CustomTextField
										id={`${item}-produto-incentivado`}
										name={`${item}-produto-incentivado`}
										label=""
										col={2}
										formik={formik}
										disabled={isView}
										error={!!formik.errors.infoVendas}
										value={
											formik.values?.infoVendas[index]
												?.produtoIncentivado
										}
										onChange={(ev: {
											target: { value: any };
										}) =>
											formik.setFieldValue(
												`infoVendas[${index}].produtoIncentivado`,
												ev.target.value,
											)
										}
									/>
									<Autocomplete
										id="unidadeMedida"
										options={unidadesDeMedida.sort(
											function (a, b) {
												if (a.value < b.value) {
													return -1;
												}
												if (a.value > b.value) {
													return 1;
												}
												return 0;
											},
										)}
										disableListWrap
										className={styles.col2}
										placeholder="Selecione uma cidade"
										disabled={isView}
										disableCloseOnSelect
										getOptionLabel={(option) =>
											`${option.key} - ${option.value}`
										}
										value={
											formik.values?.infoVendas[index]
												?.unidadeMedida?.value
										}
										onChange={(_, value) => {
											formik.setFieldValue(
												`infoVendas[${index}].unidadeMedida`,
												value,
											);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Unidade de Medida"
												placeholder="Selecione uma unidade de medida"
												error={
													!!formik.errors.infoVendas
												}
											/>
										)}
									/>
									<NumericMask
										id={`${item}-quantidade-interna`}
										name={`${item}-quantidade-interna`}
										formik={formik}
										label=""
										error={!!formik.errors.infoVendas}
										col={2}
										disabled={isView}
										required={false}
										value={
											formik.values?.infoVendas[index]
												?.quantidadeInterna
										}
										onChange={(ev: {
											target: { value: string };
										}) =>
											formik.setFieldValue(
												`infoVendas[${index}].quantidadeInterna`,
												ev.target.value,
											)
										}
									/>
									<NumericMask
										id={`${item}-quantidade-interestadual`}
										name={`${item}-quantidade-interestadual`}
										formik={formik}
										label=""
										col={2}
										disabled={isView}
										error={!!formik.errors.infoVendas}
										required={false}
										value={
											formik.values?.infoVendas[index]
												?.quantidadeInterestadual
										}
										onChange={(ev: {
											target: { value: string };
										}) =>
											formik.setFieldValue(
												`infoVendas[${index}].quantidadeInterestadual`,
												ev.target.value,
											)
										}
									/>
									<div
										className={`${styles.col1} ${styles.removeButtonDiv}`}
									>
										{index !== 0 && !isView && (
											<RemoveIcon
												className={styles.removeIcon}
												onClick={(ev) => {
													ev.preventDefault();
													const newArray = [
														...formik.values
															.infoVendas,
													];
													newArray.splice(index, 1);
													formik.setFieldValue(
														"infoVendas",
														newArray,
													);
												}}
											/>
										)}
									</div>
								</div>
							),
						)}
						<span className={`${styles.error} ${styles.col12}`}>
							{formik.errors.infoVendas as string | undefined}
						</span>

						{!isView && (
							<Button
								type="button"
								variant="contained"
								className={styles.primaryButton}
								onClick={addLinha}
							>
								<AddIcon />
								Adicionar linhas e colunas
							</Button>
						)}
					</div>
				</Card>

				<div className={`${styles.col12} ${styles.buttonsRigth}`}>
					<Button
						type="button"
						variant="contained"
						className={styles.secondaryButton}
						onClick={() => {
							setStep(3);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					>
						Voltar
					</Button>
					<Button
						type="submit"
						variant="contained"
						className={styles.primaryButton}
					>
						Continuar
					</Button>
				</div>
			</div>
		</form>
	);
}

export default step4;
