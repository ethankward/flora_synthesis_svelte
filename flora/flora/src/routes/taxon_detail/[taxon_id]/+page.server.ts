import { APIManager } from "../../../util/api";
import { env } from '$env/dynamic/private';

let api_manager = new APIManager(env.API_ENDPOINT);


export async function load({ params }) {
    let taxon_id = parseInt(params.taxon_id);

    return {
        taxon_id: taxon_id,
        taxon_data: (await api_manager.getTaxon(taxon_id)).data,
        life_cycle_data: (await api_manager.getLifeCycleChoices()).data,
        endemic_data: (await api_manager.getEndemicChoices()).data,
        introduced_data: (await api_manager.getIntroducedChoices()).data,
        checklist_records: (await api_manager.getChecklistRecords(taxon_id)).data
    }
}
