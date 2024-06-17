import { useState } from "react";
import StepCount from "../../components/stepCount";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4/";
import Step5 from "./step5/";

function cadastroBeneficiario() {
	const [step, setStep] = useState(1);
	const [subsToExclude, setSubsToExclude] = useState([]);

	function addSubToExclude(id: number) {
		var newSubsToDelete = subsToExclude;
		newSubsToDelete.push(id);
		setSubsToExclude(newSubsToDelete);
	}

	return (
		<div>
			<StepCount activeStep={step} />
			{step === 1 && <Step1 setStep={setStep} />}
			{step === 2 && <Step2 setStep={setStep} />}
			{step === 3 && (
				<Step3 setSubsToExclude={addSubToExclude} setStep={setStep} />
			)}
			{step === 4 && <Step4 setStep={setStep} />}
			{step === 5 && (
				<Step5 subsToExclude={subsToExclude} setStep={setStep} />
			)}
		</div>
	);
}

export default cadastroBeneficiario;
