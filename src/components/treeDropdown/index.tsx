import { TreeSelect } from "primereact/treeselect";
import React from "react";
import "./threeDropdown.scss";

type props = {
	data: never[];
	onChange: (_: any, value: any) => void;
	placeholder: string;
	[key: string]: any;
};

const TreeDropdown = ({
	data,
	placeholder,
	value,
	onChange,
	...rest
}: props) => {
	return (
		<div className="treeSelectDiv">
			<TreeSelect
				value={value}
				onChange={onChange}
				filter
				options={data}
				placeholder={placeholder}
				{...rest}
			></TreeSelect>
		</div>
	);
};

export default React.memo(TreeDropdown);
