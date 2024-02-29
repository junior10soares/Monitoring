import { axiosInstance } from "./axios";

async function getAllBeneficiarios() {
	const res = await axiosInstance.get("/beneficiarios");
	return res.data;
}

async function getBeneficiarioById(id: number) {
	const res = await axiosInstance.get(`/beneficiarios/${id}`);
	return res.data;
}

async function insertBeneficiario(values: any) {
	const newValues = {
		nomeOuRazaoSocial: values.nomeOuRazaoSocial,
		cpfOuCnpj: values.cpfOuCnpj,
		email: values.email,
		telefoneEmpresa: values.telefoneEmpresa,
		telefoneContabilidade: values.telefoneContabilidade,
		nomeFantasia: values.nomeFantasia,
		inscricaoEstadual: values.inscricaoEstadual,
		nomeAdministrador: values.nomeAdministrador,
		telefoneAdministrador: values.telefoneAdministrador,
		municipio: {
			id: values.municipio,
		},
		porte: values.porte,
		ramoAtividade: values.ramoAtividade,
		descricao: values.descricao,
		telefones: values.telefones,
		cnaes: values.cnaes.map((i: number, index: number) => ({
			cnae: i,
			isPrincipal: index === 0,
		})),
		status: [
			{
				anoReferencia: values.anoReferencia,
				statusMonitoramento: 1,
			},
		],
		dadosEconomicos: {
			anoReferencia: values.anoReferencia.toString(),
			investimentoAcumulado: values.investimentoAcumulado,
			investimentoMensal: {
				janeiroValor: values.investimentoMensal.find(
					(i) => i.codigo === "janeiro",
				)?.valor,
				fevereiroValor: values.investimentoMensal.find(
					(i) => i.codigo === "fevereiro",
				)?.valor,
				marcoValor: values.investimentoMensal.find(
					(i) => i.codigo === "marco",
				)?.valor,
				abrilValor: values.investimentoMensal.find(
					(i) => i.codigo === "abril",
				)?.valor,
				maioValor: values.investimentoMensal.find(
					(i) => i.codigo === "maio",
				)?.valor,
				junhoValor: values.investimentoMensal.find(
					(i) => i.codigo === "junho",
				)?.valor,
				julhoValor: values.investimentoMensal.find(
					(i) => i.codigo === "julho",
				)?.valor,
				agostoValor: values.investimentoMensal.find(
					(i) => i.codigo === "agosto",
				)?.valor,
				setembroValor: values.investimentoMensal.find(
					(i) => i.codigo === "setembro",
				)?.valor,
				outubroValor: values.investimentoMensal.find(
					(i) => i.codigo === "outubro",
				)?.valor,
				novembroValor: values.investimentoMensal.find(
					(i) => i.codigo === "novembro",
				)?.valor,
				dezembroValor: values.investimentoMensal.find(
					(i) => i.codigo === "dezembro",
				)?.valor,
			},
			empregoHomem: {
				janeiroValor: values.empregoHomem.find(
					(i) => i.codigo === "janeiro",
				)?.valor,
				fevereiroValor: values.empregoHomem.find(
					(i) => i.codigo === "fevereiro",
				)?.valor,
				marcoValor: values.empregoHomem.find(
					(i) => i.codigo === "marco",
				)?.valor,
				abrilValor: values.empregoHomem.find(
					(i) => i.codigo === "abril",
				)?.valor,
				maioValor: values.empregoHomem.find((i) => i.codigo === "maio")
					?.valor,
				junhoValor: values.empregoHomem.find(
					(i) => i.codigo === "junho",
				)?.valor,
				julhoValor: values.empregoHomem.find(
					(i) => i.codigo === "julho",
				)?.valor,
				agostoValor: values.empregoHomem.find(
					(i) => i.codigo === "agosto",
				)?.valor,
				setembroValor: values.empregoHomem.find(
					(i) => i.codigo === "setembro",
				)?.valor,
				outubroValor: values.empregoHomem.find(
					(i) => i.codigo === "outubro",
				)?.valor,
				novembroValor: values.empregoHomem.find(
					(i) => i.codigo === "novembro",
				)?.valor,
				dezembroValor: values.empregoHomem.find(
					(i) => i.codigo === "dezembro",
				)?.valor,
			},
			empregoMulher: {
				janeiroValor: values.empregoMulher.find(
					(i) => i.codigo === "janeiro",
				)?.valor,
				fevereiroValor: values.empregoMulher.find(
					(i) => i.codigo === "fevereiro",
				)?.valor,
				marcoValor: values.empregoMulher.find(
					(i) => i.codigo === "marco",
				)?.valor,
				abrilValor: values.empregoMulher.find(
					(i) => i.codigo === "abril",
				)?.valor,
				maioValor: values.empregoMulher.find((i) => i.codigo === "maio")
					?.valor,
				junhoValor: values.empregoMulher.find(
					(i) => i.codigo === "junho",
				)?.valor,
				julhoValor: values.empregoMulher.find(
					(i) => i.codigo === "julho",
				)?.valor,
				agostoValor: values.empregoMulher.find(
					(i) => i.codigo === "agosto",
				)?.valor,
				setembroValor: values.empregoMulher.find(
					(i) => i.codigo === "setembro",
				)?.valor,
				outubroValor: values.empregoMulher.find(
					(i) => i.codigo === "outubro",
				)?.valor,
				novembroValor: values.empregoMulher.find(
					(i) => i.codigo === "novembro",
				)?.valor,
				dezembroValor: values.empregoMulher.find(
					(i) => i.codigo === "dezembro",
				)?.valor,
			},
		},
		incentivoFiscal: values.incentivoFiscal.id,
	};

	const res = await axiosInstance.post("/beneficiarios", newValues);
	window.console.log(res);
	return { data: res.data, success: res.status === 200 };
}

export { getAllBeneficiarios, getBeneficiarioById, insertBeneficiario };
