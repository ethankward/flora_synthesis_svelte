import type { ChecklistType } from "../data_classes/types";
import type { ValueDisplayType } from "../types";
import { createNewEndpoint } from "../util/api_util";


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

const GetChecklists = createNewEndpoint("GET", "checklists", "get_checklists");
const GetChecklist = createNewEndpoint("GET", "checklists", "get_checklist");
const UpdateChecklist = createNewEndpoint<{ checklist_id: number }>("POST", "update_checklist", "update_checklist");
const RetrieveChecklist = createNewEndpoint<{ checklist_id: number, n_records: number }>("POST", "retrieve_checklist", "retrieve_checklist");
const GetStaleRecordCounts = createNewEndpoint("GET", "checklist_stale_record_counts", "checklist_stale_record_counts");
const ImportInatObservation = createNewEndpoint<{ checklist_id: number, observation_id: number }>("POST", "import_inat_observation", "import_inat_observation");


const checklist_exported_endpoints = [
    new GetChecklists(),
    new UpdateChecklist(),
    new RetrieveChecklist(),
    new GetStaleRecordCounts(),
    new ImportInatObservation()
]

export {
    ChecklistList, GetChecklist, GetChecklists, GetStaleRecordCounts, RetrieveChecklist, ImportInatObservation,
    UpdateChecklist, checklist_exported_endpoints
};

