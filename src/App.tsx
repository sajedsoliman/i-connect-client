import { useEffect } from "react";
import { Switch } from "react-router-dom";

// filepond assets
import { registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);
// filepond end

// ui
import { Container } from "@mui/material";

// components
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// hooks
import useGlobalStore from "./store/useGlobalStore";

// info
import { ApiAuthEndpoint } from "./utils/info";
import UnAuthRoute from "./components/Routes/UnAuthRoute";
import AuthRoute from "./components/Routes/AuthRoute";
import Profile from "./pages/user-profile/Profile";

function App() {
	const loginUser = useGlobalStore((state) => state.loginUser);

	async function fetchUser() {
		const response = await fetch(`${ApiAuthEndpoint}/user`, {
			credentials: "include",
		});
		const result = await response.json();

		loginUser(result);
	}

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<main>
			<Header />

			<Container sx={{ pt: 3 }}>
				<Switch>
					<AuthRoute path="/" exact component={Homepage} />
					<AuthRoute path="/user/:id" component={Profile} />
					<UnAuthRoute path="/login" component={Login} />
					<UnAuthRoute path="/register" component={Register} />
				</Switch>
			</Container>
		</main>
	);
}

export default App;
