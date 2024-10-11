import type { ChecklistRecordType } from "../data_classes/types";

import { createNewEndpoint } from "../util/api_util";


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


const GetTaxonChecklistRecords = createNewEndpoint("GET", "checklist_records", "get_checklist_records");
const GetChecklistRecord = createNewEndpoint<{ checklist_type: string, checklist_record_id: number }>(
    "GET", "checklist_records", "get_checklist_record",
    (data) => [data.checklist_type, data.checklist_record_id.toString()]
);
const UpdateChecklistRecord = createNewEndpoint<{ checklist_type: string, checklist_record_id: number, mapped_to_id: number }>(
    "POST", "update_checklist_record_mapping", "update_checklist_record_mapping",
)

const GetChecklistRecordsNoCollector = createNewEndpoint("GET", "checklist_records_no_collector", "checklist_records_no_collector");

const RetrieveChecklistRecord = createNewEndpoint<{ record_id: number}>("POST", "retrieve_checklist_record", "retrieve_checklist_record");

const checklist_records_exported_endpoints = [
    new GetTaxonChecklistRecords(),
    new GetChecklistRecord(),
    new UpdateChecklistRecord(),
    new GetChecklistRecordsNoCollector(),
    new RetrieveChecklistRecord(),
]

export {
    ChecklistRecordList, GetChecklistRecord, GetTaxonChecklistRecords, UpdateChecklistRecord, GetChecklistRecordsNoCollector,
    RetrieveChecklistRecord,
    checklist_records_exported_endpoints
};

