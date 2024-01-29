import { Button, Card, InputAdornment, TextField } from "@mui/material";

import { IMonthsType } from "monthType";
import styles from "./styles.module.scss";

type step3Type = {
	setStep: Function;
	formik: {};
};

function step3({ setStep }: step3Type) {
	const monthsData: IMonthsType = {
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
		<form action="">
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Sub Módulos</h1>
					<h3 className={styles.subtitle}>
						Preencha corretamente o formulário
					</h3>
					<div className={styles.beneficiarioForm}>
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
						{Object.keys(monthsData).map((item) => {
							return (
								<>
									<span
										className={`${styles.col4} ${styles.monthTitle}`}
									>
										{/* {monthsData[item].label} */}
									</span>
									<TextField
										id={`${item}-investimento-mensal`}
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
										id={`${item}-empregos-direto-homem`}
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
