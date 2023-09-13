import { env } from '$env/dynamic/private';
import { GetChecklistRecord } from '../../../../data_classes/checklist_record';
import { APIManager } from "../../../../util/api";

export async function load({ params }) {
    const api_manager = new APIManager(env.API_ENDPOINT);

    const checklist_record_id = parseInt(params.checklist_record_id);
    const checklist_type = params.checklist_type;
    const checklist_record_endpoint = new GetChecklistRecord();

    return {
        checklist_record_id: checklist_record_id,
        checklist_type: checklist_type,
        checklist_record_data: (await checklist_record_endpoint.action(api_manager, { checklist_type: checklist_type, checklist_record_id: checklist_record_id })).data,
    }
}