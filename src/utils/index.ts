import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

export function generateUniqueID(): string {
	return uuidv4().replace(/-/g, "").slice(0, 12);
}

export function csvToJson(csvData: string): any[] {
	const results: any[] = [];

	Papa.parse(csvData, {
		header: true,
		dynamicTyping: true,
		complete: parsedResults => {
			const data = parsedResults.data.map((row: any) => {
				const jsonObject: any = {};

				for (const key of Object.keys(row)) {
					const keys = key.split("/");
					let currentLevel = jsonObject;

					for (let i = 0; i < keys.length; i++) {
						const k = keys[i];
						if (i === keys.length - 1) {
							currentLevel[k] = row[key];
							if (k === "_key") {
								currentLevel[k] = generateUniqueID();
							}
						} else {
							if (!currentLevel[k]) {
								currentLevel[k] = isNaN(Number(keys[i + 1])) ? {} : [];
							}
							currentLevel = currentLevel[k];
						}
					}
				}

				return jsonObject;
			});

			results.push(...data);
		}
	});

	return results;
}
