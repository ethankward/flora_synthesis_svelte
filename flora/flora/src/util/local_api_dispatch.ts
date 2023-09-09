import type { AxiosPromise } from "axios";
import type { APIManager } from "./api";
import axios from "axios";

enum APIEndpoints {
    get_taxon_data = "get_taxon_data",
    taxon_name_autocomplete = "taxon_name_autocomplete",
    make_taxon_synonym_of = "make_taxon_synonym_of",
    update_taxon = "update_taxon",
    create_new_synonym = "create_new_synonym",
    delete_synonym = "delete_synonym",
    update_synonym = "update_synonym",
    update_checklist_record_mapping = "update_checklist_record_mapping",
    get_checklist_taxa = "get_checklist_taxa"
}


interface APIDispatcher {
    endpoint_identifier: APIEndpoints;

    action(data: object, api_manager: APIManager): AxiosPromise;
}


class TaxonAutocompleteEndpoint implements APIDispatcher {
    endpoint_identifier = APIEndpoints.taxon_name_autocomplete;

    action(data: {search_term: string}, api_manager: APIManager) {
        return api_manager.getTaxaAutocompletion(data.search_term);
    }

}

class MakeSynonymOfEndpint implements APIDispatcher {
    endpoint_identifier = APIEndpoints.make_taxon_synonym_of;

    action(data: {taxon_id_1: number, taxon_id_2: number}, api_manager: APIManager) {
        return api_manager.makeSynonymOf(data.taxon_id_1, data.taxon_id_2);
    }
}

class UpdateTaxonEndpoint implements APIDispatcher {
    endpoint_identifier = APIEndpoints.update_taxon;

    action(data: {taxon_id: number}, api_manager: APIManager) {
        return api_manager.updateTaxon(data.taxon_id, data);
    }
}


class CreateNewSynonymEndpoint implements APIDispatcher {
    endpoint_identifier = APIEndpoints.create_new_synonym;

    action(data: object, api_manager: APIManager) {
        return api_manager.createNewSynonym(data);
    }
}


class DeleteSynonymEndpoint implements APIDispatcher {
    endpoint_identifier = APIEndpoints.delete_synonym;

    action(data: {synonym_id: number}, api_manager: APIManager) {
        return api_manager.deleteSynonym(data.synonym_id);
    }
}

class UpdateSynonymEndpoint implements APIDispatcher {
    endpoint_identifier = APIEndpoints.update_synonym;

    action(data: {synonym_id: number}, api_manager: APIManager) {
        return api_manager.updateSynonym(data.synonym_id, data);
    }
}

class UpdatechecklistRecordMappingEndpoint implements APIDispatcher {
    endpoint_identifier= APIEndpoints.update_checklist_record_mapping;

    action(data: {checklist_type: string, checklist_record_id: number, mapped_to_id: number}, api_manager: APIManager) {
        return api_manager.updateChecklistRecordMappedTo(data.checklist_type, data.checklist_record_id, data.mapped_to_id);
    }
}

class GetChecklistTaxa implements APIDispatcher {
    endpoint_identifier = APIEndpoints.get_checklist_taxa;

    action(data: {chedklist_id: number}, api_manager: APIManager) {
        return api_manager.getChecklistTaxa(data.checklist_id);
    }
}

function execute(api_manager: APIManager, data: object, endpoint_identifier: APIEndpoints): AxiosPromise | undefined {
    let all_endpoints = [
      new TaxonAutocompleteEndpoint(),
      new MakeSynonymOfEndpint(),
      new UpdateTaxonEndpoint(),
      new CreateNewSynonymEndpoint(),
      new DeleteSynonymEndpoint(),
      new UpdateSynonymEndpoint(),
      new UpdatechecklistRecordMappingEndpoint(),
      new GetChecklistTaxa()
    ];

    let result;

    all_endpoints.forEach((endpoint) => {
        if (endpoint.endpoint_identifier == endpoint_identifier) {
            result = endpoint.action(data, api_manager);
        }
    });

    return result;

}

async function callExternalEndpoint(data: object, endpoint_identifier: APIEndpoints) {
    let url = "/api/externalAPIInterface/?endpoint_identifier=" + endpoint_identifier;
    return (await axios.post(url, data)).data;
}


export {APIEndpoints, execute, callExternalEndpoint}