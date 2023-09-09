import type { ValueDisplayType } from "../types";
import type { ChecklistType } from "../data_classes/types";

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


export {ChecklistList}