import type { ChecklistRecordAPIType } from "../../util/api_data_classes/api_data_types";


class ChecklistRecordList {
    checklist_records: ChecklistRecordAPIType[];

    constructor(api_data: ChecklistRecordAPIType[]) {
        this.checklist_records = api_data;
    }

    groupByChecklist() {
        let result: {[key: string]: ChecklistRecordAPIType[];} = {};

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