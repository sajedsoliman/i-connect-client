import {} from "react";

// ui
import {} from "@mui/material";

// components
import PostList from "../components/Post/PostList";
import PostForm from "../components/Forms/PostForm";

// hooks
import useGlobalStore from "../store/useGlobalStore";

// utils

// types
import {} from "../types";

const Homepage = () => {
	// store and state
	// const user = useGlobalStore((state) => state.user);

	return (
		<div>
			<PostForm />
			<PostList />
		</div>
	);
};

export default Homepage;
