import { axiosInstance } from "./axios";

async function getAllMunicipios() {
	const res = await axiosInstance.get("/municipios");
	return res.data.content;
}

export { getAllMunicipios };
