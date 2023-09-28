import { env } from '$env/dynamic/private';
import { GetChecklists, GetStaleRecordCounts } from '../../data_classes/checklist';
import { APIManager } from "../../util/api";

export async function load() {
    const api_manager = new APIManager(env.API_ENDPOINT);
    const get_checklists_endpoint = new GetChecklists();
    const stale_record_counts_endpoint = new GetStaleRecordCounts();

    return {
        checklist_data: (await get_checklists_endpoint.action(api_manager, {})).data,
        stale_record_counts: (await stale_record_counts_endpoint.action(api_manager, {})).data
    }
}

export const actions = {
    test: async () => {
        console.log("testing");
    }
}