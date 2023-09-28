import { env } from '$env/dynamic/private';
import { GetCollectors } from '../../data_classes/collector';
import { APIManager } from "../../util/api";

const api_manager = new APIManager(env.API_ENDPOINT);

export async function load() {
    const get_collectors_endpoint = new GetCollectors();

    return {
        collectors_data: (await get_collectors_endpoint.action(api_manager, {})).data,
    }
}
