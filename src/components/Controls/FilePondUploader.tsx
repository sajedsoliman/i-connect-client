// filepond
import { FilePond } from "react-filepond";
import { FilePondFile, FilePondErrorDescription } from "filepond";

// types
type Props = {
	needEncode?: boolean;
	needImagePreview?: boolean;
	needMulti?: boolean;
	imgReviewMinHeight?: number;
	imgReviewMaxHeight?: number;
	filepondRef?: any;
	wrapperClassName?: string;
	addFileHandler: (
		error: FilePondErrorDescription | null,
		file: FilePondFile
	) => void;
	allowedTypes?: string[];
	onFilesUpdated?: () => void;
	onInit?: () => void;
};

export default function FilePondUploader(props: Props) {
	const {
		needEncode = true,
		needImagePreview = true,
		needMulti = false,
		imgReviewMinHeight = 10,
		imgReviewMaxHeight = 256,
		filepondRef,
		onInit,
		addFileHandler,
		onFilesUpdated,
		wrapperClassName,
		allowedTypes,
	} = props;

	return (
		<div className={wrapperClassName}>
			<FilePond
				allowImagePreview={needImagePreview}
				ref={filepondRef}
				imagePreviewMinHeight={imgReviewMinHeight}
				imagePreviewMaxHeight={imgReviewMaxHeight}
				// @ts-ignore
				allowFileEncode={needEncode}
				allowMultiple={needMulti}
				acceptedFileTypes={allowedTypes}
				credits={{ label: "dasdsads" }}
				onaddfile={addFileHandler}
				onupdatefiles={onFilesUpdated}
				oninit={onInit}
			/>
		</div>
	);
}
