import type { APIManager, APIEndpoint } from "../util/api";


class getLifeCycleChoices implements APIEndpoint {
    external_endpoint = "life_cycles";

    action(api_manager: APIManager, data: {}) {
        return api_manager.get([this.external_endpoint]);
    }
}


let life_cycle_exported_endpoints = {
    "get_life_cycles": new getLifeCycleChoices()
}

export {life_cycle_exported_endpoints}
