import AddIcon from "@mui/icons-material/Add";
import {
	Autocomplete,
	Button,
	Card,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomTextField from "../../../components/customTextField";
import NumericMask from "../../../components/numericMask";
import { getAllNcms } from "../../../services/ncmService";
import { unidadesDeMedida } from "../../../utils/Unm";
import { inputs } from "./inputs";
import styles from "./styles.module.scss";

type step4Type = {
	setStep: Function;
	formik: FormikProps<typeof inputs>;
};

function step4({ setStep, formik }: step4Type) {
	const [ncms, setNcms] = useState([]);
	const { pathname } = useLocation();
	const isView = pathname?.includes("/view");

	useEffect(() => {
		loadData();
		(async function fetch() {
			const list = await getAllNcms();
			setNcms(list);
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
							<span className={styles.col3}>NCM</span>
							<span className={styles.col2}>
								Produto incentivado
							</span>
							<span className={styles.col2}>
								Unidade de medida
							</span>
							<span className={styles.col3}>
								Quantidade interna
							</span>
							<span className={styles.col2}>
								Quant. Interestadual
							</span>
						</div>
						{Object.keys(formik.values?.infoVendas ?? {})?.map(
							(item, index) => (
								<>
									<Autocomplete
										id="ncm"
										options={ncms}
										disableListWrap
										className={styles.col3}
										placeholder="Selecione um NCM"
										disableCloseOnSelect
										getOptionLabel={(option) =>
											`${option.codigo} - ${option.descricao}`
										}
										value={
											formik.values?.infoVendas[index]
												?.ncm
										}
										onChange={(_, value) => {
											formik.setFieldValue(
												`infoVendas[${index}].ncm`,
												value,
											);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												label="NCM"
												placeholder="Selecione um NCM"
											/>
										)}
									/>

									<CustomTextField
										id={`${item}-produto-incentivado`}
										name={`${item}-produto-incentivado`}
										label=""
										col={2}
										formik={formik}
										value={
											formik.values?.infoVendas[index]
												?.produtoIncentivado
										}
										onChange={(ev: {
											target: { value: any };
										}) =>
											formik.setFieldValue(
												`infoVendas[${index}].produtoIncentivado`,
												ev.target.value,
											)
										}
									/>
									<Select
										id="unidadeMedida"
										name="unidadeMedida"
										label=""
										className={styles.col2}
										labelId="unidadeMedida"
										placeholder="Selecione uma cidade"
										value={
											formik.values?.infoVendas[index]
												?.unidadeMedida
										}
										onChange={(ev) =>
											formik.setFieldValue(
												`infoVendas[${index}].unidadeMedida`,
												ev.target.value,
											)
										}
									>
										{unidadesDeMedida?.map(
											(
												{
													key,
													value,
												}: {
													key: string;
													value: string;
												},
												index,
											) => {
												return (
													<MenuItem
														key={index}
														value={key}
													>
														{value}
													</MenuItem>
												);
											},
										)}
									</Select>
									<NumericMask
										id={`${item}-quantidade-interna`}
										name={`${item}-quantidade-interna`}
										formik={formik}
										label=""
										col={2}
										required={false}
										value={
											formik.values?.infoVendas[index]
												?.quantidadeInterna
										}
										onChange={(ev: {
											target: { value: string };
										}) =>
											formik.setFieldValue(
												`infoVendas[${index}].quantidadeInterna`,
												ev.target.value,
											)
										}
									/>
									<NumericMask
										id={`${item}-quantidade-interestadual`}
										name={`${item}-quantidade-interestadual`}
										formik={formik}
										label=""
										col={2}
										required={false}
										value={
											formik.values?.infoVendas[index]
												?.quantidadeInterestadual
										}
										onChange={(ev: {
											target: { value: string };
										}) =>
											formik.setFieldValue(
												`infoVendas[${index}].quantidadeInterestadual`,
												ev.target.value,
											)
										}
									/>
								</>
							),
						)}
						{!isView && (
							<Button
								type="button"
								variant="contained"
								className={styles.primaryButton}
								onClick={() => {
									var lines = formik.values.infoVendas;
									lines.push({
										ncm: null,
										produtoIncentivado: "",
										quantidadeInterestadual: "",
										quantidadeInterna: "",
										unidadeMedida: "",
									});
									formik.setFieldValue("infoVendas", lines);
								}}
							>
								<AddIcon />
								Adicionar linhas e colunas
							</Button>
						)}
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
