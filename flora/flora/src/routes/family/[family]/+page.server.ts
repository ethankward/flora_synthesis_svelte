import { env } from '$env/dynamic/private';
import { GetFamilyTaxa } from '../../../data_classes/taxon';
import { APIManager } from "../../../util/api";


export async function load({ params }) {
    const api_manager = new APIManager(env.API_ENDPOINT);

    const family = params.family;
    const family_taxa_endpoint = new GetFamilyTaxa();

    return {
        family: family,
        taxon_data: (await family_taxa_endpoint.action(api_manager, { family: family })).data,
    }
}