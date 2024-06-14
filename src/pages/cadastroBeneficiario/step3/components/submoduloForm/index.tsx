import {
	Alert,
	Card,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { FormikProps } from "formik";
import { IFundo } from "fundo";
import { IIncentivoFiscal } from "incentivoFiscal";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ISubmodulo } from "submodulo";
import { IValorFundo } from "valorFundo";
import NumericMask from "../../../../../components/numericMask";
import { formatBRCurrency } from "../../../../../utils/Currency";
import { monthsData } from "../../../../../utils/DateTime";
import { inputs } from "../../inputs";
import styles from "./styles.module.scss";

type step3Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
	submodulos: ISubmodulo[];
	incentivosFiscais: IIncentivoFiscal[];
	index: number;
	forceIsView?: boolean;
};

function SubmoduloForm({
	formik,
	submodulos,
	incentivosFiscais,
	index,
	forceIsView = false,
}: step3Type) {
	const { pathname } = useLocation();
	const [show, setShow] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const isView = pathname?.includes("/view");

	useEffect(() => {
		if (incentivosFiscais.length > 0) {
			handleChange(
				"incentivoFiscal",
				incentivosFiscais.find(
					(i) =>
						i.id ===
						formik.values.submodulos[index]?.incentivoFiscal?.id,
				),
			);
		}
	}, [incentivosFiscais]);

	useEffect(() => {
		if (
			!!formik.values.submodulos[index]?.submodulo &&
			!!formik.values.submodulos[index]?.incentivoFiscal
		) {
			const dirty = false;
			for (
				let forIndex = 0;
				forIndex < formik.values.submodulos.length;
				forIndex++
			) {
				const element = formik.values.submodulos[forIndex];
				if (
					forIndex !== index &&
					element.incentivoFiscal?.id ===
						formik.values.submodulos[index]?.incentivoFiscal?.id &&
					element.submodulo ===
						formik.values.submodulos[index]?.submodulo
				) {
					setAlertMessage(
						"Já existe um submódulo cadastrado com esse incentivo fiscal",
					);
					setShow(true);
					handleChange("submodulo", null);
					setTimeout(() => {
						setShow(false);
					}, 3000);
				}
			}
		}
	}, [
		formik.values.submodulos[index]?.incentivoFiscal,
		formik.values.submodulos[index]?.submodulo,
	]);

	const total = useMemo(() => {
		return formik.values.submodulos[index]?.valoresFundo?.reduce(
			(totalFundo: number, item: IValorFundo) =>
				totalFundo +
				parseFloat(
					Object.values(item)?.reduce(
						(totalItem, itemValue) =>
							totalItem +
							parseFloat(
								typeof itemValue !== "object" ? itemValue : "0",
							),
						0,
					),
				),
			0,
		);
	}, [formik.values.submodulos[index]?.valoresFundo]);

	function handleChange(name: string, value: any) {
		var arrayValue = formik.values.submodulos;
		var current: any = arrayValue[index];
		current[name] = value;
		arrayValue[index] = current;
		formik.setFieldValue("submodulos", arrayValue);
	}

	return (
		<>
			{show && (
				<Alert
					variant="filled"
					className={styles.alert}
					severity="error"
				>
					{alertMessage}
				</Alert>
			)}
			<form onSubmit={formik.handleSubmit}>
				<div className={styles.container}>
					<Card className={styles.card}>
						<h1 className={styles.title}>Sub Módulos</h1>
						<h3 className={styles.subtitle}>
							Preencha corretamente o formulário
						</h3>
						<h3 className={styles.yearTitle}>Ano de referência</h3>
						<h3 className={styles.year}>
							{new Date().getFullYear() - 1}
						</h3>
						<div className={styles.beneficiarioForm}>
							<FormControl className="col5">
								<InputLabel required id="incentivoFiscal">
									Incentivo Fiscal
								</InputLabel>
								<Select
									name="incentivoFiscal"
									label="Incentivo Fiscal"
									labelId="id"
									placeholder="Selecione um incentivo"
									value={
										formik.values.submodulos[index]
											?.incentivoFiscal?.id || ""
									}
									required
									fullWidth
									disabled={forceIsView || isView}
									onChange={(e) => {
										const selectedIncentivo =
											incentivosFiscais.find(
												(i) =>
													i.id ===
													parseInt(e.target.value),
											);
										handleChange(
											"incentivoFiscal",
											selectedIncentivo,
										);
									}}
									error={Boolean(
										formik.errors[index]?.incentivoFiscal,
									)}
								>
									{incentivosFiscais.map(
										(
											{ id, sigla }: IIncentivoFiscal,
											index,
										) => (
											<MenuItem key={index} value={id}>
												{sigla}
											</MenuItem>
										),
									)}
								</Select>
								{formik.errors.incentivoFiscal && (
									<span className={styles.error}>
										{
											formik.errors
												.incentivoFiscal as string
										}
									</span>
								)}
							</FormControl>
							<FormControl className="col5">
								<InputLabel required id="submodulo">
									Submódulo
								</InputLabel>
								<Select
									name="submodulo"
									label="Submódulo"
									labelId="submodulo"
									placeholder="Selecione um Submodulo"
									value={
										formik.values.submodulos[index]
											?.submodulo
									}
									fullWidth
									disabled={forceIsView || isView}
									onChange={(ev) => {
										handleChange(
											ev.target.name,
											ev.target.value,
										);
									}}
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
														value={codgBeneficio}
													>
														{codgBeneficio} -{" "}
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
								col={5}
								onChange={(e) => {
									const value = parseFloat(e.target.value);
									handleChange(
										e.target.name,
										isNaN(value) ? "" : value,
									);
								}}
								disabled={forceIsView || isView}
								value={
									formik.values.submodulos[index]
										?.vendaAnualInterna ?? ""
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
								col={5}
								onChange={(e) => {
									const value = parseFloat(e.target.value);
									handleChange(
										e.target.name,
										isNaN(value) ? "" : value,
									);
								}}
								required
								disabled={forceIsView || isView}
								value={
									formik.values.submodulos[index]
										?.vendaAnualInterestadual ?? ""
								}
								className={`${styles.tableInput}`}
							/>
							{formik.values.submodulos[index]?.incentivoFiscal
								?.fundos?.length > 0 && (
								<>
									<div className={styles.monthsTitle}>
										<span
											className={`${styles.col2} ${styles.monthTitle}`}
										>
											Mês referência
										</span>
										{formik.values.submodulos[
											index
										]?.incentivoFiscal?.fundos?.map(
											({ sigla }: IFundo) => {
												return (
													<span
														className={`${
															styles?.[
																`col${Math.ceil(
																	10 /
																		formik
																			.values
																			.submodulos[
																			index
																		]
																			?.incentivoFiscal
																			?.fundos
																			.length,
																)}`
															]
														} ${styles.monthTitle}`}
													>
														{sigla}
													</span>
												);
											},
										)}
									</div>
									{monthsData.map(({ codigo, label }) => {
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
												{formik.values.submodulos[
													index
												]?.incentivoFiscal?.fundos?.map(
													({ sigla, id }: IFundo) => {
														return (
															<NumericMask
																id={`${sigla}-valor`}
																name={`${sigla}-valor`}
																formik={formik}
																disabled={
																	forceIsView ||
																	isView
																}
																col={Math.ceil(
																	10 /
																		formik
																			.values
																			.submodulos[
																			index
																		]
																			?.incentivoFiscal
																			?.fundos
																			.length,
																)}
																prefix="R$"
																fixedDecimalScale
																label=""
																onChange={async (ev: {
																	target: {
																		value: string;
																	};
																}) => {
																	var newValorFundo:
																		| IValorFundo
																		| undefined =
																		formik.values.submodulos[
																			index
																		]?.valoresFundo?.find(
																			(
																				i: IValorFundo,
																			) =>
																				i
																					.fundoIncentivo
																					.id ===
																				id,
																		);
																	if (
																		!newValorFundo
																	)
																		newValorFundo =
																			{};
																	const newValoresFundos: IValorFundo[] =
																		formik.values.submodulos[
																			index
																		]?.valoresFundo?.filter(
																			(
																				i: IValorFundo,
																			) =>
																				i
																					.fundoIncentivo
																					.id !==
																				id,
																		) ?? [];

																	newValorFundo[
																		`${codigo}Valor`
																	] =
																		ev.target.value;
																	newValorFundo.fundoIncentivo =
																		{
																			id: id,
																			dataCadastro:
																				new Date().toDateString(),
																			dataAtualizacao:
																				new Date().toDateString(),
																		};

																	newValoresFundos.push(
																		newValorFundo,
																	);
																	handleChange(
																		"valoresFundo",
																		newValoresFundos,
																	);
																}}
																required
																value={
																	formik.values.submodulos[
																		index
																	]?.valoresFundo?.find(
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
									})}
									<div className={styles.totals}>
										{formik.values.submodulos[
											index
										].incentivoFiscal.fundos.map(
											({ sigla, id }: IFundo) => {
												return (
													<span
														className={
															styles.monthTitle
														}
														key={id}
													>
														Valor Total {sigla}:
														{formatBRCurrency(
															monthsData.reduce(
																(total, item) =>
																	total +
																	parseFloat(
																		formik.values.submodulos[
																			index
																		].valoresFundo?.find(
																			(
																				i,
																			) =>
																				i
																					.fundoIncentivo
																					.id ===
																				id,
																		)?.[
																			`${item.codigo}Valor`
																		] ?? 0,
																	),
																0,
															),
														)}
													</span>
												);
											},
										)}
										<span className={styles.monthTitle}>
											Valor Total:{" "}
											{formatBRCurrency(total ?? 0)}
										</span>
									</div>
								</>
							)}
						</div>
					</Card>
				</div>
			</form>
		</>
	);
}

export default SubmoduloForm;
