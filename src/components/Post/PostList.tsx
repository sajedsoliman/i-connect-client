// router
import { useLocation } from "react-router-dom";

// ui
import { CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";

// components
import Post from "./Post";
import Filters from "./Filters";

// apollo
import { useQuery, NetworkStatus } from "@apollo/client";
import { POST_LIST, POST_LIST_COUNT } from "../../graphql/queries";

// types
type Props = {};

const PostList = ({}: Props) => {
	// router
	const location = useLocation();

	// get filter params from the search
	const getSearchParams = () => {
		const search = location.search;
		const searchParams = new URLSearchParams(search);
		const limit = parseInt(searchParams.get("limit")!) || 5;
		const pageNumber = parseInt(searchParams.get("pageNumber")!) || 1;

		return { limit, pageNumber };
	};

	// fetch postList
	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		POST_LIST,
		{
			variables: {
				limit: getSearchParams().limit,
				pageNumber: getSearchParams().pageNumber,
			},
		}
	);
	// fetch posts count
	const { data: postListCountData, loading: countLoading } =
		useQuery(POST_LIST_COUNT);

	// show a loading bar whenever data is loading or is not ready
	if (loading || countLoading || NetworkStatus[networkStatus] !== "ready")
		return <CircularProgress />;

	// define helper variables
	const posts = data.postList;
	const count = postListCountData.postListCount;
	const pagesCount = Math.ceil(count / getSearchParams().limit);
	const mappedPosts = posts.map((post: { _id: string }) => (
		<Post key={post._id} id={post._id} />
	));

	return (
		<Box>
			{/* list filters */}
			<Filters pagesCount={pagesCount} fetchMore={fetchMore} />

			<Grid container spacing={2} sx={{ mt: 1.5 }}>
				{mappedPosts}
			</Grid>
		</Box>
	);
};

export default PostList;
