import { env } from '$env/dynamic/private';
import { GetAllFamilies } from '../data_classes/taxon';
import { APIManager } from "../util/api";

export async function load() {

    const apiManager = new APIManager(env.API_ENDPOINT);
    const familiesEndpoint = new GetAllFamilies();

    return {
        families: (await familiesEndpoint.action(apiManager)).data,
    }
}
