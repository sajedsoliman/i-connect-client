import React, { useState } from "react";

// material-ui imports
import { TextField } from "@mui/material";

// icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// types
type Props = {
	validationError?: string;
	value: string;
	label: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	otherProps?: {
		[x: string]: any;
	};
};

export default function PasswordInput({
	validationError,
	onChange,
	value,
	label,
	name,
	...otherProps
}: Props) {
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<TextField
			{...(validationError && { error: true, helperText: validationError })}
			variant="outlined"
			size="small"
			margin="dense"
			value={value}
			onChange={onChange}
			name={name}
			label={label}
			type={showPassword ? "text" : "password"}
			InputProps={{
				endAdornment: showPassword ? (
					<Visibility
						style={{ cursor: "pointer" }}
						onClick={handlePasswordVisibility}
					/>
				) : (
					<VisibilityOff
						style={{ cursor: "pointer" }}
						onClick={handlePasswordVisibility}
					/>
				),
			}}
			fullWidth
			{...otherProps}
		/>
	);
}
