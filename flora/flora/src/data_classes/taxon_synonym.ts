import type { TaxonSynonymType } from "../data_classes/types";
import { createNewEndpoint } from "../util/api_util";



class TaxonSynonymList {
    taxon_synonyms: { [key: number]: TaxonSynonymType; };

    constructor(api_data: TaxonSynonymType[]) {
        this.taxon_synonyms = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getTaxonSynonym(id: number) {
        return this.taxon_synonyms[id];
    }

}

const CreateNewTaxonSynonym = createNewEndpoint<{ taxon_id: string, synonym: string }>(
    "PUT", "create_new_taxon_synonym", "create_new_taxon_synonym"
)
const UpdateTaxonSynonym = createNewEndpoint<{ object_id: string, synonym: string }>(
    "POST", "update_taxon_synonym", "update_taxon_synonym"
);
const DeleteTaxonSynonym = createNewEndpoint<{ object_id: string }>(
    "POST", "delete_taxon_synonym", "delete_taxon_synonym"
);


const taxon_synonym_exported_endpoints = [
    new CreateNewTaxonSynonym(),
    new UpdateTaxonSynonym(),
    new DeleteTaxonSynonym()
]

export {
    CreateNewTaxonSynonym, DeleteTaxonSynonym, TaxonSynonymList, UpdateTaxonSynonym, taxon_synonym_exported_endpoints
};

