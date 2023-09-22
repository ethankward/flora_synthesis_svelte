import { env } from '$env/dynamic/private';
import { GetChecklists } from '../../data_classes/checklist';
import { APIManager } from "../../util/api";

export async function load({ url }) {
    const api_manager = new APIManager(env.API_ENDPOINT);
    const get_checklists_endpoint = new GetChecklists();

    return {
        checklist_data: (await get_checklists_endpoint.action(api_manager, {})).data,
        primary_checklist_id: url.searchParams.get("primary_checklist")
    }
}