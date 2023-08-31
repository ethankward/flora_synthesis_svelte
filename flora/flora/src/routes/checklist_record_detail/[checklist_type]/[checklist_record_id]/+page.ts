import { APIManager } from "../../../../util/api";

export async function load({ params }) {
    let checklist_record_id = parseInt(params.checklist_record_id);
    let checklist_type = params.checklist_type;
    let api_manager = new APIManager("http://127.0.0.1:8000/api/");

    return {
        checklist_record_id: checklist_record_id,
        checklist_record_data: await api_manager.getChecklistRecord(checklist_type, checklist_record_id),
    }
}