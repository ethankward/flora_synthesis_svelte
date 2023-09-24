import { env } from '$env/dynamic/private';
import { GetCollector } from '../../../data_classes/collector';
import { APIManager } from "../../../util/api";

export async function load({ params }) {
    const api_manager = new APIManager(env.API_ENDPOINT);
    const collector_id = parseInt(params.collector_id);
    const get_collector_endpoint = new GetCollector();

    return {
        collector_data: (await get_collector_endpoint.action(api_manager, { collector_id: collector_id })).data,
    }
}