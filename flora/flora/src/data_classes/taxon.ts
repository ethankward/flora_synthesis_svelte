import type { ChecklistTaxonType, TaxonNameType, TaxonType } from "../data_classes/types";
import type { ValueDisplayType } from "../types";
import type { APIEndpoint, APIManager } from "../util/api";
import axios from "axios";
import type { AxiosPromise } from "axios";

enum GroupBy {
    family,
    genus,
    alphabetic,
}

class Taxon {
    id: number;
    checklists: number[];
    taxon_name: string;
    family: string;
    genus: string;
    primary: boolean;
    all_mapped_taxa: TaxonNameType[];
    seinet_id?: number;
    inat_id?: number;
    synonyms: ValueDisplayType[];
    parent_species?: TaxonNameType;
    subtaxa: TaxonNameType[];
    introduced?: string;
    introduced_display?: string;
    endemic?: string;
    endemic_display?: string;
    life_cycle?: string;
    life_cycle_display?: string;
    first_observation_date?: string
    last_observation_date?: string
    first_observation_date_url?: string
    last_observation_date_url?: string
    primary_taxon: boolean;

    constructor(taxon_api_data?: TaxonType, checklist_taxon_api_data?: ChecklistTaxonType) {
        if (taxon_api_data) {
            this.id = taxon_api_data.id;
            this.checklists = taxon_api_data.checklists;
            this.taxon_name = taxon_api_data.taxon_name;
            this.family = taxon_api_data.family;
            this.genus = taxon_api_data.genus;
            this.primary = true;
            this.all_mapped_taxa = [];
            this.seinet_id = taxon_api_data.seinet_id;
            this.inat_id = taxon_api_data.inat_id;
            this.synonyms = taxon_api_data.synonyms;
            this.parent_species = taxon_api_data.parent_species;
            this.subtaxa = taxon_api_data.subtaxa;
            this.introduced = taxon_api_data.introduced;
            this.introduced_display = taxon_api_data.introduced_display;
            this.endemic = taxon_api_data.endemic;
            this.endemic_display = taxon_api_data.endemic_display;
            this.life_cycle = taxon_api_data.life_cycle;
            this.life_cycle_display = taxon_api_data.life_cycle_display;
            this.first_observation_date = taxon_api_data.first_observation_date;
            this.last_observation_date = taxon_api_data.last_observation_date;
            this.first_observation_date_url = taxon_api_data.first_observation_date_url;
            this.last_observation_date_url = taxon_api_data.last_observation_date_url;
            this.primary_taxon = taxon_api_data.taxon_checklist_taxa.some((checklist_taxon) => checklist_taxon.primary_checklist)

        } else {
            if (checklist_taxon_api_data === undefined) {
                throw new Error("Specify one of taxon_api_data or checklist_taxon_api_data");
            }
            this.id = checklist_taxon_api_data.id;
            this.checklists = [checklist_taxon_api_data.checklist];
            this.taxon_name = checklist_taxon_api_data.taxon_name;
            this.family = checklist_taxon_api_data.family;
            this.genus = checklist_taxon_api_data.genus;
            this.primary = false;
            this.all_mapped_taxa = checklist_taxon_api_data.all_mapped_taxa;
            this.synonyms = [];
            this.subtaxa = [];
            this.primary_taxon = checklist_taxon_api_data.primary_checklist;
        }
    }
}

type GroupedTaxa = {
    [key: string]: Taxon[];
};


class TaxonList {
    taxa: Taxon[];

    constructor(taxa: Taxon[]) {
        this.taxa = taxa;
    }

    filterByChecklist(checklist: number) {
        return new TaxonList(
            this.taxa.filter((taxon) =>
                taxon.checklists.includes(checklist)
            )
        );
    }

    deduplicate() {
        const taxon_ids: {
            [key: number]: Taxon;
        } = {};
        this.taxa.forEach((taxon) => {
            taxon_ids[taxon.id] = taxon;
        });
        return new TaxonList(Object.values(taxon_ids));

    }

    filterByTaxonNameContains(taxon_name_filter?: string) {
        if (!taxon_name_filter) {
            return this;
        } else {
            return new TaxonList(
                this.taxa.filter((taxon) => taxon.taxon_name.toLowerCase().includes(taxon_name_filter.toLowerCase()))
            );
        }
    }

