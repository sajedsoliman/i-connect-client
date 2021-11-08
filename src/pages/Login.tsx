import { useState } from "react";
import { useLocation } from "react-router-dom";
import { History } from "history";

// ui
import { Alert, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { PasswordInput } from "../common/controls/controls";

// hooks
import { Form, useForm } from "../hooks/useForm";
import useGlobalStore from "../store/useGlobalStore";

// info
import { ApiAuthEndpoint } from "../utils/info";

// types
type Props = {
	history: History;
};

const Login = ({ history }: Props) => {
	// store & state
	const loginUser = useGlobalStore((state) => state.loginUser);
	const [serverError, setServerError] = useState<null | string>(null);

	const location = useLocation<{
		message: string;
		before: string;
	}>();
	const message = location.state?.message;
	const before = location.state?.before;

	// useForm hooks
	const {
		values: user,
		setErrors,
		validationErrors,
		inputCommonProps,
	} = useForm({ email: "", password: "" }, false, validation);

	function validation() {
		const errors: {
			[x: string]: string;
		} = {};

		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
		if ("email" in user) {
			errors.email = emailRegex.test(user.email) ? "" : "Email is not valid";
		}
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
		if ("password" in user) {
			errors.password = passwordRegex.test(user.password)
				? ""
				: "Password is not strong enough";
		}

		setErrors(errors);

		return Object.values(errors).every((input) => input.length === 0);
	}

	const showAlert = () =>
		message ? (
			<Alert sx={{ mb: 3 }} severity="success">
				{message}
			</Alert>
		) : null;
	const showError = () => {
		return (
			serverError && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{serverError}
				</Alert>
			)
		);
	};

	async function handleLoginUser() {
		const response = await fetch(`${ApiAuthEndpoint}/login`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		const result = await response.json();

		loginUser(result);

		return result;
	}

	const handleSubmit = async () => {
		if (validation()) {
			// login the user
			const result = await handleLoginUser();

			// redirect the user to homepage
			if (result.signedIn) return history.replace(before ? before : "/");

			setServerError(result.errorMessage);
		}
	};

	// async function loginWithGoogle() {
	// 	const res = await fetch(`${ApiAuthEndpoint}/google`, {
	// 		credentials: "include",
	// 		mode: "no-cors",
	// 		redirect: "follow",
	// 	});
	// 	const result = await res.json();

	// 	console.log(result);
	// 	loginUser(result);
	// 	// loginUser({
	// 	// 	signedIn: true,
	// 	// });
	// }

	return (
		<Box width="50%" mx="auto">
			{showAlert()}
			{showError()}

			<Form onSubmit={handleSubmit}>
				<Box display="flex" flexDirection="column">
					<TextField
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
						sx={{ mt: 1.5, mb: 1 }}
					>
						Login
					</Button>
					<Button
						variant="outlined"
						color="error"
						href={`${ApiAuthEndpoint}/google`}
						target="_blank"
						// onClick={loginWithGoogle}
					>
						Login With Google
					</Button>
				</Box>
			</Form>
		</Box>
	);
};

export default Login;
