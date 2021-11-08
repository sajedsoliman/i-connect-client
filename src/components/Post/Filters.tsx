import { useState } from "react";
import { useHistory } from "react-router-dom";

// ui
import { Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";

// types
type Props = {
	pagesCount: number;
	fetchMore: any;
};

const Filters = ({ pagesCount, fetchMore }: Props) => {
	const history = useHistory();

	// state vars
	const [limit, setLimit] = useState(5);

	const buttonsArray = Array.from({ length: pagesCount });

	const handleFilter = (pageNumber: number) => {
		// fetch more posts
		fetchMore({
			variables: {
				pageNumber,
			},
		});

		const searchParams = new URLSearchParams();

		searchParams.set("limit", limit.toString());
		searchParams.set("pageNumber", pageNumber.toString());

		const stringParams = searchParams.toString();
		history.push({
			pathname: "",
			search: stringParams,
		});
	};

	return (
		<Box display="flex" flexDirection="column">
			<Grid container>
				<Grid item sm={4}>
					<TextField
						fullWidth
						size="small"
						label="Limit"
						value={limit}
						onChange={(e) => setLimit(parseInt(e.target.value) || 5)}
					/>
				</Grid>
			</Grid>

			<ButtonGroup sx={{ mt: 1 }}>
				{buttonsArray.map((_, index) => (
					<Button key={index} onClick={() => handleFilter(index + 1)}>
						{index + 1}
					</Button>
				))}
			</ButtonGroup>
		</Box>
	);
};

export default Filters;
