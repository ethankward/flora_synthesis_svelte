import type { ChecklistRecordType } from "../data_classes/types";
import type { APIManager, APIEndpoint } from "../util/api";



class ChecklistRecordList {
    checklist_records: ChecklistRecordType[];

    constructor(api_data: ChecklistRecordType[]) {
        this.checklist_records = api_data;
    }

    groupByChecklist() {
        let result: {[key: string]: ChecklistRecordType[];} = {};

        this.checklist_records.forEach((checklist_record) => {
            let checklist_name = checklist_record.checklist.checklist_name;
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

    action(api_manager: APIManager, data: {taxon_id: number}) {
        return api_manager.get([this.external_endpoint], {"taxon_id": data.taxon_id.toString()});
    }
}

class GetChecklistRecord implements APIEndpoint {
    external_endpoint = "checklist_records";

    action(api_manager: APIManager, data: {checklist_type: string, checklist_record_id: number}) {
        return api_manager.get([this.external_endpoint, data.checklist_type, data.checklist_record_id.toString()]);
    }
}


class UpdateChecklistRecord implements APIEndpoint {
    external_endpoint = "update_checklist_record_mapping";

    action(api_manager: APIManager, data: {checklist_type: string, checklist_record_id: number, mapped_to_id: number}) {
        return api_manager.post({
            "checklist_type": data.checklist_type,
            "checklist_record_id": data.checklist_record_id,
            "mapped_to_id": data.mapped_to_id},
            [this.external_endpoint]);
    }

}

let checklist_records_exported_endpoints = {
    "get_taxon_checklist_records": new GetTaxonChecklistRecords(),
    "get_checklist_record": new GetChecklistRecord(),
    "update_checklist_record_mapping": new UpdateChecklistRecord()
}

export {ChecklistRecordList, checklist_records_exported_endpoints}