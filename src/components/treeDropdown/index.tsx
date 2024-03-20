import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./threeDropdown.scss";

type props = {
	data: never[];
	onChange: (_: any, value: any) => void;
	placeholder: string;
	[key: string]: any;
};

const TreeDropdown = ({ data, placeholder, onChange, rest }: props) => {
	return (
		<DropdownTreeSelect
			data={data}
			onChange={onChange}
			texts={{
				placeholder: placeholder,
			}}
			showDropdown="default"
			keepTreeOnSearch
			inlineSearchInput
			clearSearchOnChange
			mode="hierarchical"
			{...rest}
		/>
	);
};

export default React.memo(TreeDropdown);
