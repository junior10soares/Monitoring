import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeneficiarioStep1 from "../pages/cadastroBeneficiario";
import ErrorPage from "../pages/erroPage";
import ListagemBeneficiario from "../pages/listagemBeneficiario";
import Login from "../pages/login";
import Root from "../pages/rootPage";

const router = createBrowserRouter([
	{
		path: "/34214321432",
		element: <Login />,
	},
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/beneficiario",
				element: <ListagemBeneficiario />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/beneficiario/new",
				element: <BeneficiarioStep1 />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/beneficiario/view/:id",
				element: <BeneficiarioStep1 />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/beneficiario/edit/:id",
				element: <BeneficiarioStep1 />,
				errorElement: <ErrorPage />,
			},
		],
	},
]);
function App() {
	return (
		<PrimeReactProvider>
			<RouterProvider router={router} />
		</PrimeReactProvider>
	);
}

export default App;
