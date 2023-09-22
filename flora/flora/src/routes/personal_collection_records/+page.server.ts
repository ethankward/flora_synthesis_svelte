import { env } from '$env/dynamic/private';
import { GetPersonalCollectionRecords } from '../../data_classes/personal_collection_record';
import { APIManager } from "../../util/api";

export async function load() {
    const api_manager = new APIManager(env.API_ENDPOINT);
    const get_personal_collections_endpoint = new GetPersonalCollectionRecords();

    return {
        personal_collection_record_data: (await get_personal_collections_endpoint.action(api_manager, {})).data,
    }
}