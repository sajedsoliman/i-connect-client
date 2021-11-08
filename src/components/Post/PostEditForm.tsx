import { useState } from "react";

// ui
import { Button, TextField } from "@mui/material";

// utils

// apollo
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../../graphql/queries";

// components
import { Form } from "../../hooks/useForm";
import { Box } from "@mui/system";

type Props = {
	id: string;
	currentBody: string;
	submitUpdatePost: () => void;
	exitEditView: () => void;
};

const PostEditForm = ({
	id,
	currentBody,
	submitUpdatePost,
	exitEditView,
}: Props) => {
	const [body, setBody] = useState("");
	const [updatePost] = useMutation(UPDATE_POST, {
		variables: { body, id },
	});

	const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBody(e.target.value);
	};

	const handleSubmit = () => {
		if (body.length > 10) {
			updatePost();

			submitUpdatePost();
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Box p={1.5}>
				<TextField
					size="small"
					rows="3"
					fullWidth
					multiline
					placeholder={currentBody}
					label="New Body"
					value={body}
					onChange={handleBodyChange}
				/>
				<Box mt={1.5}>
					<Button type="submit" size="small" variant="outlined">
						Edit Post
					</Button>
					<Button
						size="small"
						variant="outlined"
						color="error"
						onClick={(_) => submitUpdatePost()}
						sx={{ ml: 0.5 }}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</Form>
	);
};

export default PostEditForm;
