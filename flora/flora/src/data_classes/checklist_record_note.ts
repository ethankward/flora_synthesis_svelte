import type { AxiosPromise } from "axios";
import axios from "axios";
import type { APIEndpoint, APIManager } from "../util/api";


type create_new_crn = { checklist_record_id: number, checklist_record_type: string, note: string };

class CreateNewChecklistRecordNote implements APIEndpoint {
    external_endpoint = "create_new_checklist_record_note";
    unique_identifier = "create_new_checklist_record_note";

    action(api_manager: APIManager, data: create_new_crn) {
        return api_manager.put(
            {
                checklist_record_id: data.checklist_record_id,
                checklist_record_type: data.checklist_record_type,
                note: data.note
            },
            [this.external_endpoint]);
    }
    async callExternalEndpoint(data: create_new_crn): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }
}

type update_crn = { note_id: number, note: string };

class UpdateChecklistRecordNote implements APIEndpoint {
    external_endpoint = "update_checklist_record_note";
    unique_identifier = "update_checklist_record_note"

    action(api_manager: APIManager, data: update_crn) {
        return api_manager.post({ object_id: data.note_id, note: data.note }, [this.external_endpoint]);
    }
    async callExternalEndpoint(data: update_crn): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }
}

type delete_crn = { note_id: number };

class DeleteChecklistRecordNote implements APIEndpoint {
    external_endpoint = "delete_checklist_record_note";
    unique_identifier = "delete_checklist_record_note";

    action(api_manager: APIManager, data: delete_crn) {
        return api_manager.post({ object_id: data.note_id }, [this.external_endpoint])
    }
    async callExternalEndpoint(data: delete_crn): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }
}


const checklist_record_note_exported_endpoints = [
    new CreateNewChecklistRecordNote(),
    new UpdateChecklistRecordNote(),
    new DeleteChecklistRecordNote()
]

export { CreateNewChecklistRecordNote, DeleteChecklistRecordNote, UpdateChecklistRecordNote, checklist_record_note_exported_endpoints };

