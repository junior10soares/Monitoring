import { INcm } from "ncm";

export type IInfoVendas = {
	ncm: INcm;
	produtoIncentivado: string;
	unidadeMedida: { key: string; value: string };
	quantidadeInterna: number;
	quantidadeInterestadual: number;
};
