import { formToJSON } from "axios";

class ChecklistRecord {
    id: number;
    checklist: any;
    checklist_taxon: any;
    external_url: string;
    date: string;
    observation_type: any;

    constructor(api_data: any) {
        this.id = api_data.pk;
        this.checklist = api_data.checklist;
        this.checklist_taxon = api_data.checklist_taxon;
        this.external_url = api_data.external_url;
        this.date = api_data.date;
        this.observation_type = api_data.observation_type;

    }
}

class ChecklistRecordList {
    checklist_records: ChecklistRecord[];
    constructor(api_data: any) {
        this.checklist_records = api_data.map((x) => new ChecklistRecord(x));
    }

    getGrouped() {
        let result: { [key: string]: ChecklistRecord[];} = {};

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

export {ChecklistRecord, ChecklistRecordList}