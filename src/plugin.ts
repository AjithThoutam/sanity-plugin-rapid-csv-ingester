import "./styles/tailwind.css";

import { definePlugin } from "sanity";

import { DEFAULT_CONFIG, packageID } from "./constants";
import Homepage from "./Homepage";
import type { PluginConfig } from "./types";

/**
 * Plugin: Content Automation
 * @public
 */
export const ContentAutomation = definePlugin<PluginConfig | undefined>(config => {
	const pluginConfig = { ...DEFAULT_CONFIG, ...config };

	return {
		name: packageID,
		tools: prev => {
			return [
				...prev,
				{
					name: packageID,
					title: "Content Automation",
					component: Homepage,
					options: pluginConfig
				}
			];
		}
	};
});
