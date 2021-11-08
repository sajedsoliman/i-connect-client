import { useState } from "react";

// ui
import {
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
	IconButton,
	CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";

// hooks
import useGlobalStore from "../../store/useGlobalStore";

// util

// components
import PostEditForm from "./PostEditForm";

// apollo
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_POST, GET_POST, TOGGLE_LIKE } from "../../graphql/queries";

// types
import { Post as PostType } from "../../types";
type Props = {
	id: string;
};

const Post = ({ id }: Props) => {
	// store & state
	const { user } = useGlobalStore((state) => state);
	const [editView, setEditView] = useState(false);
	const { loading, data } = useQuery(GET_POST, {
		variables: {
			id,
		},
	});
	const [deletePost] = useMutation(DELETE_POST, {
		variables: { id },
		refetchQueries: ["getPostList", "getPostListCount"],
	});
	const [toggleLike] = useMutation(TOGGLE_LIKE, {
		variables: { id, liker: user.username, likerId: user.id },
	});

	if (loading) return null;
	const post: PostType = data.getPost;

	const isPostAuthor = user.username === post.author;

	const handleDeletePost = () => {
		deletePost();
	};
	const handleToggleLike = async () => {
		toggleLike();
	};

	const showDeleteOption = () => {
		return (
			isPostAuthor && (
				<IconButton size="small" color="error" onClick={handleDeletePost}>
					<DeleteOutlineIcon fontSize="medium" />
				</IconButton>
			)
		);
	};
	const showUpdateOption = () => {
		return (
			isPostAuthor && (
				<IconButton size="small" color="info" onClick={handleEditViewChange}>
					<EditIcon fontSize="medium" />
				</IconButton>
			)
		);
	};
	const showLikeButton = () => {
		return (
			<Box display="flex" alignItems="center">
				<IconButton
					size="small"
					color="secondary"
					sx={{ ml: 1 }}
					onClick={handleToggleLike}
				>
					<FavoriteIcon fontSize="medium" />
				</IconButton>
				<Typography sx={{ cursor: "default" }}>{post.likes.length}</Typography>
			</Box>
		);
	};
	const handleEditViewChange = () => {
		setEditView((prev) => !prev);
	};

	const submitUpdatePost = () => {
		// fetch the post
		// fetchPost();

		// set the edit view to false
		setEditView(false);
	};

	// const post = data.getPost;
	return (
		<Grid item sm={6} lg={4}>
			<Card variant="outlined" sx={{ position: "relative" }}>
				{editView ? (
					<PostEditForm
						id={post._id}
						currentBody={post.body}
						submitUpdatePost={submitUpdatePost}
						exitEditView={() => setEditView(false)}
					/>
				) : (
					<Box>
						<Button
							size="small"
							sx={{
								fontWeight: 530,
								borderRadius: "0 10px 10px 0",
								mt: 1,
							}}
							variant="contained"
							disableElevation
						>
							{post.author}
						</Button>

						<Box sx={{ position: "absolute", right: 0 }} top={1}>
							{showDeleteOption()}
							{showUpdateOption()}
						</Box>

						<CardContent>
							<Typography variant="subtitle2">{post.body}</Typography>
						</CardContent>

						{showLikeButton()}

						<Typography textAlign="right" pr={1.5} variant="subtitle2">
							{new Date(post.createdDate).toDateString()}
						</Typography>
					</Box>
				)}
			</Card>
		</Grid>
	);
};

export default Post;
