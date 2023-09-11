import { APIManager } from "../../../../util/api";
import { env } from '$env/dynamic/private';
import {call} from "../../../../util/local_api_dispatch";
import { checklist_records_exported_endpoints } from "../../../../data_classes/checklist_record";

export async function load({ params }) {
    let api_manager = new APIManager(env.API_ENDPOINT);

    let checklist_record_id = parseInt(params.checklist_record_id);
    let checklist_type = params.checklist_type;

    return {
        checklist_record_id: checklist_record_id,
        checklist_record_data: (await call(api_manager, {checklist_type: checklist_type, checklist_record_id: checklist_record_id}, checklist_records_exported_endpoints.get_checklist_record)),
        checklist_type: checklist_type
    }
}