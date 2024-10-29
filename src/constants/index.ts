import type { PluginConfig } from "../types";

export const DEFAULT_CONFIG: PluginConfig = {
    dataset: process.env.SANITY_STUDIO_API_DATASET || 'dev',
};

export const packageID = "sanity-plugin-rapid-csv-ingester";