import AddIcon from "@mui/icons-material/Add";
import { Button, Card, InputAdornment, TextField } from "@mui/material";

import { IMonthsType } from "monthType";
import { useState } from "react";
import styles from "./styles.module.scss";

type step5Type = {
	setStep: Function;
	formik: {};
};

function step5({ setStep }: step5Type) {
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
						{Object.keys(monthsData).map((item: string) => {
							return (
								<>
									<span
										className={`${styles.col2} ${styles.monthTitle}`}
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
										className={`${styles.col3} ${styles.tableInput}`}
									/>
									<TextField
										id={`${item}-empregos-direto-homem`}
										variant="outlined"
										required
										error={false}
										className={`${styles.col3} ${styles.tableInput}`}
									/>
									<TextField
										id={`${item}-empregos-direto-mulher`}
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
						<Button
							type="button"
							variant="contained"
							className={styles.primaryButton}
							onClick={() => {
								setLines([...lines, {}]);
							}}
						>
							<AddIcon />
							Adicionar linhas e colunas
						</Button>
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
						Continuar
					</Button>
				</div>
			</div>
		</form>
	);
}

export default step5;
