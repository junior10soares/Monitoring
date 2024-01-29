import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";

function Root() {
	return (
		<div>
			<Sidebar />
			<Outlet />
		</div>
	);
}

export default Root;
