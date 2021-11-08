import { Redirect, Route, useLocation } from "react-router-dom";

// hooks
import useGlobalStore from "../../store/useGlobalStore";

const UnAuthRoute = ({
	component,
	path,
	exact,
}: {
	component: any;
	path: string;
	exact?: boolean;
}) => {
	const user = useGlobalStore((state) => state.user);
	const location = useLocation<{ before: string }>();
	const beforePath = location.state?.before;

	return !user.signedIn ? (
		<Route exact={exact} path={path} component={component} />
	) : (
		<Redirect to={beforePath ? beforePath : "/"} />
	);
};

export default UnAuthRoute;
