import { env } from '$env/dynamic/private';
import { GetCollectors } from '../../data_classes/collector';
import { APIManager } from "../../util/api";

export async function load() {
    const api_manager = new APIManager(env.API_ENDPOINT);
    const get_collectors_endpoint = new GetCollectors();

    return {
        collectors_data: (await get_collectors_endpoint.action(api_manager, {})).data,
    }
}