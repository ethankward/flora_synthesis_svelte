import { APIManager } from "../../../util/api";

export async function load({ params }) {
    let taxon_id = parseInt(params.taxon_id);
    let api_manager = new APIManager("http://127.0.0.1:8000/api/");

    return {
        taxon_id: taxon_id,
        taxon_data: await api_manager.getTaxon(taxon_id),
        life_cycle_data: await api_manager.getLifeCycleChoices(),
        endemic_data: await api_manager.getEndemicChoices(),
        checklist_record_data: await api_manager.getChecklistRecords(taxon_id)
    }
}