import { axiosInstance } from "./axios";

async function getAllNcms() {
	const res = await axiosInstance.get("/ncms/list");
	return res.data;
}

export { getAllNcms };
