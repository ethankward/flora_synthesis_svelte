
import axios from "axios";

import { env } from '$env/dynamic/private';


axios.defaults.headers.common.Authorization = `Token ${env.API_AUTH_TOKEN}`;



class APIManager {
    api_url: URL;

    constructor(api_url: string) {
        this.api_url = new URL(api_url);
    }

    getUrl(path: string[], params?: object) {
        const url = new URL(path.join('/'), this.api_url);
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                url.searchParams.set(key, value);
            }
            return url.toString();
        } else {
            let result = url.toString();
            if (!result.endsWith('/')) {
                result = result + '/';
            }
            return result;
        }


    }

    get(path: string[], params?: object) {
        return axios.get(this.getUrl(path, params));
    }

    patch(data: object, path: string[], params?: { [key: string]: string; }) {
        return axios.patch(this.getUrl(path, params), data);
    }

    post(data: object, path: string[]) {
        return axios.post(this.getUrl(path), data);
    }

    put(data: object, path: string[]) {
        return axios.put(this.getUrl(path), data);
    }

    delete(path: string[]) {
        return axios.delete(this.getUrl(path));
    }

}


export { APIManager };

