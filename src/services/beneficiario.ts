import { axiosInstance } from "./axios";

async function getAllBeneficiarios() {
	const res = await axiosInstance.get("/beneficiarios");
	return res.data;
}

async function getBeneficiarioById(id) {
	const res = await axiosInstance.get(`/beneficiarios/${id}`);
	return res.data;
}

async function getUnidadeMedida() {
	const res = await axiosInstance.get(`/unidades/medidas/list`);
	return res.data;
}

async function insertBeneficiario(values) {

	const recolhimentoFundos = values.valoresFundo.map(fundo => ({
		fundoIncentivo: fundo.fundoIncentivo.id,
		anoReferencia: "2022",
		janeiroValor: parseFloat(fundo.janeiroValor),
		fevereiroValor: parseFloat(fundo.fevereiroValor),
		marcoValor: parseFloat(fundo.marcoValor),
		abrilValor: parseFloat(fundo.abrilValor),
		maioValor: parseFloat(fundo.maioValor),
		junhoValor: parseFloat(fundo.junhoValor),
		julhoValor: parseFloat(fundo.julhoValor),
		agostoValor: parseFloat(fundo.agostoValor),
		setembroValor: parseFloat(fundo.setembroValor),
		outubroValor: parseFloat(fundo.outubroValor),
		novembroValor: parseFloat(fundo.novembroValor),
		dezembroValor: parseFloat(fundo.dezembroValor),
	}));

	const vendaAnual = values.infoVendas

	const newValues = {
		nomeOuRazaoSocial: values.nomeOuRazaoSocial,
		cpfOuCnpj: values.cpfOuCnpj,
		email: values.email,
		nomeFantasia: values.nomeFantasia,
		inscricaoEstadual: values.inscricaoEstadual,
		nomeAdministrador: values.nomeAdministrador,
		municipio: {
			id: values.municipio,
		},
		porte: values.porte,
		ramoAtividade: values.ramoAtividade,
		descricao: values.descricao,
		telefones: values.telefones,
		cnaes: values.cnaes.map((i, index) => ({
			cnae: i,
			isPrincipal: index === 0,
		})),
		status: [
			{
				anoReferencia: "2022",
				statusMonitoramento: 1,
			},
		],
		dadosEconomicos: {
			anoReferencia: values.anoReferencia.toString(),
			investimentoAcumulado: values.investimentoAcumulado,
			investimentoMensal: {

				janeiroValor: values.investimentoMensal.find(
					(i) => i.codigo === "janeiro" || "janeiroValor"
				)?.valor,
				fevereiroValor: values.investimentoMensal.find(
					(i) => i.codigo === "fevereiro" || "fevereiroValor"
				)?.valor,
				marcoValor: values.investimentoMensal.find(
					(i) => i.codigo === "marco" || "marcoValor"
				)?.valor,
				abrilValor: values.investimentoMensal.find(
					(i) => i.codigo === "abril" || "abrilValor"
				)?.valor,
				maioValor: values.investimentoMensal.find(
					(i) => i.codigo === "maio" || "maioValor"
				)?.valor,
				junhoValor: values.investimentoMensal.find(
					(i) => i.codigo === "junho" || "junhoValor"
				)?.valor,
				julhoValor: values.investimentoMensal.find(
					(i) => i.codigo === "julho" || "julhoValor"
				)?.valor,
				agostoValor: values.investimentoMensal.find(
					(i) => i.codigo === "agosto" || "agostoValor"
				)?.valor,
				setembroValor: values.investimentoMensal.find(
					(i) => i.codigo === "setembro" || "setembroValor"
				)?.valor,
				outubroValor: values.investimentoMensal.find(
					(i) => i.codigo === "outubro" || "outubroValor"
				)?.valor,
				novembroValor: values.investimentoMensal.find(
					(i) => i.codigo === "novembro" || "novembroValor"
				)?.valor,
				dezembroValor: values.investimentoMensal.find(
					(i) => i.codigo === "dezembro" || "dezembroValor"
				)?.valor,
			},
			empregoHomem: {
				janeiroValor: values.empregoHomem.find(
					(i) => i.codigo === "janeiro" || "janeiroValor"
				)?.valor,
				fevereiroValor: values.empregoHomem.find(
					(i) => i.codigo === "fevereiro" || "fevereiroValor"
				)?.valor,
				marcoValor: values.empregoHomem.find(
					(i) => i.codigo === "marco" || "marcoValor"
				)?.valor,
				abrilValor: values.empregoHomem.find(
					(i) => i.codigo === "abril" || "abrilValor"
				)?.valor,
				maioValor: values.empregoHomem.find(
					(i) => i.codigo === "maio" || "maioValor"
				)?.valor,
				junhoValor: values.empregoHomem.find(
					(i) => i.codigo === "junho" || "junhoValor"
				)?.valor,
				julhoValor: values.empregoHomem.find(
					(i) => i.codigo === "julho" || "julhoValor"
				)?.valor,
				agostoValor: values.empregoHomem.find(
					(i) => i.codigo === "agosto" || "agostoValor"
				)?.valor,
				setembroValor: values.empregoHomem.find(
					(i) => i.codigo === "setembro" || "setembroValor"
				)?.valor,
				outubroValor: values.empregoHomem.find(
					(i) => i.codigo === "outubro" || "outubroValor"
				)?.valor,
				novembroValor: values.empregoHomem.find(
					(i) => i.codigo === "novembro" || "novembroValor"
				)?.valor,
				dezembroValor: values.empregoHomem.find(
					(i) => i.codigo === "dezembro" || "dezembroValor"
				)?.valor,
			},
			empregoMulher: {
				janeiroValor: values.empregoMulher.find(
					(i) => i.codigo === "janeiro" || "janeiroValor"
				)?.valor,
				fevereiroValor: values.empregoMulher.find(
					(i) => i.codigo === "fevereiro" || "fevereiroValor"
				)?.valor,
				marcoValor: values.empregoMulher.find(
					(i) => i.codigo === "marco" || "marcoValor"
				)?.valor,
				abrilValor: values.empregoMulher.find(
					(i) => i.codigo === "abril" || "abrilValor"
				)?.valor,
				maioValor: values.empregoMulher.find(
					(i) => i.codigo === "maio" || "maioValor"
				)?.valor,
				junhoValor: values.empregoMulher.find(
					(i) => i.codigo === "junho" || "junhoValor"
				)?.valor,
				julhoValor: values.empregoMulher.find(
					(i) => i.codigo === "julho" || "julhoValor"
				)?.valor,
				agostoValor: values.empregoMulher.find(
					(i) => i.codigo === "agosto" || "agostoValor"
				)?.valor,
				setembroValor: values.empregoMulher.find(
					(i) => i.codigo === "setembro" || "setembroValor"
				)?.valor,
				outubroValor: values.empregoMulher.find(
					(i) => i.codigo === "outubro" || "outubroValor"
				)?.valor,
				novembroValor: values.empregoMulher.find(
					(i) => i.codigo === "novembro" || "novembroValor"
				)?.valor,
				dezembroValor: values.empregoMulher.find(
					(i) => i.codigo === "dezembro" || "dezembroValor"
				)?.valor,
			},
		},
		incentivoFiscal: values.incentivoFiscal.id,
		vendaAnual,
		submodulo: {
			codigoRcr: "",
			vendaAnualInterna: values?.vendaAnualInterna,
			vendaAnualInterestadual: values?.vendaAnualInterestadual,
			recolhimentoFundos: recolhimentoFundos,
		},
	};

	const res = await axiosInstance.post("/beneficiarios", newValues);
	return { data: res.data, success: res.status === 200 };
}

export { getAllBeneficiarios, getUnidadeMedida, getBeneficiarioById, insertBeneficiario };
