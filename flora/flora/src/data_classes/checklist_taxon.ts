import type { ChecklistTaxonType } from "../data_classes/types";


class ChecklistTaxonList {
    checklist_taxa: {[key: number]: ChecklistTaxonType;};

    constructor(api_data: ChecklistTaxonType[]) {
        this.checklist_taxa = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getChecklistTaxon(id: number) {
        return this.checklist_taxa[id];
    }
}


export {ChecklistTaxonList}
