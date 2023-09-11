import type { TaxonSynonymType } from "../data_classes/types";
import type { APIManager, APIEndpoint } from "../util/api";


class TaxonSynonymList {
    taxon_synonyms: {[key: number]: TaxonSynonymType;};

    constructor(api_data: TaxonSynonymType[]) {
        this.taxon_synonyms = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getTaxonSynonym(id: number) {
        return this.taxon_synonyms[id];
    }

}

class CreateNewTaxonSynonym implements APIEndpoint {
    external_endpoint = "create_new_taxon_synonym";

    action(api_manager: APIManager, data: {taxon_id: number, synonym: string}) {
        return api_manager.put({taxon_id: data.taxon_id, synonym: data.synonym}, [this.external_endpoint]);
    }
}

class UpdateTaxonSynonym implements APIEndpoint {
    external_endpoint = "update_taxon_synonym";

    action(api_manager: APIManager, data: {synonym_id: number, synonym: string}) {
        return api_manager.post({object_id: data.synonym_id, synonym: data.synonym}, [this.external_endpoint]);
    }
}


class DeleteTaxonSynonym implements APIEndpoint {
    external_endpoint = "delete_taxon_synonym";

    action(api_manager: APIManager, data: {synonym_id: number}) {
        return api_manager.post({object_id: data.synonym_id}, [this.external_endpoint])
    }
}


let taxon_synonym_exported_endpoints = {
    "create_new_taxon_synonym": new CreateNewTaxonSynonym(),
    "update_taxon_synonym": new UpdateTaxonSynonym(),
    "delete_taxon_synonym": new DeleteTaxonSynonym()
};

export {TaxonSynonymList, taxon_synonym_exported_endpoints}
