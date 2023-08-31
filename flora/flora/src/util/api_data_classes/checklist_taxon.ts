import type { TaxonAPIType, TaxonSynonymAPIType, TaxonNameAPIType, ChecklistTaxonAPIType } from "../../util/api_data_classes/api_data_types";



class ChecklistTaxonList {
    checklist_taxa: {[key: number]: ChecklistTaxonAPIType;};

    constructor(api_data: ChecklistTaxonAPIType[]) {
        this.checklist_taxa = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getChecklistTaxon(id: number) {
        return this.checklist_taxa[id];
    }
}


export {ChecklistTaxonList}
