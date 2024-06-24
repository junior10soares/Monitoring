import { useLocation } from "react-router-dom";
import { stepCountType } from "stepCountType";
import styles from "./styles.module.scss";

export default function StepCount({ activeStep, setStep }: stepCountType) {
	const { pathname } = useLocation();
	const isNew = pathname?.includes("/new");
	return (
		<div className={styles.container}>
			<span
				className={`${styles.step} ${activeStep >= 1 && styles.active}`}
				onClick={() => {
					if (!isNew) setStep(1);
				}}
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
				onClick={() => {
					if (!isNew) setStep(2);
				}}
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
				onClick={() => {
					if (!isNew) setStep(3);
				}}
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
				onClick={() => {
					if (!isNew) setStep(4);
				}}
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
				onClick={() => {
					if (!isNew) setStep(5);
				}}
			>
				5
			</span>
		</div>
	);
}
