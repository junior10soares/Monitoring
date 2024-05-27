import { axiosInstance } from "./axios";

async function getAllCnaes() {
	try {
		const res = await axiosInstance.get("/cnaes/list");
		return res.data;
	} catch (error) {
		console.error("Erro ao obter CNAEs:", error);
		throw error;
	}
}

export { getAllCnaes };
