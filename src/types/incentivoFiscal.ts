import { IFundo } from "fundo";

export type IIncentivoFiscal = {
	id: 1;
	sigla: string;
	descricao: string;
	fundos: [IFundo];
};
