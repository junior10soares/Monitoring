import { Button, Card, InputAdornment, TextField } from "@mui/material";

import styles from "./styles.module.scss";

import { FormikProps } from "formik";
import CustomTextField from "../../../components/customTextField";
import { inputs } from "./inputs";

type step2Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step2({ setStep, formik }: step2Type) {
	const monthsData = {
		janeiro: { label: "Janeiro" },
		fevereiro: { label: "Fevereiro" },
		marco: { label: "Março" },
		abril: { label: "Abril" },
		maio: { label: "Maio" },
		junho: { label: "Junho" },
		julho: { label: "Julho" },
		agosto: { label: "Agosto" },
		setembro: { label: "Setembro" },
		outubro: { label: "Outubro" },
		novembro: { label: "Novembro" },
		dezembro: { label: "Dezembro" },
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Dados do beneficiário</h1>
					<h3 className={styles.subtitle}>
						Preencha corretamente o formulário
					</h3>
					<h3 className={styles.yearTitle}>Ano de referência</h3>
					<h3 className={styles.year}>2023</h3>
					<div className={styles.beneficiarioForm}>
						<div className={styles.monthsTitle}>
							<span>Mês referência</span>
							<span>Investimento mensal</span>
							<span>Empregos direto (homem)</span>
							<span>Empregos direto (mulher)</span>
						</div>
						{Object.keys(monthsData).map((item) => {
							return (
								<>
									<span
										className={`${styles.col2} ${styles.monthTitle}`}
									>
										{/* {monthsData[item].label} */}
									</span>
									<CustomTextField
										id={`${item}-investimento-mensal`}
										formik={formik}
										col={3}
										label=""
										onChange={formik.handleChange}
										required={false}
										value={
											// formik.values.investimentoMensal[
											// 	item
											// ]
											[]
										}
										type="number"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													R$
												</InputAdornment>
											),
										}}
										className={`${styles.tableInput}`}
									/>
									<TextField
										id={`${item}-empregos-direto-homem`}
										variant="outlined"
										error={false}
										className={`${styles.col3} ${styles.tableInput}`}
									/>
									<TextField
										id={`${item}-empregos-direto-mulher`}
										variant="outlined"
										error={false}
										className={`${styles.col3} ${styles.tableInput}`}
									/>
								</>
							);
						})}
						<div className={styles.totals}>
							<span className={styles.monthTitle}>
								Investimento anual: R$00,00
							</span>
							<span
								className={`${styles.monthTitle} ${styles.totalAcumulado}`}
							>
								Investimento acumulado:
								<CustomTextField
									variant="outlined"
									formik={formik}
									id="investimentoAcumulado"
									onChange={formik.handleChange}
									required={true}
									label=""
									value={formik.values.investimentoAcumulado}
									col={6}
									type="number"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												R$
											</InputAdornment>
										),
									}}
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
