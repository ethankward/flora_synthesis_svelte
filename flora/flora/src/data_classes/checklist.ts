import type { ValueDisplayType } from "../types";
import type { ChecklistType } from "../data_classes/types";
import type { APIManager, APIEndpoint } from "../util/api";


class ChecklistList {
    checklists: {[key: number]: ChecklistType;};

    constructor(api_data: ChecklistType[]) {
        this.checklists = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getChecklist(id: number) {
        return this.checklists[id];
    }

    select(): ValueDisplayType[] {
        return Object.values(this.checklists).map(
            (checklist) => ({value: checklist.id.toString(), display: checklist.checklist_name}));
    }

}

class GetChecklists implements APIEndpoint {
    external_endpoint = "checklists";
    unique_identifier = "get_checklists";

    action(api_manager: APIManager, data: {}) {
        return api_manager.get([this.external_endpoint]);
    }
}

class UpdateChecklist implements APIEndpoint {
    external_endpoint = "update_checklist"

    action(api_manager: APIManager, data: {checklist_id: number, page: number}) {
        return api_manager.post({checklist_id: data.checklist_id, page: data.page}, [this.external_endpoint]);
    }
}

class RetrieveChecklist implements APIEndpoint {
    external_endpoint = "retrieve_checklist"

    action(api_manager: APIManager, data: {checklist_id: number, n_records: number}) {
        return api_manager.post({checklist_id: data.checklist_id, n_records: data.n_records}, [this.external_endpoint]);
    }
}



class GetStaleRecordCounts implements APIEndpoint {
    external_endpoint = "checklist_stale_record_counts"

    action(api_manager: APIManager, data: {}) {
        return api_manager.get([this.external_endpoint]);
    }
}


let checklist_exported_endpoints = {
    "get_checklists": new GetChecklists(),
    "update_checklist": new UpdateChecklist(),
    "retrieve_checklist": new RetrieveChecklist(),
    "get_stale_record_counts": new GetStaleRecordCounts()
}

export {ChecklistList, checklist_exported_endpoints}
