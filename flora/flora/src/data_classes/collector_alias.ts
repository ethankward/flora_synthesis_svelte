import type { CollectorAliasType } from "../data_classes/types";
import { createNewEndpoint } from "../util/api_util";

import type { Optional } from "../util/api_util";


const CreateNewCollectorAlias = createNewEndpoint<Optional<CollectorAliasType, 'id'>>(
    "POST", "collector_aliases", "create_new_collector_alias"
)
const UpdateCollectorAlias = createNewEndpoint<CollectorAliasType>(
    "PUT", "collector_aliases", "update_collector_alias", (collector_alias) => [collector_alias.id.toString()]
);
const DeleteCollectorAlias = createNewEndpoint<{ id: number }>(
    "DELETE", "collector_aliases", "delete_collector_alias", (collector_alias) => [collector_alias.id.toString()]
);



const collector_alias_exported_endpoints = [
    new CreateNewCollectorAlias(), new UpdateCollectorAlias(), new DeleteCollectorAlias()

]

export { CreateNewCollectorAlias, UpdateCollectorAlias, DeleteCollectorAlias, collector_alias_exported_endpoints };

