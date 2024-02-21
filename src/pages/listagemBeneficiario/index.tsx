import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams, ptPT } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBeneficiarios } from "../../services/beneficiario";
import styles from "./styles.module.scss";

function listagemBeneficiario() {
	const [rows, setRows] = useState([]);
	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 70 },
		{
			field: "nomeOuRazaoSocial",
			headerName: "Nome ou Razão social",
			width: 350,
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
		const res = await getAllBeneficiarios();
		setRows(res.content);
	}

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.buttonContainer}>
				<Button
					type="button"
					variant="contained"
					className={styles.primaryButton}
					onClick={(ev) => {
						navigate("/beneficiario/new");
					}}
				>
					<AddIcon />
					Novo Beneficiário
				</Button>
			</div>
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
				localeText={ptPT.components.MuiDataGrid.defaultProps.localeText}
			/>
		</div>
	);
}

export default listagemBeneficiario;
