import { APIManager } from "../../../util/api";
import { env } from '$env/dynamic/private';

export async function load({ params }) {
    let api_manager = new APIManager(env.API_ENDPOINT);

    let family = params.family;

    return {
        family: family,
        taxon_data: (await api_manager.getFamilyTaxa(family)).data,
    }
}