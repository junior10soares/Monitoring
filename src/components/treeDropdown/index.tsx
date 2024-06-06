import { TreeSelect } from "primereact/treeselect";
import "./threeDropdown.scss";

type Props = {
	data: any[];
	onChange?: (event: any) => void;
	placeholder: string;
	value: any;
	disabled?: boolean
}

const TreeDropdown = ({ data, placeholder, value, onChange, disabled = false }: Props) => {
	return (
		<div className="treeSelectDiv flex justify-content-center">
			<TreeSelect
				value={value}
				onChange={onChange}
				disabled={disabled}
				filter
				options={data}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TreeDropdown;
