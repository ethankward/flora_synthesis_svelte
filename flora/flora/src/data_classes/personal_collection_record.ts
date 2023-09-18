import type { APIEndpoint, APIManager } from "../util/api";
import axios from "axios";
import type { AxiosPromise } from "axios";
import type { PersonalCollectionRecordType } from "../data_classes/types";

class GetPersonalCollectionRecords implements APIEndpoint {
    external_endpoint = "personal_collection_records";
    unique_identifier = "get_personal_collection_records";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}

class GetPersonalCollectionRecord implements APIEndpoint {
    external_endpoint = "personal_collection_records";
    unique_identifier = "get_personal_collection_record";

    action(api_manager: APIManager, data: { record_id: string }) {
        return api_manager.get([this.external_endpoint, data.record_id.toString()]);
    }
}


class CreatePersonalCollectionRecord implements APIEndpoint {
    external_endpoint = "personal_collection_records";
    unique_identifier = "create_personal_collection_records";

    action(api_manager: APIManager, data: PersonalCollectionRecordType) {
        return api_manager.post(data, [this.external_endpoint]);
    }


    async callExternalEndpoint(data: PersonalCollectionRecordType): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }


}

class EditPersonalCollectionRecord implements APIEndpoint {
    external_endpoint = "personal_collection_records";
    unique_identifier = "edit_personal_collection_record";

    action(api_manager: APIManager, data: PersonalCollectionRecordType) {
        if (data.id === undefined) {
            return Promise.reject();
        }
        return api_manager.put(data, [this.external_endpoint, data.id.toString()]);
    }

    async callExternalEndpoint(data: PersonalCollectionRecordType): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }


}
const exported_pcr_endpoints = [
    new CreatePersonalCollectionRecord(),
    new EditPersonalCollectionRecord()
];

export { GetPersonalCollectionRecords, CreatePersonalCollectionRecord, GetPersonalCollectionRecord, exported_pcr_endpoints, EditPersonalCollectionRecord }