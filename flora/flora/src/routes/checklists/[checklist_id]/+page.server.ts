import { env } from '$env/dynamic/private';
import { GetChecklist, GetStaleRecords } from '../../../data_classes/checklist';
import { APIManager } from "../../../util/api";

export async function load({ params }) {
    const api_manager = new APIManager(env.API_ENDPOINT);
    const checklist_id = parseInt(params.checklist_id);
    const get_checklist_endpoint = new GetChecklist();
    const get_stale_records_endpoint = new GetStaleRecords();

    return {
        checklist_data: (await get_checklist_endpoint.action(api_manager, { checklist_id: checklist_id })).data,
        stale_records_data: (await get_stale_records_endpoint.action(api_manager, { checklist_id: checklist_id })).data
    }
}