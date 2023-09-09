import { APIManager } from "../../util/api";
import { API_ENDPOINT } from '$env/static/private';

export async function load({ }) {
    let api_manager = new APIManager(API_ENDPOINT);

    return {
        taxon_data: (await api_manager.getPrimaryChecklistTaxa()).data,
    }
}