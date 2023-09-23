import type { TaxonSynonymType } from "../data_classes/types";
import { createNewEndpoint } from "../util/api_util";

import type { Optional } from "../util/api_util";


class TaxonSynonymList {
    taxon_synonyms: { [key: number]: TaxonSynonymType; };

    constructor(api_data: TaxonSynonymType[]) {
        this.taxon_synonyms = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getTaxonSynonym(id: number) {
        return this.taxon_synonyms[id];
    }

}

const CreateNewTaxonSynonym = createNewEndpoint<Optional<TaxonSynonymType, 'id'>>(
    "POST", "taxon_synonyms", "create_new_taxon_synonym"
)
const UpdateTaxonSynonym = createNewEndpoint<TaxonSynonymType>(
    "PUT", "taxon_synonyms", "update_taxon_synonym", (taxon_synonym) => [taxon_synonym.id.toString()]
);
const DeleteTaxonSynonym = createNewEndpoint<{id: number}>(
    "DELETE", "taxon_synonyms", "delete_taxon_synonym", (taxon_synonym) => [taxon_synonym.id.toString()]
);


const taxon_synonym_exported_endpoints = [
    new CreateNewTaxonSynonym(),
    new UpdateTaxonSynonym(),
    new DeleteTaxonSynonym()
]

export {
    CreateNewTaxonSynonym, DeleteTaxonSynonym, TaxonSynonymList, UpdateTaxonSynonym, taxon_synonym_exported_endpoints
};

