import type { AxiosPromise } from "axios";
import type { APIManager, APIEndpoint } from "./api";
import axios from "axios";
import {taxon_synonym_exported_endpoints} from "../data_classes/taxon_synonym";
import {checklist_record_note_exported_endpoints} from "../data_classes/checklist_record_note";
import {checklist_exported_endpoints} from "../data_classes/checklist";
import {checklist_records_exported_endpoints} from "../data_classes/checklist_record";
import {life_cycle_exported_endpoints} from "../data_classes/life_cycle";
import {endemic_exported_endpoints} from "../data_classes/endemic";
import {introduced_exported_endpoints} from "../data_classes/introduced";
import {exported_taxon_endpoints} from "../data_classes/taxon";


function execute(api_manager: APIManager, data: object, endpoint_identifier: string): AxiosPromise | undefined { 
    let all_endpoints: {[key: string]: APIEndpoint} = {
        ...taxon_synonym_exported_endpoints, 
        ...checklist_record_note_exported_endpoints,
        ...checklist_exported_endpoints,
        ...checklist_records_exported_endpoints,
        ...life_cycle_exported_endpoints,
        ...endemic_exported_endpoints,
        ...introduced_exported_endpoints,
        ...exported_taxon_endpoints
    };

    let result;

    Object.keys(all_endpoints).forEach((unique_identifier) => {
        if (unique_identifier == endpoint_identifier) {
            result = all_endpoints[unique_identifier].action(api_manager, data);
        }
    });

    return result;

}

async function call(api_manager: APIManager, data: object, endpoint: APIEndpoint) {
    return (await endpoint.action(api_manager, data)).data;
}

async function callExternalEndpoint(data: object, endpoint_identifier: string) {
    let url = "/api/externalAPIInterface/?endpoint_identifier=" + endpoint_identifier;
    return (await axios.post(url, data)).data;
}


export {execute, call, callExternalEndpoint}
