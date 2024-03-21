import { axiosInstance } from "./axios";

async function getAllSubmodulosByInscricaoEstadual(inscricaoEstadual: string) {
	try {
		const res = await axiosInstance.get(
			`/submodulos/lista/${inscricaoEstadual}`,
		);
		return res.data;
	} catch (err) {
		return [];
	}
}

export { getAllSubmodulosByInscricaoEstadual };
