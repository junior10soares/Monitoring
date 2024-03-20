import { Autocomplete, Button, Card, TextField } from "@mui/material";

import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import CustomTextField from "../../../components/customTextField";
import NumericMask from "../../../components/numericMask";
import TreeDropdown from "../../../components/treeDropdown";
import { getAllNcms } from "../../../services/ncmService";
import { formatBRCurrency } from "../../../utils/Currency";
import { monthsData } from "../../../utils/DateTime";
import { isEmpty } from "../../../utils/Global";
import { unidadesDeMedida } from "../../../utils/Unm";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step5Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step5({ setStep, formik }: step5Type) {
	const [ncms, setNcms] = useState([]);
	useEffect(() => {
		loadData();
		(async function fetch() {
			const list = await getAllNcms();
			setNcms(list);
		})();
	}, []);

	function loadData() {
		var localItem2 = localStorage.getItem("step2");
		var localItem4 = localStorage.getItem("step4");
		if (localItem2 && localItem4) {
			formik.setValues({
				...JSON.parse(localItem2),
				...JSON.parse(localItem4),
			});
		}
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Dados do beneficiário</h1>
					<h3 className={styles.subtitle}>
						Preencha corretamente o formulário
					</h3>
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
								<div
									key={index}
									className={`${styles.TableInputs}`}
								>
									<div className={styles.col3}>
										<TreeDropdown
											data={ncms}
											onChange={(_, value) => {
												formik.setFieldValue(
													`infoVendas[${index}].ncm`,
													value[0].value,
												);
											}}
											placeholder="Selecione um NCM"
										/>
									</div>

									<CustomTextField
										id={`${item}-produto-incentivado`}
										name={`${item}-produto-incentivado`}
										label=""
										col={2}
										formik={formik}
										disabled={true}
										error={!!formik.errors.infoVendas}
										value={
											formik.values?.infoVendas[index]
												?.produtoIncentivado
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
										disabled={true}
										disableCloseOnSelect
										getOptionLabel={(option) =>
											`${option.key} - ${option.value}`
										}
										value={
											formik.values?.infoVendas[index]
												?.unidadeMedida
										}
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
										disabled={true}
										required={false}
										value={
											formik.values?.infoVendas[index]
												?.quantidadeInterna
										}
									/>
									<NumericMask
										id={`${item}-quantidade-interestadual`}
										name={`${item}-quantidade-interestadual`}
										formik={formik}
										label=""
										col={2}
										disabled={true}
										error={!!formik.errors.infoVendas}
										required={false}
										value={
											formik.values?.infoVendas[index]
												?.quantidadeInterestadual
										}
									/>
									<div
										className={`${styles.col1} ${styles.removeButtonDiv}`}
									></div>
								</div>
							),
						)}
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
					<Button
						type="submit"
						variant="contained"
						className={styles.primaryButton}
					>
						Salvar
					</Button>
				</div>
			</div>
		</form>
	);
}

export default step5;
