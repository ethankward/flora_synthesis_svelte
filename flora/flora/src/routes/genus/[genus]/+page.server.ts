import { APIManager } from "../../../util/api";
import { env } from '$env/dynamic/private';
import {call} from "../../../util/local_api_dispatch";
import { exported_taxon_endpoints } from "../../../data_classes/taxon";

export async function load({ params }) {
    let api_manager = new APIManager(env.API_ENDPOINT);

    let genus = params.genus;

    return {
        genus: genus,
        taxon_data: (await call(api_manager, {genus: genus}, exported_taxon_endpoints.get_genus_taxa)),
    }
}