import { INcm } from "ncm";
import { axiosInstance } from "./axios";

async function getAllNcms() {
	const res = await axiosInstance.get("/ncms/list");
	return res.data.map((i: INcm) => ({
		...i,
		father: i.codigo.length < 10 ? i.codigo : "",
		disabled: i.codigo.length < 10,
	}));
}

export { getAllNcms };
