import { TreeSelect } from "primereact/treeselect";
import "./threeDropdown.scss";

type Props = {
	data: any[];
	onChange?: (event: any) => void;
	placeholder: string;
	value: any;
	disabled?: boolean;
	required?: boolean;
};

const TreeDropdown = ({
	data,
	placeholder,
	value,
	onChange,
	disabled = false,
	required = false,
}: Props) => {
	return (
		<div className="treeSelectDiv flex justify-content-center">
			<TreeSelect
				value={value}
				onChange={onChange}
				disabled={disabled}
				filter
				options={data}
				placeholder={placeholder}
				required
			/>
		</div>
	);
};

export default TreeDropdown;
