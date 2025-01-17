export const inputs = {
	submodulos: [
		{
			beneficiario: {
				dataAtualizacao: "",
				dataCadastro: "",
				id: 0,
			},
			incentivoFiscal: {
				id: 0,
				sigla: "",
				descricao: "",
				fundos: [],
			},
			valoresFundo: [],
			submodulo: null,
			codigoRcr: "",
			recolhimentoFundos: [
				{
					abrilValor: null,
					agostoValor: null,
					anoReferencia: new Date().getFullYear() - 1,
					dezembroValor: null,
					fevereiroValor: null,
					fundoIncentivo: {
						dataAtualizacao: "",
						dataCadastro: "",
						id: null,
					},
					janeiroValor: null,
					julhoValor: null,
					junhoValor: null,
					maioValor: null,
					marcoValor: null,
					novembroValor: null,
					outubroValor: null,
					setembroValor: null,
					submodulo: {
						dataAtualizacao: "",
						dataCadastro: "",
						id: null,
					},
				},
			],
			vendaAnualInterestadual: null,
			vendaAnualInterna: null,
			fundos: [],
		},
	],
};
