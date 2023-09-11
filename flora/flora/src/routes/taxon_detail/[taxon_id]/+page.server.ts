import { APIManager } from "../../../util/api";
import {call} from "../../../util/local_api_dispatch";
import {exported_taxon_endpoints} from "../../../data_classes/taxon";
import { life_cycle_exported_endpoints } from "../../../data_classes/life_cycle";
import { endemic_exported_endpoints } from "../../../data_classes/endemic";
import { introduced_exported_endpoints } from "../../../data_classes/introduced";
import { checklist_records_exported_endpoints } from "../../../data_classes/checklist_record";
import { env } from '$env/dynamic/private';

let api_manager = new APIManager(env.API_ENDPOINT);


export async function load({ params }) {
    let taxon_id = parseInt(params.taxon_id);

    return {
        taxon_id: taxon_id,
        taxon_data: (await call(api_manager, {taxon_id: taxon_id}, exported_taxon_endpoints.get_taxon)),
        life_cycle_data: (await call(api_manager, {}, life_cycle_exported_endpoints.get_life_cycles)),
        endemic_data: (await call(api_manager, {}, endemic_exported_endpoints.get_endemic_choices)),
        introduced_data: (await call(api_manager, {}, introduced_exported_endpoints.get_introduced_choices)),
        checklist_records: (await call(api_manager, {taxon_id: taxon_id}, checklist_records_exported_endpoints.get_taxon_checklist_records))
    }
}
