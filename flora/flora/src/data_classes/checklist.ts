import type { ChecklistType } from "../data_classes/types";
import type { ValueDisplayType } from "../types";
import type { APIEndpoint, APIManager } from "../util/api";
import axios from "axios";
import type { AxiosPromise } from "axios";


class ChecklistList {
    checklists: { [key: number]: ChecklistType; };

    constructor(api_data: ChecklistType[]) {
        this.checklists = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getChecklist(id: number) {
        return this.checklists[id];
    }

    select(): ValueDisplayType[] {
        return Object.values(this.checklists).map(
            (checklist) => ({ value: checklist.id.toString(), display: checklist.checklist_name }));
    }

    filterByType(checklist_type: string) {
        return new ChecklistList(
            Object.values(this.checklists).filter(
                (checklist) => checklist.checklist_type === checklist_type
            )
        );
    }
}

class GetChecklists implements APIEndpoint {
    external_endpoint = "checklists";
    unique_identifier = "get_checklists";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}

class GetChecklist implements APIEndpoint {
    external_endpoint = "checklists";
    unique_identifier = "get_checklist";

    action(api_manager: APIManager, data: { checklist_id: number }) {
        return api_manager.get([this.external_endpoint, data.checklist_id.toString()]);
    }
}


type update_checklist_data_type = { checklist_id: number };

class UpdateChecklist implements APIEndpoint {
    external_endpoint = "update_checklist";
    unique_identifier = "update_checklist";

    action(api_manager: APIManager, data: update_checklist_data_type) {
        return api_manager.post({ checklist_id: data.checklist_id }, [this.external_endpoint]);
    }

    async callExternalEndpoint(data: update_checklist_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }
}

type retrieve_checklist_data_type = { checklist_id: number, n_records: number };

class RetrieveChecklist implements APIEndpoint {
    external_endpoint = "retrieve_checklist";
    unique_identifier = "retrieve_checklist";

    action(api_manager: APIManager, data: retrieve_checklist_data_type) {
        return api_manager.post({ checklist_id: data.checklist_id, n_records: data.n_records }, [this.external_endpoint]);
    }

    async callExternalEndpoint(data: retrieve_checklist_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }
}



class GetStaleRecordCounts implements APIEndpoint {
    external_endpoint = "checklist_stale_record_counts"
    unique_identifier = "checklist_stale_record_counts";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}


const checklist_exported_endpoints = [
    new GetChecklists(),
    new UpdateChecklist(),
    new RetrieveChecklist(),
    new GetStaleRecordCounts()
]

export {
    ChecklistList, checklist_exported_endpoints,
    GetChecklists, GetStaleRecordCounts, UpdateChecklist, RetrieveChecklist, GetChecklist
};

