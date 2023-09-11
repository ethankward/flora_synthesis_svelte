import type { APIManager, APIEndpoint } from "../util/api";


class getEndemicChoices implements APIEndpoint {
    external_endpoint = "endemic";

    action(api_manager: APIManager, data: {}) {
        return api_manager.get([this.external_endpoint]);
    }
}


let endemic_exported_endpoints = {
    "get_endemic_choices": new getEndemicChoices()
}

export {endemic_exported_endpoints}
