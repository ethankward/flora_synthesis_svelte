import { env } from '$env/dynamic/private';
import { GetAllFamilies } from '../data_classes/taxon';
import { GetChecklists } from '../data_classes/checklist';

import { APIManager } from "../util/api";

export async function load() {

    const apiManager = new APIManager(env.API_ENDPOINT);
    const familiesEndpoint = new GetAllFamilies();
    const checklistsEndpoint = new GetChecklists();

    return {
        families: (await familiesEndpoint.action(apiManager)).data,
        checklists: (await checklistsEndpoint.action(apiManager)).data
    }
}
