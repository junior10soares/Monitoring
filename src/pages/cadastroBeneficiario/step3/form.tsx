import {
	Button,
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
import { useLocation, useOutletContext } from "react-router-dom";
import { ISubmodulo } from "submodulo";
import { IValorFundo } from "valorFundo";
import NumericMask from "../../../components/numericMask";
import { getAllIncentivosFiscais } from "../../../services/incentivoFiscal";
import { getAllSubmodulosByInscricaoEstadual } from "../../../services/submodulo";
import { formatBRCurrency } from "../../../utils/Currency";
import { monthsData } from "../../../utils/DateTime";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step3Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step3({ setStep, formik }: step3Type) {
	const [incentivosFiscais, setIncentivosFiscais] = useState<
		IIncentivoFiscal[]
	>([]);
	const [submodulos, setSubmodulos] = useState<ISubmodulo[]>([]);
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
			setSubmodulos(submds);
			setIsLoading(false);
		})();
	}, []);

	function loadData() {
		const localItem = localStorage.getItem("step3");
		if (localItem) {
			formik.setValues(JSON.parse(localItem));
		}
	}

	const total = useMemo(() => {
		return formik.values.valoresFundo?.reduce(
			(totalFundo, item: IValorFundo) =>
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
	}, [formik.values.valoresFundo]);

	return (
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
						<FormControl className="col3">
							<InputLabel required id="incentivoFiscal">
								Incentivo Fiscal
							</InputLabel>
							<Select
								name="incentivoFiscal"
								label="Incentivo Fiscal"
								labelId="id"
								placeholder="Selecione um incentivo"
								value={formik.values.incentivoFiscal?.id}
								fullWidth
								disabled={isView}
								onChange={(e) => {
									formik.setFieldValue("valoresFundo", null);
									formik.setFieldValue(
										e.target.name,
										incentivosFiscais.find(
											(i) =>
												i.id ===
												(typeof e.target.value ===
												"string"
													? parseInt(e.target.value)
													: e.target.value),
										),
									);
								}}
							>
								{incentivosFiscais.map(
									(
										{ id, sigla }: IIncentivoFiscal,
										index,
									) => {
										return (
											<MenuItem key={index} value={id}>
												{sigla}
											</MenuItem>
										);
									},
								)}
							</Select>
						</FormControl>
						<FormControl className="col3">
							<InputLabel required id="submodulo">
								Submódulo
							</InputLabel>
							<Select
								name="submodulo"
								label="Submódulo"
								labelId="submodulo"
								placeholder="Selecione um Submodulo"
								value={formik.values?.submodulo}
								fullWidth
								disabled={isView}
								onChange={formik.handleChange}
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
											<MenuItem
												key={index}
												value={codgBeneficio}
											>
												{nomeBeneficio}
											</MenuItem>
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
							col={6}
							onChange={formik.handleChange}
							required={false}
							disabled={isView}
							value={formik.values?.vendaAnualInterna ?? ""}
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
							required={false}
							disabled={isView}
							value={formik.values?.vendaAnualInterestadual ?? ""}
							className={`${styles.tableInput}`}
						/>
						{formik?.values?.incentivoFiscal?.fundos?.length >
							0 && (
							<>
								<div className={styles.monthsTitle}>
									<span>Mês referência</span>
									{formik.values?.incentivoFiscal?.fundos?.map(
										({ sigla }: IFundo) => {
											return <span>{sigla}</span>;
										},
									)}
								</div>
								{monthsData.map(({ codigo, label }) => {
									return (
										<>
											<span
												className={`${styles.col3} ${styles.monthTitle}`}
											>
												{label}
											</span>
											{formik.values?.incentivoFiscal?.fundos?.map(
												({ sigla, id }: IFundo) => {
													return (
														<NumericMask
															id={`${sigla}-valor`}
															name={`${sigla}-valor`}
															formik={formik}
															disabled={isView}
															col={Math.ceil(
																8 /
																	formik
																		.values
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
																	formik.values?.valoresFundo?.find(
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
																	formik.values?.valoresFundo?.filter(
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
																formik.setFieldValue(
																	"valoresFundo",
																	newValoresFundos,
																);
															}}
															required={false}
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
																] ?? 0
															}
															className={`${styles.tableInput}`}
														/>
													);
												},
											)}
										</>
									);
								})}
								<div className={styles.totals}>
									{formik.values.incentivoFiscal.fundos.map(
										({ sigla, id }: IFundo) => {
											return (
												<span
													className={
														styles.monthTitle
													}
												>
													Valor Total {sigla}:
													{formatBRCurrency(
														monthsData.reduce(
															(total, item) =>
																total +
																parseFloat(
																	formik.values.valoresFundo?.find(
																		(i) =>
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

export default step3;
