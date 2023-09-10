import { APIManager } from "../../../util/api";
import { env } from '$env/dynamic/private';

export async function load({ params }) {
    let api_manager = new APIManager(env.API_ENDPOINT);

    let genus = params.genus;

    return {
        genus: genus,
        taxon_data: (await api_manager.getGenusTaxa(genus)).data,
    }
}