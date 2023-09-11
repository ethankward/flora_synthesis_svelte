import { APIManager } from "../../util/api";
import { env } from '$env/dynamic/private';
import {call} from "../../util/local_api_dispatch";
import { checklist_exported_endpoints } from "../../data_classes/checklist";

export async function load({ }) {
    let api_manager = new APIManager(env.API_ENDPOINT);

    return {
        checklist_data: (await call(api_manager, {}, checklist_exported_endpoints.get_checklists)),
    }
}