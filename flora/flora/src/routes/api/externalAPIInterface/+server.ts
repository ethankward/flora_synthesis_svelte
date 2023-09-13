import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { AxiosPromise } from "axios";
import { checklist_exported_endpoints } from "../../../data_classes/checklist";
import { checklist_records_exported_endpoints } from "../../../data_classes/checklist_record";
import { checklist_record_note_exported_endpoints } from "../../../data_classes/checklist_record_note";
import { exported_taxon_endpoints } from "../../../data_classes/taxon";
import { taxon_synonym_exported_endpoints } from "../../../data_classes/taxon_synonym";
import { APIManager } from "../../../util/api";


function execute(api_manager: APIManager, data: object, endpoint_identifier: string): AxiosPromise | undefined {
    const all_endpoints = [
        ...taxon_synonym_exported_endpoints,
        ...checklist_record_note_exported_endpoints,
        ...checklist_exported_endpoints,
        ...checklist_records_exported_endpoints,
        ...exported_taxon_endpoints
    ];

    let result;

    all_endpoints.forEach((endpoint) => {
        if (endpoint.unique_identifier === endpoint_identifier) {
            result = endpoint.action(api_manager, data);
        }
    });

    return result;

}


/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
    const external_api_manager = new APIManager(env.API_ENDPOINT);

    const data = await request.json();
    const endpoint_identifier = url.searchParams.get("endpoint_identifier");
    if (!endpoint_identifier) {
        throw new Error("Something went wrong");
    }

    const result = execute(external_api_manager, data, endpoint_identifier);
    if (!result) {
        throw new Error("Something went wrong");
    }

    return json((await result).data);

}
