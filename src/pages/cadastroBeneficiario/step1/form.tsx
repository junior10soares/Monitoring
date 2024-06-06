import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import RemoveIcon from "@mui/icons-material/DeleteOutline";
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
import { IPorte } from "porte";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomTextField from "../../../components/customTextField";
import InputMask from "../../../components/inputMask";
import { getBeneficiarioById } from "../../../services/beneficiario";
import { getAllCnaes } from "../../../services/cnaeService";
import { getAllMunicipios } from "../../../services/municipioService";
import { getAllPortes } from "../../../services/portesService";
import { monthsData } from "../../../utils/DateTime";
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
	const [showOutros, setShowOutros] = useState(false);
	const [showOutrosTrash, setShowOutrosTrash] = useState(false);
	const [portes, setPortes] = useState([]);
	const { pathname } = useLocation();
	const isView = pathname?.includes("/view");
	const excludedListTelefones = ["EMPRESA", "CONTABILIDADE", "ADMINISTRADOR", "OUTROS"];
	const [newPhone, setNewsPhone] = useState(excludedListTelefones);

	useEffect(() => {
		(async function fetchAll() {
			await fillCombos();
			if (params.id) {
				await fetchApi();
			} else {
				const localItem = localStorage.getItem("step1");
				if (localItem) {
					formik.setValues(JSON.parse(localItem));
				}
			}
		})();
	}, []);

	async function fetchApi() {
		if (params.id) {
			var beneficiario = await getBeneficiarioById(parseInt(params.id));
			var step1 = {
				id: beneficiario.id,
				nomeOuRazaoSocial: beneficiario.nomeOuRazaoSocial,
				cpfOuCnpj: beneficiario.cpfOuCnpj,
				email: beneficiario.email,
				telefoneEmpresa: beneficiario.telefoneEmpresa,
				telefoneContabilidade: beneficiario.telefoneContabilidade,
				nomeFantasia: beneficiario.nomeFantasia,
				inscricaoEstadual: beneficiario.inscricaoEstadual,
				nomeAdministrador: beneficiario.nomeAdministrador,
				telefoneAdministrador: beneficiario.telefoneAdministrador,
				municipio: beneficiario.municipio.id,
				porte: beneficiario.porte.id,
				ramoAtividade: beneficiario.ramoAtividade,
				descricao: beneficiario.descricao,
				cnaes: beneficiario.cnaes.map(
					(i: { cnae: { id: any } }) => i.cnae.id,
				),
				telefones: beneficiario.telefones,
			};
			const dadosEconomicos = {
				...beneficiario.dadosEconomicos,
				investimentoMensal: monthsData.map((i) => ({
					codigo: `${i.codigo}Valor`,
					valor: beneficiario.dadosEconomicos.investimentoMensal?.[
						`${i.codigo}Valor`
					],
				})),
				empregoHomem: monthsData.map((i) => ({
					codigo: `${i.codigo}Valor`,
					valor: beneficiario.dadosEconomicos.empregoHomem?.[
						`${i.codigo}Valor`
					],
				})),

				empregoMulher: monthsData.map((i) => ({
					codigo: `${i.codigo}Valor`,
					valor: beneficiario.dadosEconomicos.empregoMulher?.[
						`${i.codigo}Valor`
					],
				})),
			};
			const step3 = {
				valoresFundo: beneficiario.submodulo ? beneficiario.submodulo.recolhimentoFundos : null,
				vendaAnualInterestadual: beneficiario.submodulo ? beneficiario.submodulo.vendaAnualInterestadual : null,
				vendaAnualInterna: beneficiario.submodulo ? beneficiario.submodulo.vendaAnualInterna : null,
				incentivoFiscal: beneficiario.incentivoFiscal
			};
			const infoVendas = beneficiario.vendaAnual.map(venda => ({
				ncm: venda.ncm,
				produtoIncentivado: venda.produtoIncentivado,
				quantidadeInterestadual: venda.quantidadeInterestadual || "",
				quantidadeInterna: venda.quantidadeInterna || "",
				unidadeMedida: venda.unidadeMedida
			}));

			const step4 = { infoVendas };

			formik.setValues(step1);
			localStorage.setItem("step1", JSON.stringify(beneficiario));
			localStorage.setItem("step2", JSON.stringify(dadosEconomicos));
			console.log("step4", step4)
			localStorage.setItem("step3", JSON.stringify(step3));
			localStorage.setItem("step4", JSON.stringify(step4));
		}
	}

	async function fillCombos() {
		const list = await getAllCnaes();
		const municipiorsList = await getAllMunicipios();
		const listPortes = await getAllPortes();
		setPortes(listPortes);
		setCnaesList(list);
		setMunicipios(municipiorsList);
	}

	useEffect(() => {
		const urlPattern = /^\/beneficiario\/view\/\d+$/;
		const url = window.location.pathname;
		if (urlPattern.test(url)) {
			setShowOutrosTrash(true);
		}
	}, []);

	const selectedCnaes = useMemo(() => {
		const newList: ICnae[] = cnaesList.filter((v: ICnae) =>
			formik.values.cnaes.includes(v.id),
		);
		return newList;
	}, [cnaesList, formik.values.cnaes]);

	const addNewTelefone = () => {
		const newTelefone = { titulo: '', telefone: '' };
		const newTelefones = [...formik.values.telefones, newTelefone];
		setNewsPhone(prevState => [...prevState, newTelefones])
		formik.setFieldValue('telefones', newTelefones);
	};

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
							id="inscricaoEstadual"
							label="Ins. Estadual"
							formik={formik}
							col={3}
							mascara="00000000000"
							definitions={{
								"#": /[1-9]/,
							}}
							value={formik.values.inscricaoEstadual}
							required
							onChange={formik.handleChange}
							disabled={isView}
						/>
						<InputMask
							style={{ width: '175px' }}
							id="cpfOuCnpj"
							label="CPF/CNPJ"
							formik={formik}
							col={6}
							mascara="000.000.000-00"
							secondMask="00.000.000/0000-00"
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
						<FormControl className="col3">
							<InputLabel
								error={!!formik.errors.porte}
								required
								id="porte"
							>
								Porte
							</InputLabel>
							<Select
								id="porte"
								name="porte"
								label="Porte"
								labelId="porte"
								placeholder="Selecione um porte"
								value={formik.values.porte}
								error={!!formik.errors.porte}
								fullWidth
								onChange={formik.handleChange}
								disabled={isView}
							>
								{portes.map(
									({ id, descricao }: IPorte, index) => {
										return (
											<MenuItem key={index} value={id}>
												{descricao}
											</MenuItem>
										);
									},
								)}
							</Select>
							<span className={styles.error}>
								{formik.errors.porte as string | undefined}
							</span>
						</FormControl>
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
							className={`col12 ${formik.errors.cnaes ||
								formik.errors.cnaes?.length === 0
								? styles.error
								: ""
								}`}
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
						{formik.errors.cnaes && (
							<span className={styles.error}>
								{formik.errors.cnaes as string | undefined}
							</span>
						)}
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
					<div className={styles.beneficiarioForm}>
						<div>
							{newPhone.map((tipoTelefone, index) => (
								<div key={index} style={{ marginBottom: '15px' }}>
									<div style={{ display: 'flex' }}>
										<div style={{ flex: '1', marginRight: '15px' }}>
											<InputLabel id={`select-telefone-${index}`}>Tipo de Telefone</InputLabel>
											<Select
												labelId={`select-telefone-${index}`}
												id={`select-telefone-${index}`}
												label={`select-telefone-${index}`}
												value={formik.values.telefones[index]?.titulo || ""}
												onChange={(ev) => {
													const selectedTitulo = ev.target.value;
													const newTelefones = [...formik.values.telefones];
													newTelefones[index] = { titulo: selectedTitulo, telefone: "" };
													formik.setFieldValue("telefones", newTelefones);
												}}
												disabled={isView}
												style={{ width: '220px' }}
											>
												{excludedListTelefones.map((tipo) => (
													<MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
												))}
											</Select>
										</div>
										<div style={{ marginTop: '23px' }}>
											<InputMask
												id={`telefone-${index}`}
												label="Telefone"
												formik={formik}
												col={9}
												mascara="(00) 0000-0000"
												secondMask="(00) 0 0000-0000"
												definitions={{
													"#": /[1-9]/,
												}}
												value={formik.values.telefones[index]?.telefone || ""}
												required={formik.values.telefones[index]?.titulo && formik.values.telefones[index]?.telefone.trim() === ''}
												onChange={(ev) => {
													const updatedTelefone = ev.target.value;
													const newTelefones = [...formik.values.telefones];
													newTelefones[index] = { ...newTelefones[index], telefone: updatedTelefone };
													formik.setFieldValue("telefones", newTelefones);
												}}
												disabled={isView}
												style={{ width: '250px' }}
											/>
											{formik.values.telefones[index]?.titulo && formik.values?.telefones[index]?.telefone.trim() === '' && (
												<span className={styles.error}>Telefone é obrigatório.</span>
											)}
										</div>
										{index >= excludedListTelefones.length ? (
											<div
												style={{ marginTop: '20px' }}
												className={`${styles.col1} ${styles.removeButtonDiv}`}
											>
												<RemoveIcon
													className={styles.removeIcon}
													onClick={() => {
														const newTelefones = [...formik.values.telefones];
														const updatedNewPhone = [...newPhone];
														newTelefones.pop();
														updatedNewPhone.pop();
														setNewsPhone(updatedNewPhone);
														formik.setFieldValue("telefones", newTelefones);
													}}
												/>
											</div>
										) : (
											<div style={{ width: '36px', marginTop: '30px', marginLeft: '9px' }}></div>
										)}
									</div>
								</div>
							))}
							{['EMPRESA', 'CONTABILIDADE', 'ADMINISTRADOR'].some(tipo => !formik.values?.telefones.find(telefone => telefone?.titulo === tipo)) && (
								<span className={styles.error}>
									Pelo menos um telefone para empresa, contabilidade e administrador é obrigatório.
								</span>
							)}
						</div>
					</div>
					{!isView && (
						<Button
							type="button"
							variant="contained"
							className={styles.primaryButton}
							onClick={addNewTelefone}
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
