import { Button, Card } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect } from "react";
import NumericMask from "../../../components/numericMask";
import { formatBRCurrency } from "../../../utils/Currency";
import { monthsData } from "../../../utils/DateTime";
import { isEmpty } from "../../../utils/Global";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step2Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step2({ setStep, formik }: step2Type) {
	useEffect(() => {
		const localItem = localStorage.getItem("step2");
		if (localItem) {
			formik.setValues(JSON.parse(localItem));
		}
	}, []);

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
							<span>Mês referência</span>
							<span>Investimento mensal</span>
							<span>Empregos direto (homem)</span>
							<span>Empregos direto (mulher)</span>
						</div>
						{monthsData.map(({ codigo, label }, index) => {
							return (
								<>
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
											formik.values.investimentoMensal[
												index
											].valor
										}
										className={`${styles.tableInput}`}
									/>
									<NumericMask
										id={`${codigo}-empregos-direto-homem`}
										formik={formik}
										col={3}
										label=""
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
											formik.values.empregoHomem[index]
												.valor
										}
										className={`${styles.tableInput}`}
									/>
									<NumericMask
										id={`${codigo}-empregos-direto-mulher`}
										formik={formik}
										col={3}
										label=""
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
											formik.values.empregoMulher[index]
												.valor
										}
										className={`${styles.tableInput}`}
									/>
								</>
							);
						})}
						<div className={styles.totals}>
							<span className={styles.monthTitle}>
								Investimento anual:
								{formatBRCurrency(
									formik.values.investimentoMensal.reduce(
										(total, item) =>
											total +
											parseFloat(
												!isEmpty(item?.valor)
													? item?.valor
													: "0",
											),
										0,
									),
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
									col={6}
									onChange={formik.handleChange}
									required={false}
									value={formik.values.investimentoAcumulado}
									className={`${styles.tableInput}`}
								/>
							</span>
						</div>
					</div>
				</Card>

				<div className={`${styles.col12} ${styles.buttonsRigth}`}>
					<Button
						type="button"
						variant="contained"
						className={styles.secondaryButton}
						onClick={() => {
							setStep(1);
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

export default step2;
