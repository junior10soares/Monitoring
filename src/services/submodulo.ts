import { axiosInstance } from "./axios";

async function getAllSubmodulosByInscricaoEstadual(inscricaoEstadual: string) {
	const res = await axiosInstance.get(
		`/submodulos/lista/${inscricaoEstadual}`,
	);
	return res.data;
}

export { getAllSubmodulosByInscricaoEstadual };
