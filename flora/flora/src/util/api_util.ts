import type { AxiosPromise } from "axios";

import axios from "axios";
import type { APIManager } from "./api";


type allowedActions = "GET" | "POST" | "PATCH" | "PUT";

interface APIEndpoint<DataType> {
    external_endpoint: string;
    unique_identifier: string;
    getPath: (data: DataType) => string[];
    action: (api_manager: APIManager, data: DataType) => AxiosPromise;
    callExternal: (data?: DataType) => AxiosPromise;
}


function createNewEndpoint<DataType extends object>(
    action: allowedActions,
    external_endpoint: string,
    unique_identifier: string,
    create_path?: (data: DataType) => string[]
) {
    class Endpoint implements APIEndpoint<DataType> {
        external_endpoint = external_endpoint;
        unique_identifier = unique_identifier;

        getPath(data: DataType) {
            if (create_path === undefined) {
                return [this.external_endpoint];
            }

            return [this.external_endpoint].concat(create_path(data));
        }

        action(api_manager: APIManager, data: DataType) {
            const path = this.getPath(data);
            switch (action) {
                case "GET":
                    return api_manager.get(path, data);
                case "POST":
                    return api_manager.post(data, path);
                case "PATCH":
                    return api_manager.patch(data, path);
                case "PUT":
                    return api_manager.put(data, path);
                default:
                    throw new Error();
            }
        }

        async callExternal(data?: DataType) {
            const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
            return axios.post(url, data);
        }

    }
    return Endpoint;
}

export { createNewEndpoint };

