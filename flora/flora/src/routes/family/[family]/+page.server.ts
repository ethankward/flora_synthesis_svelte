import { APIManager } from "../../../util/api";
import { env } from '$env/dynamic/private';
import {call} from "../../../util/local_api_dispatch";
import { exported_taxon_endpoints } from "../../../data_classes/taxon";


export async function load({ params }) {
    let api_manager = new APIManager(env.API_ENDPOINT);

    let family = params.family;

    return {
        family: family,
        taxon_data: (await call(api_manager, {family: family}, exported_taxon_endpoints.get_family_taxa)),
    }
}