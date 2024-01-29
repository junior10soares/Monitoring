import { axiosInstance } from "./axios";

async function getAllCnaes() {
	const res = await axiosInstance.get("/cnaes");
	return res.data.content;
}

export { getAllCnaes };
