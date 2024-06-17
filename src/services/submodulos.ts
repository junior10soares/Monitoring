import { axiosInstance } from "./axios";

async function excludeSubmoduloById(id: id) {
	const res = await axiosInstance.delete(`/submodulos/${id}`);
	return res.data;
}

export { excludeSubmoduloById };
