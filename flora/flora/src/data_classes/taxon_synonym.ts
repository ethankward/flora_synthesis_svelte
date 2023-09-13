import type { TaxonSynonymType } from "../data_classes/types";
import type { APIEndpoint, APIManager } from "../util/api";
import axios from "axios";
import type { AxiosPromise } from "axios";


class TaxonSynonymList {
    taxon_synonyms: { [key: number]: TaxonSynonymType; };

    constructor(api_data: TaxonSynonymType[]) {
        this.taxon_synonyms = Object.fromEntries(api_data.map((ch) => [ch.id, ch]));
    }

    getTaxonSynonym(id: number) {
        return this.taxon_synonyms[id];
    }

}

type create_new_taxon_synonym_data_type = { taxon_id: number, synonym: string };

class CreateNewTaxonSynonym implements APIEndpoint {
    external_endpoint = "create_new_taxon_synonym";
    unique_identifier = "create_new_taxon_synonym";

    action(api_manager: APIManager, data: create_new_taxon_synonym_data_type) {
        return api_manager.put({ taxon_id: data.taxon_id, synonym: data.synonym }, [this.external_endpoint]);
    }

    async callExternalEndpoint(data: create_new_taxon_synonym_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }

}

type update_taxon_synonym_data_type = { synonym_id: number, synonym: string };

class UpdateTaxonSynonym implements APIEndpoint {
    external_endpoint = "update_taxon_synonym";
    unique_identifier = "update_taxon_synonym";

    action(api_manager: APIManager, data: update_taxon_synonym_data_type) {
        return api_manager.post({ object_id: data.synonym_id, synonym: data.synonym }, [this.external_endpoint]);
    }

    async callExternalEndpoint(data: update_taxon_synonym_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }
}


type delete_taxon_synonym_data_type = { synonym_id: number };

class DeleteTaxonSynonym implements APIEndpoint {
    external_endpoint = "delete_taxon_synonym";
    unique_identifier = "delete_taxon_synonym";

    action(api_manager: APIManager, data: delete_taxon_synonym_data_type) {
        return api_manager.post({ object_id: data.synonym_id }, [this.external_endpoint])
    }

    async callExternalEndpoint(data: delete_taxon_synonym_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }

}


const taxon_synonym_exported_endpoints = [
    new CreateNewTaxonSynonym(),
    new UpdateTaxonSynonym(),
    new DeleteTaxonSynonym()
]

export {
    TaxonSynonymList, taxon_synonym_exported_endpoints,
    CreateNewTaxonSynonym, UpdateTaxonSynonym, DeleteTaxonSynonym
};

