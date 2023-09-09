import type { ChecklistRecordType } from "../data_classes/types";


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

export {ChecklistRecordList}