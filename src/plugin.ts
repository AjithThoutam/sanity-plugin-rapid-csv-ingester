import "./styles/tailwind.css";

import { definePlugin } from "sanity";

import { DEFAULT_CONFIG, packageID } from "./constants";
import Homepage from "./Homepage";
import type { PluginConfig } from "./types";

/**
 * Plugin: Rapid CSV Ingester
 * @public
 */
export const rapidCSVIngester = definePlugin<PluginConfig | undefined>(config => {
	const pluginConfig = { ...DEFAULT_CONFIG, ...config };

	return {
		name: packageID,
		tools: prev => {
			return [
				...prev,
				{
					name: packageID,
					title: "Rapid CSV Ingester",
					component: Homepage,
					options: pluginConfig
				}
			];
		}
	};
});
