import { stepCountType } from "stepCountType";
import styles from "./styles.module.scss";

export default function StepCount({ activeStep }: stepCountType) {
	return (
		<div className={styles.container}>
			<span
				className={`${styles.step} ${activeStep >= 1 && styles.active}`}
			>
				1
			</span>
			<div
				className={`${styles.separator} ${
					activeStep >= 1 && styles.active
				}`}
			></div>
			<span
				className={`${styles.step} ${activeStep >= 2 && styles.active}`}
			>
				2
			</span>
			<div
				className={`${styles.separator} ${
					activeStep >= 2 && styles.active
				}`}
			></div>
			<span
				className={`${styles.step} ${activeStep >= 3 && styles.active}`}
			>
				3
			</span>
			<div
				className={`${styles.separator} ${
					activeStep >= 3 && styles.active
				}`}
			></div>
			<span
				className={`${styles.step} ${activeStep >= 4 && styles.active}`}
			>
				4
			</span>
			<div
				className={`${styles.separator} ${
					activeStep >= 4 && styles.active
				}`}
			></div>
			<span
				className={`${styles.step} ${activeStep >= 5 && styles.active}`}
			>
				5
			</span>
		</div>
	);
}
