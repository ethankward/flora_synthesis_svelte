import type { TaxonSynonymAPIType } from "../../util/api_data_classes/api_data_types";


class TaxonSynonymList {
    taxon_synonyms: {[key: number]: TaxonSynonymAPIType;};

    constructor(api_data: TaxonSynonymAPIType[]) {
        this.taxon_synonyms = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getTaxonSynonym(id: number) {
        return this.taxon_synonyms[id];
    }

}


export {TaxonSynonymList}
