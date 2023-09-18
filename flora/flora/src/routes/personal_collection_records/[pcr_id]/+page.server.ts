import { env } from '$env/dynamic/private';
import { GetPersonalCollectionRecord } from '../../../data_classes/personal_collection_record';
import { GetTaxon } from '../../../data_classes/taxon';
import type {
    PersonalCollectionRecordType, TaxonNameType
} from "../../../data_classes/types";
import { APIManager } from "../../../util/api";

export async function load({ params }) {
    const api_manager = new APIManager(env.API_ENDPOINT);

    const get_pcr_endpoint = new GetPersonalCollectionRecord();
    const get_taxon_endpoint = new GetTaxon();

    const record_id = params.pcr_id;

    const record: PersonalCollectionRecordType = (await get_pcr_endpoint.action(api_manager, { record_id: record_id })).data;
    let specific_taxon: TaxonNameType | undefined;

    if (record.specific_taxon) {
        const taxon = (await get_taxon_endpoint.action(api_manager, { taxon_id: record.specific_taxon })).data;
        specific_taxon = {taxon_name: taxon.taxon_name, id: taxon.id};
    }

    return {
        record_id: record_id,
        personal_collection_record: record,
        specific_taxon: specific_taxon
    }
}