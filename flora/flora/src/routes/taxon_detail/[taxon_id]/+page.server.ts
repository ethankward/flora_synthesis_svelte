import { env } from '$env/dynamic/private';

import { APIManager } from "../../../util/api";

import { redirect } from '@sveltejs/kit';
import { GetTaxonChecklistRecords } from '../../../data_classes/checklist_record';
import { GetEndemicChoices, GetIntroducedChoices, GetLifeCycleChoices, GetTaxon, MakeSynonymOf } from '../../../data_classes/taxon';

const apiManager = new APIManager(env.API_ENDPOINT);


export async function load({ params }) {

    const taxonID = parseInt(params.taxon_id);

    const getTaxonEndpoint = new GetTaxon();
    const getLifecycleChoicesEndpoint = new GetLifeCycleChoices();
    const getIntroducedEndpoint = new GetIntroducedChoices();
    const getEndemicEndpoint = new GetEndemicChoices();
    const getTaxonChecklistRecordsEndpoint = new GetTaxonChecklistRecords();

    return {
        taxon_id: taxonID,
        taxon_data: (await getTaxonEndpoint.action(apiManager, { taxon_id: taxonID })).data,
        life_cycle_data: (await getLifecycleChoicesEndpoint.action(apiManager, {})).data,
        endemic_data: (await getEndemicEndpoint.action(apiManager, {})).data,
        introduced_data: (await getIntroducedEndpoint.action(apiManager, {})).data,
        checklist_records: (await getTaxonChecklistRecordsEndpoint.action(apiManager, { taxon_id: taxonID })).data
    }
}

export const actions = {
    synonymize: async ({ request }) => {
        const make_synonym_of_endpoint = new MakeSynonymOf();

        const data = await request.formData();

        const taxon_id_1 = data.get("taxon_id_1") as string;
        const taxon_id_2 = data.get("taxon_id_2") as string;

        await make_synonym_of_endpoint.action(apiManager, { taxon_id_1: parseInt(taxon_id_1), taxon_id_2: parseInt(taxon_id_2) });

        throw redirect(303, "/taxon_detail/" + taxon_id_2);

    },

}