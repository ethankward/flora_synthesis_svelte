import type { PersonalCollectionRecordType } from "../data_classes/types";
import { createNewEndpoint } from "../util/api_util";
import type { Optional } from "../util/api_util";


const GetPersonalCollectionRecords = createNewEndpoint("GET", "personal_collection_records", "get_personal_collection_records");

const GetPersonalCollectionRecord = createNewEndpoint<{ record_id: string }>(
    "GET", "personal_collection_records", "get_personal_collection_record", (data) => [data.record_id.toString()]
);


const CreatePersonalCollectionRecord = createNewEndpoint<Optional<PersonalCollectionRecordType, "id">>(
    "POST", "personal_collection_records", "create_personal_collection_records"
);


const EditPersonalCollectionRecord = createNewEndpoint<PersonalCollectionRecordType>(
    "PUT", "personal_collection_records", "edit_personal_collection_record", (data) => [data.id.toString()]
);

const exported_pcr_endpoints = [
    new CreatePersonalCollectionRecord(),
    new EditPersonalCollectionRecord()
];

export { CreatePersonalCollectionRecord, EditPersonalCollectionRecord, GetPersonalCollectionRecord, GetPersonalCollectionRecords, exported_pcr_endpoints };
