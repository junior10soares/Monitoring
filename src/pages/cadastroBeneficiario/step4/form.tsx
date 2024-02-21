import AddIcon from "@mui/icons-material/Add";
import { Button, Card, Select, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.scss";

type step4Type = {
	setStep: Function;
	formik: {};
};

function step4({ setStep }: step4Type) {
	const [lines, setLines] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
	return (
		<form action="">
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
								<Select
									id={`${item}-ncu`}
									variant="outlined"
									required
									error={false}
									className={`${styles.col3} ${styles.tableInput}`}
								></Select>
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

export default step4;
