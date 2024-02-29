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
import { useLocation, useParams } from "react-router-dom";
import CustomTextField from "../../../components/customTextField";
import InputMask from "../../../components/inputMask";
import { getBeneficiarioById } from "../../../services/beneficiario";
import { getAllCnaes } from "../../../services/cnaeService";
import { getAllMunicipios } from "../../../services/municipioService";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step1Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step1({ formik }: step1Type) {
	const params = useParams();
	const [cnaesList, setCnaesList] = useState([
		{ id: 0, codigo: "", descricao: "" },
	]);
	const [municipios, setMunicipios] = useState([]);
	const { pathname } = useLocation();
	const isView = pathname?.includes("/view");

	useEffect(() => {
		fillCombos();
		if (params.id) {
			fetchApi();
		} else {
			const localItem = localStorage.getItem("step1");
			if (localItem) {
				formik.setValues(JSON.parse(localItem));
			}
		}
	}, []);

	async function fetchApi() {
		if (params.id) {
			var beneficiario = await getBeneficiarioById(parseInt(params.id));
			beneficiario.cnaes = beneficiario.cnaes.map((i) => i.cnae.id);
			beneficiario.municipio = beneficiario.municipio.id;
			const dadosEconomicos = {
				...beneficiario.dadosEconomicos,
				investimentoMensal: [
					{
						codigo: "janeiroValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.janeiroValor,
					},
					{
						codigo: "fevereiroValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.fevereiroValor,
					},
					{
						codigo: "marcoValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.marcoValor,
					},
					{
						codigo: "abrilValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.abrilValor,
					},
					{
						codigo: "maioValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.maioValor,
					},
					{
						codigo: "junhoValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.junhoValor,
					},
					{
						codigo: "julhoValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.julhoValor,
					},
					{
						codigo: "agostoValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.agostoValor,
					},
					{
						codigo: "setembroValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.setembroValor,
					},
					{
						codigo: "outubroValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.outubroValor,
					},
					{
						codigo: "novembroValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.novembroValor,
					},
					{
						codigo: "dezembroValor",
						valor: beneficiario.dadosEconomicos.investimentoMensal
							.dezembroValor,
					},
				],
				empregoHomem: [
					{
						codigo: "janeiroValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.janeiroValor,
					},
					{
						codigo: "fevereiroValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.fevereiroValor,
					},
					{
						codigo: "marcoValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.marcoValor,
					},
					{
						codigo: "abrilValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.abrilValor,
					},
					{
						codigo: "maioValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.maioValor,
					},
					{
						codigo: "junhoValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.junhoValor,
					},
					{
						codigo: "julhoValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.julhoValor,
					},
					{
						codigo: "agostoValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.agostoValor,
					},
					{
						codigo: "setembroValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.setembroValor,
					},
					{
						codigo: "outubroValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.outubroValor,
					},
					{
						codigo: "novembroValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.novembroValor,
					},
					{
						codigo: "dezembroValor",
						valor: beneficiario.dadosEconomicos.empregoHomem
							.dezembroValor,
					},
				],
				empregoMulher: [
					{
						codigo: "janeiroValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.janeiroValor,
					},
					{
						codigo: "fevereiroValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.fevereiroValor,
					},
					{
						codigo: "marcoValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.marcoValor,
					},
					{
						codigo: "abrilValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.abrilValor,
					},
					{
						codigo: "maioValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.maioValor,
					},
					{
						codigo: "junhoValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.junhoValor,
					},
					{
						codigo: "julhoValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.julhoValor,
					},
					{
						codigo: "agostoValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.agostoValor,
					},
					{
						codigo: "setembroValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.setembroValor,
					},
					{
						codigo: "outubroValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.outubroValor,
					},
					{
						codigo: "novembroValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.novembroValor,
					},
					{
						codigo: "dezembroValor",
						valor: beneficiario.dadosEconomicos.empregoMulher
							.dezembroValor,
					},
				],
			};
			formik.setValues(beneficiario);
			localStorage.setItem("step1", JSON.stringify(beneficiario));
			localStorage.setItem("step2", JSON.stringify(dadosEconomicos));
			localStorage.setItem("step3", JSON.stringify(beneficiario));
			localStorage.setItem("step4", JSON.stringify(beneficiario));
		}
	}

	async function fillCombos() {
		const list = await getAllCnaes();
		const municipiorsList = await getAllMunicipios();
		setCnaesList(list);
		setMunicipios(municipiorsList);
	}

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
							disabled={isView}
						/>
						<CustomTextField
							id="email"
							label="E-mail"
							formik={formik}
							col={6}
							type="email"
							required
							value={formik.values.email}
							disabled={isView}
						/>
						<CustomTextField
							id="nomeFantasia"
							label="Nome Fantasia"
							required
							col={6}
							formik={formik}
							value={formik.values.nomeFantasia}
							disabled={isView}
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
							disabled={isView}
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
							disabled={isView}
						/>
						<CustomTextField
							id="inscricaoEstadual"
							label="Ins. Estadual"
							required
							formik={formik}
							col={3}
							value={formik.values.inscricaoEstadual}
							disabled={isView}
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
							disabled={isView}
						/>
						<CustomTextField
							id="nomeAdministrador"
							label="Administrador"
							required
							col={6}
							formik={formik}
							value={formik.values.nomeAdministrador}
							disabled={isView}
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
								disabled={isView}
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
							disabled={isView}
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
							disabled={isView}
						/>
						<CustomTextField
							id="ramoAtividade"
							label="Ramo de Atividade"
							required
							col={6}
							formik={formik}
							value={formik.values.ramoAtividade}
							disabled={isView}
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
							disabled={isView}
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
							disabled={isView}
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
										disabled={isView}
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
										disabled={isView}
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
					{!isView && (
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
					)}
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
