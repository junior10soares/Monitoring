import { Button, Card, InputAdornment, TextField } from "@mui/material";

import { useState } from "react";
import styles from "./styles.module.scss";

type step5Type = {
	setStep: Function;
	formik: {};
};

function step5({ setStep }: step5Type) {
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
	const [lines, setLines] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);

	return (
		<form action="">
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
						{monthsData.map(({ codigo, label }) => {
							return (
								<>
									<span
										className={`${styles.col2} ${styles.monthTitle}`}
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
										className={`${styles.col3} ${styles.tableInput}`}
									/>
									<TextField
										id={`${codigo}-empregos-direto-homem`}
										variant="outlined"
										required
										error={false}
										className={`${styles.col3} ${styles.tableInput}`}
									/>
									<TextField
										id={`${codigo}-empregos-direto-mulher`}
										variant="outlined"
										required
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
								<TextField
									variant="outlined"
									required
									error={false}
									className={`${styles.col6}`}
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
							<span className={styles.col3}>
								Unidade de medida
							</span>
							<span className={styles.col3}>
								Quantidade interna
							</span>
							<span className={styles.col2}>
								Quant. Interestadual
							</span>
						</div>
						{Object.keys(lines).map((item) => (
							<>
								<TextField
									id={`${item}-ncu`}
									variant="outlined"
									required
									error={false}
									className={`${styles.col3} ${styles.tableInput}`}
								/>
								<TextField
									id={`${item}-produto-incentivado`}
									variant="outlined"
									required
									error={false}
									className={`${styles.col2} ${styles.tableInput}`}
								/>
								<TextField
									id={`${item}-unidade-medida`}
									variant="outlined"
									required
									error={false}
									className={`${styles.col2} ${styles.tableInput}`}
								/>
								<TextField
									id={`${item}-quantidade-interna`}
									variant="outlined"
									required
									error={false}
									className={`${styles.col2} ${styles.tableInput}`}
								/>
								<TextField
									id={`${item}-quantidade-interestadual`}
									variant="outlined"
									required
									error={false}
									className={`${styles.col2} ${styles.tableInput}`}
								/>
							</>
						))}
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
						type="button"
						variant="contained"
						className={styles.primaryButton}
						onClick={() => {
							setStep(5);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					>
						Salvar
					</Button>
				</div>
			</div>
		</form>
	);
}

export default step5;
