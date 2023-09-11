import { APIManager } from "../util/api";
import {call} from "../util/local_api_dispatch";
import {exported_taxon_endpoints} from "../data_classes/taxon";
import { life_cycle_exported_endpoints } from "../data_classes/life_cycle";
import { endemic_exported_endpoints } from "../data_classes/endemic";
import { introduced_exported_endpoints } from "../data_classes/introduced";
import { checklist_records_exported_endpoints } from "../data_classes/checklist_record";
import { env } from '$env/dynamic/private';

let api_manager = new APIManager(env.API_ENDPOINT);


export async function load({ params }) {

    return {
        families: (await call(api_manager, {}, exported_taxon_endpoints.get_all_families)),
    }
}
