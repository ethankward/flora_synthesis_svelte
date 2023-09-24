import { env } from '$env/dynamic/private';
import { GetChecklistRecordsNoCollector } from '../../data_classes/checklist_record';
import { APIManager } from "../../util/api";

export async function load() {
    const api_manager = new APIManager(env.API_ENDPOINT);
    const get_no_collector_endpoint = new GetChecklistRecordsNoCollector();

    return {
        no_collectors_data: (await get_no_collector_endpoint.action(api_manager, {})).data,
    }
}