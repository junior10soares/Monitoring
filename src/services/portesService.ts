import { axiosInstance } from "./axios";

async function getAllPortes() {
	const res = await axiosInstance.get("/portes");
	return res.data.content;
}

export { getAllPortes };
