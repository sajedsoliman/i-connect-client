import { NavLink } from "react-router-dom";

// ui
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const UnAuthNav = () => {
	return (
		<Typography marginLeft="auto" component="span">
			<Box display="inline-block" mr={0.8}>
				<NavLink to="/login">
					<Button variant="outlined" size="small" color="inherit">
						login
					</Button>
				</NavLink>
			</Box>
			<NavLink to="/register">
				<Button variant="outlined" size="small" color="inherit">
					register
				</Button>
			</NavLink>
		</Typography>
	);
};

export default UnAuthNav;
