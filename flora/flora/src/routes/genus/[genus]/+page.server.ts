import { env } from '$env/dynamic/private';
import { GetGenusTaxa } from '../../../data_classes/taxon';
import { APIManager } from "../../../util/api";

export async function load({ params }) {
    const api_manager = new APIManager(env.API_ENDPOINT);

    const genus = params.genus;
    const genus_taxa_endpoint = new GetGenusTaxa();

    return {
        genus: genus,
        taxon_data: (await genus_taxa_endpoint.action(api_manager, { genus: genus })).data,
    }
}