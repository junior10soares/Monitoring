import { INcm } from "ncm";
import { axiosInstance } from "./axios";

function getChildren(
	fatherCode: string,
	list: INcm[],
	childrenMaxLength: number = 8,
): INcm[] {
	const formatedFatherCode = fatherCode.replaceAll(".", "");
	const quantidadeCaracteres = formatedFatherCode.length;
	const res: INcm[] = list.filter(
		(i: INcm) =>
			fatherCode !== i.codigo &&
			i.codigo.replaceAll(".", "").length === childrenMaxLength &&
			i.codigo.replaceAll(".", "").substring(0, quantidadeCaracteres) ===
				formatedFatherCode,
	);
	return res;
}

const assignObjectPaths = (obj, stack = "") => {
	Object.keys(obj).forEach((k) => {
		const node = obj[k];
		if (typeof node === "object") {
			node.path = stack ? `${stack}.${k}` : k;
			assignObjectPaths(node, node.path);
		}
	});
};

async function getAllNcms() {
	const res = await axiosInstance.get("/ncms/list");
	var formatedRes = res.data
		.filter((i: INcm) => i.codigo.length === 2)
		.map((bisavo: INcm) => ({
			...bisavo,
			label: `${bisavo.codigo} - ${bisavo.descricao}`,
			key: bisavo.id,
			selectable: false,
			data: bisavo.descricao,
			leaf: true,
			children: getChildren(bisavo.codigo, res.data, 4).map(
				(avo: INcm) => ({
					...avo,
					label: `${avo.codigo} - ${avo.descricao}`,
					key: avo.id,
					selectable: false,
					data: avo.descricao,
					leaf: true,
					children: getChildren(avo.codigo, res.data, 5).map(
						(pai: INcm) => ({
							...pai,
							label: `${pai.codigo} - ${pai.descricao}`,
							key: pai.id,
							selectable: false,
							data: pai.descricao,
							leaf: true,
							children: getChildren(pai.codigo, res.data, 8).map(
								(filho: INcm) => ({
									...filho,
									label: `${filho.codigo} - ${filho.descricao}`,
									key: filho.id,
									data: filho.descricao,
									icon: "pi pi-check",
								}),
							),
						}),
					),
				}),
			),
		}));
	assignObjectPaths(formatedRes);
	return formatedRes;
}

export { getAllNcms };
