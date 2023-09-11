import type { APIManager, APIEndpoint } from "../util/api";


class getIntroducedChoices implements APIEndpoint {
    external_endpoint = "introduced";

    action(api_manager: APIManager, data: {}) {
        return api_manager.get([this.external_endpoint]);
    }
}


let introduced_exported_endpoints = {
    "get_introduced_choices": new getIntroducedChoices()
}

export {introduced_exported_endpoints}
