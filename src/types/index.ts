/**
 * Plugin configuration
 * @public
 */
export interface PluginConfig {
    dataset: string
}

export type DocumentCheckTypes = {
	_type: string;
	title: string;
};

export type DocumentInfoResult = {
	title: string;
	isExists: boolean;
};