    getGroupKey(taxon: Taxon, grouped_by: GroupBy) {
        switch (grouped_by) {
            case GroupBy.family:
                return taxon.family;
            case GroupBy.genus:
                return taxon.genus;
            case GroupBy.alphabetic:
                return taxon.taxon_name.charAt(0);
            default:
                return "";
        }
    }

    getGrouped(grouped_by: number) {
        const result: GroupedTaxa = {};

        this.taxa.forEach((taxon) => {
            const group_key = this.getGroupKey(taxon, grouped_by);
            if (!(group_key in result)) {
                result[group_key] = [];
            }
            result[group_key].push(taxon);
        });
        Object.keys(result).forEach((key) => {
            result[key].sort((a, b) => Number(a.taxon_name > b.taxon_name));
        });
        return result;
    }

    getTaxonIds() {
        const result = new Set();
        this.taxa.forEach((taxon) => {
            if (taxon.primary) {
                result.add(taxon.id);
            } else {
                taxon.all_mapped_taxa.forEach((mt) => result.add(mt.id));
            }

        });
        return result;
    }

    commonTaxa(otherList: TaxonList) {
        const this_taxon_ids = this.getTaxonIds();
        const other_taxon_ids = otherList.getTaxonIds();
        const common_taxon_ids = new Set(
            [...this_taxon_ids].filter((x) => other_taxon_ids.has(x))
        );

        return new TaxonList(
            this.taxa.filter((taxon) => {
                if (taxon.primary) {
                    return common_taxon_ids.has(taxon.id)
                } else {
                    return taxon.all_mapped_taxa.some((mt) => common_taxon_ids.has(mt.id))
                }
            })
        );
    }

    differingTaxa(otherList: TaxonList) {
        const this_taxon_ids = this.getTaxonIds();
        const other_taxon_ids = otherList.getTaxonIds();
        const diff_ids = new Set(
            [...this_taxon_ids].filter((x) => !other_taxon_ids.has(x))
        );

        return new TaxonList(
            this.taxa.filter((taxon) => {
                if (taxon.primary) {
                    return diff_ids.has(taxon.id);
                } else {
                    return taxon.all_mapped_taxa.filter((i) => diff_ids.has(i.id)).length > 0;
                }

            })
        );
    }
}


function loadTaxaFromAPIData(api_data: TaxonType[]) {

    const canonical_taxa = new TaxonList([]);
    const checklist_taxa = new TaxonList([]);

    api_data.forEach((taxon) => {
        canonical_taxa.taxa.push(new Taxon(taxon, undefined));
        taxon.taxon_checklist_taxa.forEach((checklist_taxon) => {
            checklist_taxa.taxa.push(new Taxon(undefined, checklist_taxon));
        });
    });

    return [canonical_taxa, checklist_taxa];

}

class GetTaxa implements APIEndpoint {
    external_endpoint = "taxa";
    unique_identifier = "get_taxa";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}

class GetTaxon implements APIEndpoint {
    external_endpoint = "taxa";
    unique_identifier = "get_taxon";

    action(api_manager: APIManager, data: { taxon_id: number }) {
        return api_manager.get([this.external_endpoint, data.taxon_id.toString()]);
    }
}


class GetPrimaryChecklistTaxa implements APIEndpoint {
    external_endpoint = "primary_taxa";
    unique_identifier = "get_primary_checklist_taxa";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}

type get_checklist_taxa_data_type = { checklist_id: number };

class GetChecklistTaxa implements APIEndpoint {
    external_endpoint = "taxa";
    unique_identifier = "get_checklist_taxa";

    action(api_manager: APIManager, data: get_checklist_taxa_data_type) {
        return api_manager.get([this.external_endpoint], { "checklist": data.checklist_id.toString() });
    }

    async callExternalEndpoint(data: get_checklist_taxa_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }
}


class GetGenusTaxa implements APIEndpoint {
    external_endpoint = "taxa";
    unique_identifier = "get_genus_taxa";

    action(api_manager: APIManager, data: { genus: string }) {
        return api_manager.get([this.external_endpoint], { "genus": data.genus });
    }

}
class GetFamilyTaxa implements APIEndpoint {
    external_endpoint = "taxa";
    unique_identifier = "get_family_taxa";

    action(api_manager: APIManager, data: { family: string }) {
        return api_manager.get([this.external_endpoint], { "family": data.family });
    }

}

