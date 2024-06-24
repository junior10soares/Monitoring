import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, ptPT } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getAllBeneficiarios } from "../../services/beneficiario";
import { cpfMask } from "../../utils/Mask";
import styles from "./styles.module.scss";

function listagemBeneficiario() {
	const [rows, setRows] = useState([]);
	const [isLoading, setIsLoading] = useOutletContext();

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 100 },
		{
			field: "nomeOuRazaoSocial",
			headerName: "Nome ou Razão social",
			width:
				window.innerWidth <= 1400
					? 300
					: window.innerWidth <= 1770
					? 380
					: 800,
		},
		{ field: "cpfOuCnpj", headerName: "CPF/CNPJ", width: 300 },
		{
			field: "nomeFantasia",
			headerName: "Nome Fantasia",
			width: 300,
		},
		{
			field: "inscricaoEstadual",
			headerName: "Inscrição Estadual",
			sortable: false,
			width: 150,
		},
		{
			field: "actions",
			headerName: "Ações",
			sortable: false,
			width: 100,
			type: "actions",
			getActions: (params: GridRowParams) => [
				<EditIcon
					onClick={() => navigate(`/beneficiario/edit/${params.id}`)}
					className={styles.iconButton}
				/>,
				<VisibilityIcon
					onClick={() => navigate(`/beneficiario/view/${params.id}`)}
					className={styles.iconButton}
				/>,
			],
		},
	];
	const navigate = useNavigate();

	async function fetch() {
		setIsLoading(true);
		const res = await getAllBeneficiarios();
		const formated = res.content.map((i) => ({
			...i,
			cpfOuCnpj: cpfMask(i.cpfOuCnpj),
		}));
		setRows(formated);
		setIsLoading(false);
		return formated;
	}

	useEffect(() => {
		(() => fetch())();
	}, []);

	const handleNewBeneficiario = () => {
		for (let index = 0; index < 5; index++) {
			localStorage.removeItem(`step${index + 1}`);
		}
		navigate("/beneficiario/new");
	};

	return (
		<div className={styles.container}>
			<div className={styles.buttonContainer}>
				<Button
					type="button"
					variant="contained"
					className={styles.primaryButton}
					onClick={handleNewBeneficiario}
				>
					<AddIcon />
					Novo Beneficiário
				</Button>
			</div>
			{rows.length > 0 ? (
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					pageSizeOptions={[10, 20]}
					disableRowSelectionOnClick
					localeText={
						ptPT.components.MuiDataGrid.defaultProps.localeText
					}
				/>
			) : (
				<div
					style={{
						textAlign: "center",
						marginTop: "20px",
						fontSize: "16px",
						color: "#666",
					}}
				>
					Nenhum beneficiário encontrado
				</div>
			)}
		</div>
	);
}

export default listagemBeneficiario;
