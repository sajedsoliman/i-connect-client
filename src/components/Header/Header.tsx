// ui
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

// store
import useGlobalStore from "../../store/useGlobalStore";

// components
import AuthNav from "./AuthNav";
import UnAuthNav from "./UnAuthNav";

const Header = () => {
	// store (for user)
	const user = useGlobalStore((state) => state.user);

	const showNav = () => {
		return user.signedIn ? <AuthNav user={user} /> : <UnAuthNav />;
	};

	return (
		<AppBar variant="outlined" elevation={0} position="relative">
			<Container>
				<Toolbar variant="dense" disableGutters>
					<Typography fontWeight={520} fontSize={18} letterSpacing={1.3}>
						<NavLink to="/">I Connect</NavLink>
					</Typography>

					{showNav()}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
