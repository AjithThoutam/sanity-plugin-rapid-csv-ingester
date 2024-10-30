import type React from "react";
import {
	type ReactElement,
	useCallback,
	useEffect,
	useRef,
	useState
} from "react";
import toast, { Toaster } from "react-hot-toast";

import { useClient } from "./hooks/useClient";
import useDocumentInfo from "./hooks/useDocumentInfo";
import type { DocumentCheckTypes, DocumentInfoResult } from "./types";
import { csvToJson, generateUniqueID } from "./utils";

export default function Homepage(): ReactElement {
	const client = useClient();

	const [file, setFile] = useState<File | null>(null);
	const [jsonData, setJsonData] = useState<DocumentCheckTypes[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = event.target.files?.[0];
			if (selectedFile) {
				setFile(selectedFile);
			}
		},
		[]
	);

	const handleFileUpload = useCallback(() => {
		if (file) {
			const reader = new FileReader();
			reader.onload = e => {
				const csvData = e.target?.result as string;
				const data = csvToJson(csvData).filter(
					(a: DocumentCheckTypes) => a?._type
				);
				setJsonData(data);

				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
				setFile(null);
			};
			reader.readAsText(file);
		}
	}, [file]);

	const getDocumentInfo = useDocumentInfo();

	const getDocumentsInfo = useCallback(async (): Promise<
		DocumentInfoResult[]
	> => {
		const documentPromises = jsonData.map(a =>
			getDocumentInfo({ _type: a._type, title: a.title })
		);
		return await Promise.all(documentPromises);
	}, [getDocumentInfo, jsonData]);

	useEffect(() => {
		const createUniqueDocument = async () => {
			const documentsInfo = await getDocumentsInfo();
			for (const c of documentsInfo.filter(b => !b.isExists)) {
				const doc = {
					...jsonData.find(data => data.title === c.title),
					_id: `drafts.${generateUniqueID()}`
				};

				client
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.create(doc)
					.then(createDocRes => {
						console.log(createDocRes);
						toast.success(`Uploaded ${c.title} document successfully!`);
					})
					.catch(err => {
						console.error(err);
						toast.error(`Uploading ${c.title} document failed!`);
					});
			}
		};

		createUniqueDocument();
	}, [client, getDocumentsInfo, jsonData]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-black'>
			<Toaster />
			<div className='bg-white p-6 rounded-lg shadow-lg'>
				<h1 className='text-2xl font-bold mb-4 text-black'>Upload CSV File</h1>
				<input
					ref={fileInputRef}
					type='file'
					accept='.csv'
					onChange={handleFileChange}
					className='mb-4 p-2 border border-gray-300 rounded'
				/>
				<button
					type='button'
					className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 active:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
					onClick={handleFileUpload}
					disabled={!file}>
					Submit
				</button>
			</div>
		</div>
	);
}
