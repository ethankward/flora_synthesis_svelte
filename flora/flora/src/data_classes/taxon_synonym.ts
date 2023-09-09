import type { TaxonSynonymType } from "../data_classes/types";


class TaxonSynonymList {
    taxon_synonyms: {[key: number]: TaxonSynonymType;};

    constructor(api_data: TaxonSynonymType[]) {
        this.taxon_synonyms = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getTaxonSynonym(id: number) {
        return this.taxon_synonyms[id];
    }

}


export {TaxonSynonymList}
