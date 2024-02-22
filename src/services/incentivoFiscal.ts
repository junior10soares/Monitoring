import { axiosInstance } from "./axios";

async function getAllIncentivosFiscais() {
	const res = await axiosInstance.get("/incentivos/fiscais/list");
	return res.data;
}

export { getAllIncentivosFiscais };
