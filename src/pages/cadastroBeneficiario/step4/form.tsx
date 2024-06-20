import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/DeleteOutline";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import { useEffect, useState } from "react";
import "react-dropdown-tree-select/dist/styles.css";
import { useLocation, useOutletContext } from "react-router-dom";
import CustomTextField from "../../../components/customTextField";
import NumericMask from "../../../components/numericMask";
import TreeDropdown from "../../../components/treeDropdown";
import { getUnidadeMedida } from "../../../services/beneficiario";
import { getAllNcms } from "../../../services/ncmService";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step4Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step4({ setStep, formik }: step4Type) {
	const [ncms, setNcms] = useState([]);
	const [unidadeMedida, setUnidadeMedida] = useState([]);
	const { pathname } = useLocation();
	const [isLoading, setIsLoading] = useOutletContext();
	const isView = pathname?.includes("/view");
	const [isAddButtonVisible, setIsAddButtonVisible] = useState(false);

	useEffect(() => {
		setIsAddButtonVisible(
			formik.values.infoVendas.every(
				(linha) =>
					linha.ncm?.id &&
					linha.produtoIncentivado &&
					linha.unidadeMedida &&
					(linha.quantidadeInterna !== "" ||
						linha.quantidadeInterna === 0) &&
					(linha.quantidadeInterestadual !== "" ||
						linha.quantidadeInterestadual === 0),
			),
		);
	}, [formik.values.infoVendas]);

	useEffect(() => {
		loadData();
		(async function fetch() {
			setIsLoading(true);
			const list = await getAllNcms();
			setNcms(list);
			setIsLoading(false);
		})();
	}, []);

	useEffect(() => {
		(async function fetch() {
			const listUnidadeMedida = await getUnidadeMedida();
			setUnidadeMedida(listUnidadeMedida);
		})();
	}, []);

	function loadData() {
		const localItem = localStorage.getItem("step4");
		if (localItem) {
			formik.setValues(JSON.parse(localItem));
		}
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={styles.container}>
				<Card className={styles.card}>
					<h1 className={styles.title}>Informações de venda anual</h1>
					<h3 className={styles.subtitle}>
						Preencha corretamente o formulário
					</h3>
					<div className={styles.beneficiarioForm}>
						<div className={styles.tableHeader}>
							<span
								className={`${styles.col3} ${styles.monthTitle}`}
							>
								NCM
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Produto incentivado
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Unidade de medida
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Quantidade interna
							</span>
							<span
								className={`${styles.col2} ${styles.monthTitle}`}
							>
								Quant. Interestadual
							</span>
							<span className={styles.col1}></span>
						</div>

						<FieldArray name="infoVendas">
							{({ push, remove }) => (
								<>
									{formik.values.infoVendas.map(
										(linha, index) => (
											<div
												key={index}
												className={styles.TableInputs}
											>
												<div
													className={`${styles.col3} card`}
												>
													<TreeDropdown
														data={ncms}
														onChange={(ev) => {
															const selectedNcm =
																ev.target.value;
															formik.setFieldValue(
																`infoVendas[${index}].ncm.id`,
																selectedNcm,
															);
														}}
														value={linha?.ncm?.id}
														placeholder="Selecione um NCM"
														disabled={isView}
													/>
													{formik.errors.infoVendas?.[
														index
													]?.ncm && (
														<span
															className={
																styles.error
															}
														>
															{
																formik.errors
																	.infoVendas[
																	index
																].ncm
															}
														</span>
													)}
												</div>
												<CustomTextField
													id={`infoVendas[${index}].produtoIncentivado`}
													name={`infoVendas[${index}].produtoIncentivado`}
													label=""
													col={2}
													formik={formik}
													disabled={isView}
													required
													error={
														!!formik.errors
															?.infoVendas?.[
															index
														]?.produtoIncentivado
													}
													value={
														linha.produtoIncentivado
													}
													onChange={(ev) =>
														formik.setFieldValue(
															`infoVendas[${index}].produtoIncentivado`,
															ev.target.value,
														)
													}
												/>
												<Autocomplete
													id={`infoVendas[${index}].unidadeMedida`}
													options={unidadeMedida}
													disableListWrap
													className={styles.col2}
													placeholder="Selecione uma unidade de medida"
													disabled={isView}
													disableCloseOnSelect
													getOptionLabel={(option) =>
														option.descricao
													}
													value={
														unidadeMedida.find(
															(option) =>
																option.id ===
																linha
																	.unidadeMedida
																	?.id,
														) || null
													}
													onChange={(_, newValue) => {
														formik.setFieldValue(
															`infoVendas[${index}].unidadeMedida`,
															newValue,
														);
													}}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Unidade de Medida"
															placeholder="Selecione uma unidade de medida"
															error={
																!!formik.errors
																	?.infoVendas?.[
																	index
																]?.unidadeMedida
															}
															helperText={
																formik.errors
																	?.infoVendas?.[
																	index
																]?.unidadeMedida
																	? "Campo Obrigatório!"
																	: ""
															}
															required={!isView}
														/>
													)}
												/>
												<NumericMask
													id={`infoVendas[${index}].quantidadeInterna`}
													name={`infoVendas[${index}].quantidadeInterna`}
													formik={formik}
													label=""
													error={
														!!formik.errors
															?.infoVendas?.[
															index
														]?.quantidadeInterna
													}
													col={2}
													disabled={isView}
													required
													value={
														linha.quantidadeInterna ===
														0
															? ""
															: linha.quantidadeInterna
													}
													onChange={(ev) =>
														formik.setFieldValue(
															`infoVendas[${index}].quantidadeInterna`,
															parseFloat(
																ev.target.value,
															) || 0,
														)
													}
												/>
												<NumericMask
													id={`infoVendas[${index}].quantidadeInterestadual`}
													name={`infoVendas[${index}].quantidadeInterestadual`}
													formik={formik}
													label=""
													col={2}
													disabled={isView}
													error={
														!!formik.errors
															?.infoVendas?.[
															index
														]
															?.quantidadeInterestadual
													}
													required
													value={
														linha.quantidadeInterestadual ===
														0
															? ""
															: linha.quantidadeInterestadual
													}
													onChange={(ev) =>
														formik.setFieldValue(
															`infoVendas[${index}].quantidadeInterestadual`,
															parseFloat(
																ev.target.value,
															) || 0,
														)
													}
												/>
												<div
													className={`${styles.col1} ${styles.removeButtonDiv}`}
												>
													{!isView && index > 0 && (
														<RemoveIcon
															className={
																styles.removeIcon
															}
															onClick={() =>
																remove(index)
															}
														/>
													)}
												</div>
											</div>
										),
									)}
									{!isView && isAddButtonVisible && (
										<Button
											type="button"
											variant="contained"
											className={styles.primaryButton}
											onClick={() =>
												push({
													ncm: null,
													produtoIncentivado: "",
													quantidadeInterna: "",
													quantidadeInterestadual: "",
													unidadeMedida: null,
												})
											}
										>
											<AddIcon />
											Adicionar linhas e colunas
										</Button>
									)}
								</>
							)}
						</FieldArray>
					</div>
				</Card>
				<div className={`${styles.col12} ${styles.buttonsRigth}`}>
					<Button
						type="button"
						variant="contained"
						className={styles.secondaryButton}
						onClick={() => {
							setStep(3);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					>
						Voltar
					</Button>
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

export default step4;
