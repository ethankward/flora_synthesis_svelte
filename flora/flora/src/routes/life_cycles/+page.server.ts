import { APIManager } from "../../util/api";
import { env } from '$env/dynamic/private';

export async function load({ }) {
    let api_manager = new APIManager(env.API_ENDPOINT);

    return {
        taxon_data: (await api_manager.getPrimaryChecklistTaxa()).data,
    }
}