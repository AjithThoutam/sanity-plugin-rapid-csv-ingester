import { type SanityClient,useClient as useSanityClient } from "sanity";

export const SANITY_API_VERSION = "2024-05-28";

export function useClient() : SanityClient {
	return useSanityClient({ apiVersion: SANITY_API_VERSION});
}
