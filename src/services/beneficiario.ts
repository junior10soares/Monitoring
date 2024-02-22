import { axiosInstance } from "./axios";

async function getAllBeneficiarios() {
	const res = await axiosInstance.get("/beneficiarios");
	return res.data;
}

async function insertBeneficiario() {}

export { getAllBeneficiarios };
