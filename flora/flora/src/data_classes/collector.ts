import { createNewEndpoint } from "../util/api_util";
import type { CollectorType } from "./types";

const GetCollectors = createNewEndpoint("GET", "collector_list", "get_collectors");
const GetCollector = createNewEndpoint<{ collector_id: number }>("GET", "collectors", "get_collector", (data) => [data.collector_id.toString()]);

const CreateNewCollector = createNewEndpoint<{ name: string, external_url: string }>(
    "POST", "collectors", "create_new_collector"
)
const UpdateCollector = createNewEndpoint<Pick<CollectorType, "id"> & Partial<CollectorType>>(
    "PATCH", "collectors", "update_collector", (collector) => [collector.id.toString()]
);
const DeleteCollector = createNewEndpoint<{ id: number }>(
    "DELETE", "collectors", "delete_collector", (collector) => [collector.id.toString()]
);



const collector_exported_endpoints = [
    new CreateNewCollector(), new UpdateCollector(), new DeleteCollector(), new GetCollectors(), new GetCollector()

]

export { CreateNewCollector, DeleteCollector, GetCollectors, UpdateCollector, GetCollector, collector_exported_endpoints };

