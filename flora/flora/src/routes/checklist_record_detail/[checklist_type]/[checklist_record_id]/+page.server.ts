import { APIManager } from "../../../../util/api";
import { API_ENDPOINT } from '$env/static/private';

export async function load({ params }) {
    let api_manager = new APIManager(API_ENDPOINT);

    let checklist_record_id = parseInt(params.checklist_record_id);
    let checklist_type = params.checklist_type;

    return {
        checklist_record_id: checklist_record_id,
        checklist_record_data: (await api_manager.getChecklistRecord(checklist_type, checklist_record_id)).data,
        checklist_type: checklist_type
    }
}