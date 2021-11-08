import { Redirect, useLocation, Route } from "react-router-dom";

// hooks
import useGlobalStore from "../../store/useGlobalStore";

const AuthRoute = ({
	component,
	path,
	exact = false,
}: {
	component: any;
	path: string;
	exact?: boolean;
}) => {
	const user = useGlobalStore((state) => state.user);
	const location = useLocation();

	return user.signedIn ? (
		<Route exact={exact} path={path} component={component} />
	) : (
		<Redirect
			to={{
				pathname: "/login",
				state: { before: location.pathname },
			}}
		/>
	);
};

export default AuthRoute;
