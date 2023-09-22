import { env } from '$env/dynamic/private';

import { APIManager } from "../../../util/api";

import { GetTaxonChecklistRecords } from '../../../data_classes/checklist_record';
import { GetEndemicChoices, GetIntroducedChoices, GetLifeCycleChoices, GetTaxon } from '../../../data_classes/taxon';


export async function load({ params }) {
    const apiManager = new APIManager(env.API_ENDPOINT);

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
