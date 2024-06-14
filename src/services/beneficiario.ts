import { axiosInstance } from "./axios";

async function getAllBeneficiarios() {
	const res = await axiosInstance.get("/beneficiarios/logged-user");
	return res.data;
}

async function getBeneficiarioById(id) {
	const res = await axiosInstance.get(`/beneficiarios/${id}`);
	return res.data;
}

async function getUnidadeMedida() {
	const res = await axiosInstance.get(`/unidades/medidas/list`);
	return res.data;
}

async function insertBeneficiario(values) {
	const res = await axiosInstance.post("/beneficiarios", values);
	return { data: res.data, success: res.status === 200 };
}

export {
	getAllBeneficiarios,
	getBeneficiarioById,
	getUnidadeMedida,
	insertBeneficiario,
};
