import React, { useState } from "react";

// ui
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { PasswordInput } from "../common/controls/controls";
import FilePondCircular from "../components/Controls/FilePondCircular";

// hooks
import { Form, useForm } from "../hooks/useForm";
import useGlobalStore from "../store/useGlobalStore";

// info
import { ApiAuthEndpoint } from "../utils/info";
import { History } from "history";

// types
type Props = {
	history: History<any>;
};

const Register = ({ history }: Props) => {
	// state  & store
	const [profileImage, setProfileImage] = useState(null);

	// useForm hook
	const {
		values: user,
		inputCommonProps,
		resetForm,
		validationErrors,
		setErrors,
	} = useForm({ email: "", password: "", username: "" }, false, validation);

	function validation() {
		const errors: {
			[x: string]: string;
		} = {};

		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
		if ("email" in user) {
			errors.email = emailRegex.test(user.email) ? "" : "Email is not valid";
		}
		if ("username" in user) {
			errors.username =
				user.username.length > 8 ? "" : "Username must be at least 8 letters";
		}
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
		if ("password" in user) {
			errors.password = passwordRegex.test(user.password)
				? ""
				: "Password is not strong enough";
		}
		// if (!profileImage) {
		// 	errors.profileImage = "please add your photo";
		// }

		setErrors(errors);

		return Object.values(errors).every((input) => input.length === 0);
	}

	async function registerUser() {
		const response = await fetch(`${ApiAuthEndpoint}/register`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
	}

	const handleSubmit = () => {
		if (validation()) {
			// register the user
			registerUser();

			// reset the form
			resetForm();

			// go to login page
			history.push("/login", {
				message: "You can login now.",
			});
		}
	};

	return (
		<Box sx={{ maxWidth: "50%", m: "auto" }}>
			<Form onSubmit={handleSubmit}>
				<Box display="flex" flexDirection="column">
					<Grid container alignItems="center" spacing={2}>
						<Grid item xs={10}>
							<TextField
								size="small"
								fullWidth
								{...inputCommonProps(
									"Username",
									"username",
									user.username,
									validationErrors.username
								)}
							/>
						</Grid>
						<Grid item xs={2}>
							<FilePondCircular
								key="profile-photo-input"
								label="Profile Image"
								size="small"
								allowedTypes={[
									"image/png",
									"image/jpeg",
									"image/jpg",
									"image/gif",
								]}
								addFileHandler={(error, file) => setProfileImage(file)}
							/>
						</Grid>
					</Grid>
					<TextField
						sx={{ my: 1.5 }}
						size="small"
						{...inputCommonProps(
							"Email",
							"email",
							user.email,
							validationErrors.email
						)}
					/>
					<PasswordInput
						{...inputCommonProps(
							"Password",
							"password",
							user.password,
							validationErrors.password
						)}
					/>
					<Button
						type="submit"
						variant="outlined"
						color="primary"
						sx={{ mt: 1.5 }}
					>
						Register
					</Button>
				</Box>
			</Form>
		</Box>
	);
};

export default Register;
