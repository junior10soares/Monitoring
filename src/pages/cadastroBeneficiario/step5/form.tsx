import {
	Autocomplete,
	Button,
	Card,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";

import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import CustomTextField from "../../../components/customTextField";
import NumericMask from "../../../components/numericMask";
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
							<span className={styles.col3}>NCM</span>
							<span className={styles.col2}>
								Produto incentivado
							</span>
							<span className={styles.col2}>
								Unidade de medida
							</span>
							<span className={styles.col3}>
								Quantidade interna
							</span>
							<span className={styles.col2}>
								Quant. Interestadual
							</span>
						</div>
						{Object.keys(formik.values.infoVendas ?? {}).map(
							(item, index) => (
								<>
									<Autocomplete
										id="ncm"
										options={ncms}
										disableListWrap
										className={styles.col3}
										disabled
										placeholder="Selecione um NCM"
										disableCloseOnSelect
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
											/>
										)}
									/>

									<CustomTextField
										id={`${item}-produto-incentivado`}
										name={`${item}-produto-incentivado`}
										label=""
										col={2}
										disabled
										formik={formik}
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
									<Select
										id="unidadeMedida"
										name="unidadeMedida"
										label=""
										disabled
										className={styles.col2}
										labelId="unidadeMedida"
										placeholder="Selecione uma cidade"
										value={
											formik.values?.infoVendas[index]
												?.unidadeMedida
										}
										onChange={(ev) =>
											formik.setFieldValue(
												`infoVendas[${index}].unidadeMedida`,
												ev.target.value,
											)
										}
									>
										{unidadesDeMedida?.map(
											(
												{
													key,
													value,
												}: {
													key: string;
													value: string;
												},
												index,
											) => {
												return (
													<MenuItem
														key={index}
														value={key}
													>
														{value}
													</MenuItem>
												);
											},
										)}
									</Select>
									<NumericMask
										id={`${item}-quantidade-interna`}
										name={`${item}-quantidade-interna`}
										formik={formik}
										label=""
										col={2}
										disabled
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
										disabled
										col={2}
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
								</>
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
