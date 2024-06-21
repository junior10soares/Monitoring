import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { RefObject, forwardRef, useImperativeHandle, useState } from "react";
import "./styles.scss";

type ConfirmDialogParamsType = {
	message: string;
};

const ConfirmDialog = (
	{ message }: ConfirmDialogParamsType,
	ref: RefObject<{}>,
) => {
	const [open, setOpen] = useState(false);
	const [confirmAction, setConfirmAction] = useState<Function>(() => {});

	const handleClickOpen = (action: Function) => {
		setOpen(true);
		if (action) setConfirmAction(() => action);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useImperativeHandle(
		ref,
		() => {
			return {
				handleClickOpen,
				handleClose,
			};
		},
		[],
	);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Não</Button>
				<Button
					onClick={() => {
						confirmAction();
						handleClose();
					}}
					autoFocus
				>
					Sim
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default forwardRef(ConfirmDialog);
