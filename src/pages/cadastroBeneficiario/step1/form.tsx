import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
	Button,
	Card,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { ICnae } from "cnaeType";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import CustomTextField from "../../../components/customTextField";
import { getAllCnaes } from "../../../services/cnaeService";
import { getAllMunicipios } from "../../../services/municipioService";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step1Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step1({ formik }: step1Type) {
	const [cnaesList, setCnaesList] = useState([
		{ id: 0, codigo: "", descricao: "" },
	]);
	const [municipios, setMunicipios] = useState([]);

	useEffect(() => {
		const localCach = JSON.parse(localStorage.getItem("step1") ?? "");
		if (localCach) {
			formik.setValues(localCach);
		}
	}, []);

	useEffect(() => {
		async function fetch() {
			const list = await getAllCnaes();
			const municipiorsList = await getAllMunicipios();
			setCnaesList(list);
			setMunicipios(municipiorsList);
		}
		fetch();
	}, []);
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Dados do beneficiário</h1>
					<h3 className={styles.subtitle}>
						Preencha corretamente o formulário
					</h3>
					<div className={styles.beneficiarioForm}>
						<CustomTextField
							id="nomeOuRazaoSocial"
							label="Razão Social"
							formik={formik}
							col={6}
							value={formik.values.nomeOuRazaoSocial}
							onChange={formik.handleChange}
							required
						/>
						<CustomTextField
							id="email"
							label="E-mail"
							formik={formik}
							col={6}
							required
							value={formik.values.email}
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="nomeFantasia"
							label="Nome Fantasia"
							required
							col={6}
							formik={formik}
							value={formik.values.nomeFantasia}
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="telefoneEmpresa"
							label="Tel. Empresa"
							required
							col={3}
							formik={formik}
							value={formik.values.telefoneEmpresa}
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="telefoneContabilidade"
							label="Tel. Contabilidade"
							required
							col={3}
							formik={formik}
							value={formik.values.telefoneContabilidade}
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="inscricaoEstadual"
							label="Ins. Estadual"
							required
							formik={formik}
							col={3}
							value={formik.values.inscricaoEstadual}
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="cpfOuCnpj"
							label="CNPJ/CPF"
							required
							col={3}
							formik={formik}
							value={formik.values.cpfOuCnpj}
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="nomeAdministrador"
							label="Administrador"
							required
							col={6}
							formik={formik}
							value={formik.values.nomeAdministrador}
							onChange={formik.handleChange}
						/>
						<Select
							id="municipio"
							name="municipio"
							label="Cidade"
							labelId="municipio-display-name"
							placeholder="Selecione uma cidade"
							value={formik.values.municipio}
							onChange={formik.handleChange}
							className="col3"
						>
							{municipios.map(({ id, descricao }: ICnae) => {
								return (
									<MenuItem value={id}>{descricao}</MenuItem>
								);
							})}
						</Select>
						<CustomTextField
							id="porte"
							label="Porte"
							required
							col={3}
							formik={formik}
							value={formik.values.porte}
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="telefoneAdministrador"
							label="Tel. Administrador"
							required
							col={6}
							formik={formik}
							value={formik.values.telefoneAdministrador}
							onChange={formik.handleChange}
						/>

						<CustomTextField
							id="ramoAtividade"
							label="Ramo de Atividade"
							required
							col={6}
							formik={formik}
							value={formik.values.ramoAtividade}
							onChange={formik.handleChange}
						/>
						<InputLabel className="col12" id="cnae-display-name">
							CNAE
						</InputLabel>
						<Select
							id="cnaes"
							name="cnaes"
							label="CNAE"
							labelId="cnae-display-name"
							placeholder="Selecione um CNAE"
							multiple
							value={formik.values.cnaes}
							onChange={formik.handleChange}
							className="col12"
						>
							{cnaesList.map(({ id, descricao }: ICnae) => {
								return (
									<MenuItem value={id}>{descricao}</MenuItem>
								);
							})}
						</Select>
						<div className={styles.cnaesContainer}>
							{formik.values.cnaes.length > 0
								? formik.values.cnaes.map((item) => {
										const cnae: ICnae = cnaesList.find(
											(itemObj) => itemObj.id === item,
										) ?? {
											id: 0,
											codigo: "",
											descricao: "",
										};
										return (
											<span
												className={`${styles.cnaeItem}`}
											>
												{cnae?.descricao}
												<CloseIcon
													onClick={() => {
														const cnaes =
															formik.values.cnaes.filter(
																(i) =>
																	i !== item,
															);
														formik.setFieldValue(
															"cnaes",
															cnaes,
														);
													}}
												/>
											</span>
										);
								  })
								: ""}
						</div>
						<CustomTextField
							id="descricao"
							label="Descrição"
							required
							rows={4}
							multiline
							col={12}
							formik={formik}
							value={formik.values.descricao}
							onChange={formik.handleChange}
						/>
					</div>
				</Card>
				<Card className={styles.card}>
					<h1 className={styles.title}>Telefones</h1>
					<span className={styles.error}>
						{/* {formik.errors.telefones} */}
					</span>
					<div className={styles.beneficiarioForm}>
						{formik.values.telefones.map((_, index) => {
							return (
								<div
									className={styles.beneficiarioItem}
									key={index}
								>
									<TextField
										id="titulo"
										label="Título"
										variant="outlined"
										required
										error={false}
										className={styles.col6}
										value={
											formik.values.telefones[index]
												.titulo
										}
										onChange={(ev) => {
											let newPhones =
												formik.values.telefones;
											newPhones[index].titulo =
												ev.target.value;
											formik.setFieldValue(
												"telefones",
												newPhones,
											);
										}}
									/>
									<TextField
										id="telefone"
										label="Telefone"
										variant="outlined"
										required
										error={false}
										className={styles.col6}
										value={
											formik.values.telefones[index]
												.telefone
										}
										onChange={(ev) => {
											let newPhones =
												formik.values.telefones;
											newPhones[index].telefone =
												ev.target.value;
											formik.setFieldValue(
												"telefones",
												newPhones,
											);
										}}
									/>
								</div>
							);
						})}
					</div>
					<Button
						type="button"
						variant="contained"
						className={styles.primaryButton}
						onClick={(ev) => {
							ev.preventDefault();
							formik.setFieldValue("telefones", [
								...formik.values.telefones,
								{ titulo: "", telefone: "" },
							]);
						}}
					>
						<AddIcon />
						Novo Telefone
					</Button>
				</Card>
				<div className={`${styles.col12} ${styles.buttonsRigth}`}>
					<Button
						type="submit"
						variant="contained"
						className={styles.primaryButton}
					>
						Continuar
					</Button>
				</div>
			</div>
		</form>
	);
}

export default step1;
