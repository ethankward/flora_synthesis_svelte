import { env } from '$env/dynamic/private';
import { GetPrimaryChecklistTaxa } from "../../data_classes/taxon";
import { APIManager } from "../../util/api";


export async function load() {
    const api_manager = new APIManager(env.API_ENDPOINT);
    const primary_checklist_taxa_endpoint = new GetPrimaryChecklistTaxa()

    return {
        taxon_data: (await primary_checklist_taxa_endpoint.action(api_manager, {})).data,
    }
}