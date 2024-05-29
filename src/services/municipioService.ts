import { axiosInstance } from "./axios";

async function getAllMunicipios() {
	try {
		const res = await axiosInstance.get("/municipios/list");
		return res.data;
	} catch (error) {
		console.error("Erro ao obter municípios:", error);
		throw error;
	}
}

export { getAllMunicipios };
