import { APIManager } from "../../util/api";
import { env } from '$env/dynamic/private';
import {call} from "../../util/local_api_dispatch";
import { exported_taxon_endpoints } from "../../data_classes/taxon";

export async function load({ }) {
    let api_manager = new APIManager(env.API_ENDPOINT);

    return {
        taxon_data: (await call(api_manager, {}, exported_taxon_endpoints.get_primary_checklist_taxa)),
    }
}