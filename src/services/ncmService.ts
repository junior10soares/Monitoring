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

async function getAllNcms() {
	const res = await axiosInstance.get("/ncms/list");
	const formatedRes = res.data
		.filter((i: INcm) => i.codigo.length === 2)
		.map((bisavo: INcm) => ({
			...bisavo,
			children: getChildren(bisavo.codigo, res.data, 4).map(
				(avo: INcm) => ({
					...avo,
					children: getChildren(avo.codigo, res.data, 5).map(
						(pai: INcm) => ({
							...pai,
							children: getChildren(pai.codigo, res.data, 8).map(
								(filho: INcm) => ({
									...filho,
									selectable: true,
								}),
							),
						}),
					),
				}),
			),
		}));
	return formatedRes;
}

export { getAllNcms };
