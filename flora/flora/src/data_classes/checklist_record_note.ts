import type { APIManager, APIEndpoint } from "../util/api";

class CreateNewChecklistRecordNote implements APIEndpoint {
    external_endpoint = "create_new_checklist_record_note";
    unique_identifier = "create_new_checklist_record_note";

    action(api_manager: APIManager, data: {checklist_record_id: number, checklist_record_type: string, note: string}) {
        return api_manager.put(
            {
                checklist_record_id: data.checklist_record_id, 
                checklist_record_type: data.checklist_record_type, 
                note: data.note
            }, 
            [this.external_endpoint]);
    }
}

class UpdateChecklistRecordNote implements APIEndpoint {
    external_endpoint = "update_checklist_record_note";

    action(api_manager: APIManager, data: {note_id: number, note: string}) {
        return api_manager.post({object_id: data.note_id, note: data.note}, [this.external_endpoint]);
    }
}


class DeleteChecklistRecordNote implements APIEndpoint {
    external_endpoint = "delete_checklist_record_note";
    unique_identifier = "delete_checklist_record_note";

    action(api_manager: APIManager, data: {note_id: number}) {
        return api_manager.post({object_id: data.note_id}, [this.external_endpoint])
    }
}


let checklist_record_note_exported_endpoints = {
    "create_new_checklist_record_note": new CreateNewChecklistRecordNote(),
    "update_checklist_record_note": new UpdateChecklistRecordNote(),
    "delete_checklist_record_note": new DeleteChecklistRecordNote()
};

export {checklist_record_note_exported_endpoints}
