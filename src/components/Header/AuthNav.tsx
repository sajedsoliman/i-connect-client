import { Link, useHistory } from "react-router-dom";
// ui
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

// hooks
import useGlobalStore from "../../store/useGlobalStore";

// types
import { User } from "../../types";
import { ApiAuthEndpoint } from "../../utils/info";
type Props = {
	user: User;
};

const AuthNav = ({ user }: Props) => {
	const logoutUser = useGlobalStore((state) => state.logoutUser);

	// router
	const history = useHistory();

	const handleLogoutUser = async () => {
		const response = await fetch(`${ApiAuthEndpoint}/logout`, {
			method: "POST",
			credentials: "include",
		});
		const result = await response.json();

		if (!result.signedIn) {
			logoutUser();

			history.replace("/login");
		}
	};

	return (
		<Typography ml="auto" component="span">
			<Box display="flex" alignItems="center">
				<Typography mr={2}>
					<Link to={`/user/${user.id}`}>{user.username}</Link>
				</Typography>
				<Button
					size="small"
					variant="outlined"
					color="inherit"
					onClick={handleLogoutUser}
				>
					Logout
				</Button>
			</Box>
		</Typography>
	);
};

export default AuthNav;
