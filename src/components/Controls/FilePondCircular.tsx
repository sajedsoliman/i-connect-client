// ui
import { makeStyles } from "@mui/styles";

// filePond imports
import { FilePond } from "react-filepond";
import {
	FilePondFile,
	FilePondErrorDescription,
	ActualFileObject,
} from "filepond";
import { useEffect, useState } from "react";

const mimiTypes = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/gif",
	"video/mp4",
];

// styles
const useStyles = makeStyles({
	root: {
		border: "1px solid #444",
		marginBottom: 0,

		"&.small": {
			width: 100,
			height: 100,
			"& .filepond--item": {
				width: 80,
				height: 80,
				top: -7,
				left: -7,
			},
		},

		"&.medium": {
			width: 150,
			height: 150,
			"& .filepond--item": {
				width: 120,
				height: 120,
				top: -1,
				left: -3.5,
			},
		},

		"& .filepond--panel-root": {
			background: "none",
		},
	},
});

// types
type Props = {
	label: string;
	size?: "medium" | "small";
	rootClassName?: string;
	allowedTypes: string[];
	addFileHandler: (
		error: FilePondErrorDescription | null,
		file: ActualFileObject
	) => void;
};

function FilePondCircular(props: Props) {
	const classes = useStyles();

	// destructuring through props
	const { addFileHandler, label, rootClassName, size, allowedTypes } = props;

	return (
		<FilePond
			stylePanelLayout="circle"
			className={`${rootClassName} ${classes.root} ${size}`}
			acceptedFileTypes={allowedTypes}
			onaddfile={(error, file) => addFileHandler(error, file.file)}
			labelIdle={label}
			// @ts-ignore
			credits={{ label: "" }}
		/>
	);
}

export default FilePondCircular;
