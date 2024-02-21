import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
	Autocomplete,
	Button,
	Card,
	Checkbox,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";

import { ICnae } from "cnaeType";
import { FormikProps } from "formik";
import { Imunicipio } from "municipioType";
import { useEffect, useMemo, useState } from "react";
import CustomTextField from "../../../components/customTextField";
import InputMask from "../../../components/inputMask";
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
		const localItem = localStorage.getItem("step1");
		if (localItem) {
			formik.setValues(JSON.parse(localItem));
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

	const selectedCnaes = useMemo(() => {
		const newList: ICnae[] = cnaesList.filter((v: ICnae) =>
			formik.values.cnaes.includes(v.id),
		);
		return newList;
	}, [cnaesList, formik.values.cnaes]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit(e);
			}}
		>
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
							required
						/>
						<CustomTextField
							id="email"
							label="E-mail"
							formik={formik}
							col={6}
							type="email"
							required
							value={formik.values.email}
						/>
						<CustomTextField
							id="nomeFantasia"
							label="Nome Fantasia"
							required
							col={6}
							formik={formik}
							value={formik.values.nomeFantasia}
						/>
						<InputMask
							id="telefoneEmpresa"
							label="Tel. Empresa"
							formik={formik}
							col={3}
							mascara="(00) 0 0000-0000"
							definitions={{
								"#": /[1-9]/,
							}}
							value={formik.values.telefoneEmpresa}
							required
							onChange={formik.handleChange}
						/>
						<InputMask
							id="telefoneContabilidade"
							label="Tel. Contabilidade"
							formik={formik}
							col={3}
							mascara="(00) 0 0000-0000"
							definitions={{
								"#": /[1-9]/,
							}}
							value={formik.values.telefoneContabilidade}
							required
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="inscricaoEstadual"
							label="Ins. Estadual"
							required
							formik={formik}
							col={3}
							value={formik.values.inscricaoEstadual}
						/>
						<InputMask
							id="cpfOuCnpj"
							label="CNPJ/CPF"
							formik={formik}
							col={3}
							mascara="000.000.000-00"
							definitions={{
								"#": /[1-9]/,
							}}
							value={formik.values.cpfOuCnpj}
							required
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="nomeAdministrador"
							label="Administrador"
							required
							col={6}
							formik={formik}
							value={formik.values.nomeAdministrador}
						/>
						<FormControl className="col3">
							<InputLabel required id="municipio">
								Cidade
							</InputLabel>
							<Select
								id="municipio"
								name="municipio"
								label="Cidade"
								labelId="municipio"
								placeholder="Selecione uma cidade"
								value={formik.values.municipio}
								fullWidth
								onChange={formik.handleChange}
							>
								{municipios.map(
									({ id, nome }: Imunicipio, index) => {
										return (
											<MenuItem key={index} value={id}>
												{nome}
											</MenuItem>
										);
									},
								)}
							</Select>
						</FormControl>
						<CustomTextField
							id="porte"
							label="Porte"
							required
							col={3}
							formik={formik}
							value={formik.values.porte}
						/>
						<InputMask
							id="telefoneAdministrador"
							label="Tel. Administrador"
							formik={formik}
							col={6}
							mascara="(00) 0 0000-0000"
							definitions={{
								"#": /[1-9]/,
							}}
							value={formik.values.telefoneAdministrador}
							required
							onChange={formik.handleChange}
						/>
						<CustomTextField
							id="ramoAtividade"
							label="Ramo de Atividade"
							required
							col={6}
							formik={formik}
							value={formik.values.ramoAtividade}
						/>
						<InputLabel className="col12" id="cnae-display-name">
							CNAE
						</InputLabel>
						<Autocomplete
							multiple
							id="cnaes"
							options={cnaesList}
							className="col12"
							fullWidth
							placeholder="Selecione um CNAE"
							disableCloseOnSelect
							getOptionLabel={(option) =>
								`${option.codigo} - ${option.descricao}`
							}
							value={selectedCnaes}
							renderOption={(props, option) => (
								<li {...props}>
									<Checkbox
										icon={
											<CheckBoxOutlineBlankIcon fontSize="small" />
										}
										checkedIcon={
											<CheckBoxIcon fontSize="small" />
										}
										style={{ marginRight: 8 }}
										checked={
											formik.values.cnaes.indexOf(
												option.id,
											) > -1
										}
									/>
									{`${option.codigo} - ${option.descricao}`}
								</li>
							)}
							onChange={(_, value) => {
								formik.setFieldValue(
									"cnaes",
									value.map((i) => i.id),
								);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="CNAE"
									placeholder="Selecione um CNAE"
								/>
							)}
						/>

						<CustomTextField
							id="descricao"
							label="Descrição"
							required
							rows={4}
							multiline
							col={12}
							formik={formik}
							value={formik.values.descricao}
						/>
					</div>
				</Card>
				<Card className={styles.card}>
					<h1 className={styles.title}>Telefones</h1>
					<span className={styles.error}>
						{formik.errors.telefones}
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
									<InputMask
										id={`telefones-${index}`}
										label="Tel. Administrador"
										formik={formik}
										col={6}
										mascara="(00) 0 0000-0000"
										definitions={{
											"#": /[1-9]/,
										}}
										value={
											formik.values.telefones[index]
												.telefone
										}
										required
										onChange={(ev: {
											target: { value: string };
										}) => {
											let newPhones =
												formik.values.telefones;
											newPhones[index].telefone =
												ev.target.value;
											formik.handleChange(ev);
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
