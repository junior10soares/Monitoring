import { axiosInstance } from "./axios";

async function getAllPortes() {
	const res = await axiosInstance.get("/portes/empresas/list");
	return res.data;
}

export { getAllPortes };