type update_taxon_data_type = {
    taxon_id: number,
    taxon_name?: string,
    family?: string,
    seinet_id?: string,
    inat_id?: string,
    introduced?: string,
    endemic?: string,
    life_cycle?: string
};

class UpdateTaxon implements APIEndpoint {
    external_endpoint = "taxa";
    unique_identifier = "update_taxon";

    action(api_manager: APIManager, data: update_taxon_data_type) {
        return api_manager.patch(data, [this.external_endpoint, data.taxon_id.toString()]);
    }

    async callExternalEndpoint(data: update_taxon_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }

}


type get_taxa_autocompletion_type = { search_term: string };

class GetTaxaAutocompletion implements APIEndpoint {
    external_endpoint = "taxa_autocomplete";
    unique_identifier = "taxa_autocomplete";

    action(api_manager: APIManager, data: get_taxa_autocompletion_type) {
        return api_manager.get([this.external_endpoint], { "search_term": data.search_term });
    }

    async callExternalEndpoint(data: get_taxa_autocompletion_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }

}

type make_synonym_of_type = { taxon_id_1: number, taxon_id_2: number };

class MakeSynonymOf implements APIEndpoint {
    external_endpoint = "make_synonym_of";
    unique_identifier = "make_synonym_of";

    action(api_manager: APIManager, data: make_synonym_of_type) {
        return api_manager.post({ "taxon_id_1": data.taxon_id_1, "taxon_id_2": data.taxon_id_2 }, [this.external_endpoint]);
    }

    async callExternalEndpoint(data: make_synonym_of_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }

}

class GetAllFamilies implements APIEndpoint {
    external_endpoint = "taxon_families"
    unique_identifier = "taxon_families";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}

class UpdateObservationDatesEndpoint implements APIEndpoint {
    external_endpoint = "update_observation_dates";
    unique_identifier = "update_observation_dates";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }

    async callExternalEndpoint(): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, {});
    }

}

class getTaxonRankChoices implements APIEndpoint {
    external_endpoint = "taxon_ranks";
    unique_identifier = "taxon_ranks";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}


type create_new_taxon_data_type = { taxon_name: string, taxon_family: string };

class CreateNewTaxon implements APIEndpoint {
    external_endpoint = "create_new_taxon";
    unique_identifier = "create_new_taxon";

    action(api_manager: APIManager, data: create_new_taxon_data_type) {
        return api_manager.post({
            taxon_name: data.taxon_name,
            taxon_family: data.taxon_family
        }, [this.external_endpoint]);
    }

    async callExternalEndpoint(data: create_new_taxon_data_type): AxiosPromise {
        const url = "/api/externalAPIInterface/?endpoint_identifier=" + this.unique_identifier;
        return axios.post(url, data);
    }

}

class GetEndemicChoices implements APIEndpoint {
    external_endpoint = "endemic";
    unique_identifier = "endemic";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}

class GetIntroducedChoices implements APIEndpoint {
    external_endpoint = "introduced";
    unique_identifier = "introduced";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}

class GetLifeCycleChoices implements APIEndpoint {
    external_endpoint = "life_cycles";
    unique_identifier = "life_cycle";

    action(api_manager: APIManager) {
        return api_manager.get([this.external_endpoint]);
    }
}

const exported_taxon_endpoints = [
    new GetTaxa(),
    new GetTaxon(),
    new GetPrimaryChecklistTaxa(),
    new GetChecklistTaxa(),
    new GetGenusTaxa(),
    new GetFamilyTaxa(),
    new UpdateTaxon(),
    new GetTaxaAutocompletion(),
    new MakeSynonymOf(),
    new GetAllFamilies(),
    new getTaxonRankChoices(),
    new UpdateObservationDatesEndpoint(),
    new CreateNewTaxon(),
    new GetEndemicChoices(),
    new GetIntroducedChoices(),
    new GetLifeCycleChoices(),
];


export {
    GroupBy, Taxon, TaxonList, loadTaxaFromAPIData,
    exported_taxon_endpoints,
    CreateNewTaxon, GetTaxaAutocompletion, GetAllFamilies,
    GetTaxon, GetLifeCycleChoices, GetEndemicChoices,
    GetIntroducedChoices, GetPrimaryChecklistTaxa,
    GetGenusTaxa, GetFamilyTaxa, MakeSynonymOf, UpdateTaxon,
    GetChecklistTaxa, UpdateObservationDatesEndpoint
};

export type { GroupedTaxa };