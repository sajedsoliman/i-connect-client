import React, { useState } from "react";

// ui
import { Button, Card, TextField } from "@mui/material";

// hooks
import { Form } from "../../hooks/useForm";
import useGlobalStore from "../../store/useGlobalStore";

// util
import { GraphqlEndpoint } from "../../utils/info";

// apollo
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../graphql/queries";

// types
type Props = {
	fetchPosts: () => void;
};

const PostForm = ({}) => {
	// store and state
	const { user, changePostsSetter } = useGlobalStore((state) => state);
	const [body, setBody] = useState("");
	const [addPost] = useMutation(ADD_POST, {
		variables: {
			post: {
				author: user.username,
				body,
			},
		},
		refetchQueries: ["getPostList", "getPostListCount"],
	});
	const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBody(e.target.value);
	};

	const handleAddPost = () => {
		if (body.length > 10) {
			addPost();

			// reset body
			setBody("");
		}
	};

	return (
		<Form onSubmit={handleAddPost}>
			<Card elevation={8} sx={{ width: 500, mb: 4, p: 1, mx: "auto" }}>
				<TextField
					size="small"
					rows="3"
					fullWidth
					multiline
					label="Post Here..."
					value={body}
					onChange={handleBodyChange}
				/>
				<Button type="submit" variant="outlined" sx={{ mt: 1 }}>
					Add Post
				</Button>
			</Card>
		</Form>
	);
};

export default PostForm;
