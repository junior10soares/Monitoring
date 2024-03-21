import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import styles from "./modal.module.scss";

const BasicModal = React.forwardRef(({ children }, ref) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	React.useImperativeHandle(
		ref,
		() => {
			return { handleOpen, handleClose };
		},
		[],
	);

	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className={styles.container}>
					<div className={styles.header}>
						<CloseIcon
							onClick={handleClose}
							className={styles.closeIcon}
						/>
					</div>
					{children}
				</div>
			</Modal>
		</div>
	);
});

export default BasicModal;
