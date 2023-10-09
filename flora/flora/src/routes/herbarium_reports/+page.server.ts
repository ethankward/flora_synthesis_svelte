import { env } from '$env/dynamic/private';
import { GetHerbariumReports } from '../../data_classes/herbarium_report';
import { APIManager } from "../../util/api";

const api_manager = new APIManager(env.API_ENDPOINT);

export async function load() {
    const get_reports_endpoint = new GetHerbariumReports();

    return {
        reports_data: (await get_reports_endpoint.action(api_manager, {})).data,
    }
}
