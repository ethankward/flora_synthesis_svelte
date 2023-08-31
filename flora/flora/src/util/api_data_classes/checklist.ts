import type { ChecklistAPIType } from "../../util/api_data_classes/api_data_types";


class ChecklistList {
    checklists: {[key: number]: ChecklistAPIType;};

    constructor(api_data: ChecklistAPIType[]) {
        this.checklists = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getChecklist(id: number) {
        return this.checklists[id];
    }

}


export {ChecklistList}
