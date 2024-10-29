import { useCallback } from "react";

import type { DocumentCheckTypes, DocumentInfoResult } from "../";
import { useClient } from "./useClient";

export default function useDocumentInfo(): (
	params: DocumentCheckTypes,
) => Promise<DocumentInfoResult> {
	const client = useClient();

	const getDocumentInfo = useCallback(
		async ({
			_type,
			title,
		}: DocumentCheckTypes): Promise<DocumentInfoResult> => {
			if (!_type || !title) {
				return { title, isExists: false };
			}

			try {
				const res = await client.fetch(
					`*[_type == "${_type}" && title == "${title}"]{title}`,
				);
				return { title, isExists: res.length > 0 };
			} catch (err) {
				console.error(err);
				return { title, isExists: false };
			}
		},
		[client],
	);

	return getDocumentInfo;
}
