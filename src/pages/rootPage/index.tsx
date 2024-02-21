import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";

function Root() {
	return (
		<div style={{ maxWidth: "100vw" }}>
			<Sidebar />
			<Outlet />
		</div>
	);
}

export default Root;
