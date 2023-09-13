import type { ChecklistRecordType } from "../data_classes/types";
import type { APIEndpoint, APIManager } from "../util/api";

import type { AxiosPromise } from "axios";
import axios from "axios";


class ChecklistRecordList {
    checklist_records: ChecklistRecordType[];

    constructor(api_data: ChecklistRecordType[]) {
        this.checklist_records = api_data;
    }

    groupByChecklist() {
        const result: { [key: string]: ChecklistRecordType[]; } = {};

        this.checklist_records.forEach((checklist_record) => {
            const checklist_name = checklist_record.checklist.checklist_name;
            if (!(checklist_name in result)) {
                result[checklist_name] = [];
            }
            result[checklist_name].push(checklist_record);
        });

        return result;
    }
}

class GetTaxonChecklistRecords implements APIEndpoint {
    external_endpoint = "checklist_records";
    unique_identifier = "get_taxon_checklist_records";

    action(api_manager: APIManager, data: { taxon_id: number }) {
        return api_manager.get([this.external_endpoint], { "taxon_id": data.taxon_id.toString() });
    }
}

class GetChecklistRecord implements APIEndpoint {
    external_endpoint = "checklist_records";
    unique_identifier = "get_checklist_record";

    action(api_manager: APIManager, data: { checklist_type: string, checklist_record_id: number }) {
        return api_manager.get([this.external_endpoint, data.checklist_type, data.checklist_record_id.toString()]);
    }
}


type update_checklist_record_data_type =  { checklist_type: string, checklist_record_id: number, mapped_to_id: number };

class UpdateChecklistRecord implements APIEndpoint {
    external_endpoint = "update_checklist_record_mapping";
    unique_identifier = "update_checklist_record_mapping";

    action(api_manager: APIManager, data: update_checklist_record_data_type) {
        return api_manager.post({
            "checklist_type": data.checklist_type,
            "checklist_record_id": data.checklist_record_id,
            "mapped_to_id": data.mapped_to_id
        },
            [this.external_endpoint]);
    }

    async callExternalEndpoint(data: update_checklist_record_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }

}

const checklist_records_exported_endpoints = [
    new GetTaxonChecklistRecords(),
    new GetChecklistRecord(),
    new UpdateChecklistRecord()
]

export {
    ChecklistRecordList, checklist_records_exported_endpoints,
    GetTaxonChecklistRecords, GetChecklistRecord, UpdateChecklistRecord
};
