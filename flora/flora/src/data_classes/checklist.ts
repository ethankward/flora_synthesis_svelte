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


let checklist_exported_endpoints = {
    "get_checklists": new GetChecklists()   
}

export {ChecklistList, checklist_exported_endpoints}
