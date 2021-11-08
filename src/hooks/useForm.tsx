import React, { useState } from "react";

type OptionsFlags<Type> = {
	[Property in keyof Type]?: string;
};

export function useForm<T>(
	initialValues: T,
	validationOnInput = true,
	validation: (
		inputs: OptionsFlags<T>,
		setErrors: React.Dispatch<React.SetStateAction<OptionsFlags<T>>>
	) => boolean
) {
	const [values, setValues] = useState(initialValues);

	type ErrorType = OptionsFlags<T>;
	const [validationErrors, setErrors] = useState<ErrorType>({});

	// handle inputs change
	const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name as keyof T;
		const value = e.target.value;

		setValues((prev: T) => {
			return {
				...prev,
				[name]: value,
			};
		});

		if (validationOnInput) {
			const firedInput = { [name]: value } as {
				[Property in keyof T]: string;
			};
			validation(firedInput, setErrors);
		}
	};

	// reset form
	const resetForm = (values = initialValues) => {
		setValues(values);
		setErrors({});
	};

	// input common props
	const inputCommonProps = (
		label: string,
		name: keyof T,
		value: string,
		error?: string
	) => ({
		label,
		onChange: handleInputsChange,
		value: value,
		name,
		...(error != undefined && error != ""
			? { helperText: error, error: true }
			: {}),
	});

	return {
		values,
		setValues,
		handleInputsChange,
		validationErrors,
		setErrors,
		resetForm,
		inputCommonProps,
	};
}

// types
type FormProps = {
	children: any;
	onSubmit: () => void;
	otherProps?: Record<string, string>;
};
export function Form({ children, onSubmit, ...otherProps }: FormProps) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
			{...otherProps}
		>
			{children}
		</form>
	);
}
