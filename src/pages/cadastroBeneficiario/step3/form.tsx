import { Button, Card, InputAdornment, Select, TextField } from "@mui/material";

import { FormikProps } from "formik";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step3Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step3({ setStep, formik }: step3Type) {
	const monthsData = [
		{ codigo: "janeiro", label: "Janeiro" },
		{ codigo: "fevereiro", label: "Fevereiro" },
		{ codigo: "marco", label: "Março" },
		{ codigo: "abril", label: "Abril" },
		{ codigo: "maio", label: "Maio" },
		{ codigo: "junho", label: "Junho" },
		{ codigo: "julho", label: "Julho" },
		{ codigo: "agosto", label: "Agosto" },
		{ codigo: "setembro", label: "Setembro" },
		{ codigo: "outubro", label: "Outubro" },
		{ codigo: "novembro", label: "Novembro" },
		{ codigo: "dezembro", label: "Dezembro" },
	];

	return (
		<form action="">
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Sub Módulos</h1>
					<h3 className={styles.subtitle}>
						Preencha corretamente o formulário
					</h3>
					<div className={styles.beneficiarioForm}>
						<Select
							id="incentivoFiscal"
							name="incentivoFiscal"
							label="Cidade"
							placeholder="Selecione um incentivo fiscal"
							value={formik.values.municipio}
							onChange={formik.handleChange}
							className="col3"
						></Select>
						<TextField
							id="submodulo1"
							label="Sub módulo 1"
							variant="outlined"
							required
							error={false}
							className={styles.col6}
						/>
						<TextField
							id="vendaAnualInterna"
							label="Venda anual interna"
							variant="outlined"
							required
							error={false}
							className={styles.col6}
						/>
						<TextField
							id="vendaAnualInterestadual"
							label="Venda anual  interestadual"
							variant="outlined"
							required
							error={false}
							className={styles.col6}
						/>
						<div className={styles.monthsTitle}>
							<span>Mês referência</span>
							<span>Fundes</span>
							<span>Funded</span>
						</div>
						{monthsData.map(({ codigo, label }) => {
							return (
								<>
									<span
										className={`${styles.col4} ${styles.monthTitle}`}
									>
										{label}
									</span>
									<TextField
										id={`${codigo}-investimento-mensal`}
										variant="outlined"
										required
										error={false}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													R$
												</InputAdornment>
											),
										}}
										type="number"
										className={`${styles.col4} ${styles.tableInput}`}
									/>
									<TextField
										id={`${codigo}-empregos-direto-homem`}
										variant="outlined"
										required
										error={false}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													R$
												</InputAdornment>
											),
										}}
										className={`${styles.col4} ${styles.tableInput}`}
									/>
								</>
							);
						})}
						<div className={styles.totals}>
							<span className={styles.monthTitle}>
								Valor Total: R$00,00
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
							setStep(2);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					>
						Voltar
					</Button>
					<Button
						type="button"
						variant="contained"
						className={styles.primaryButton}
						onClick={() => {
							setStep(4);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					>
						Continuar
					</Button>
				</div>
			</div>
		</form>
	);
}

export default step3;
