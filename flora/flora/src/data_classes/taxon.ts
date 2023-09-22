import type { TaxonNameType, TaxonType, ValueDisplayType } from "../data_classes/types";
import { createNewEndpoint } from "../util/api_util";


enum GroupBy {
    family,
    genus,
    alphabetic,
}

class TaxonOrChecklistTaxon {
    taxon_api_data: TaxonType;
    canonical_taxon_api_data: TaxonType;
    is_checklist_taxon: boolean;

    constructor(is_checklist_taxon: boolean, taxon_api_data: TaxonType, canonical_taxon_api_data?: TaxonType) {
        this.taxon_api_data = taxon_api_data;
        if (canonical_taxon_api_data === undefined) {
            this.canonical_taxon_api_data = taxon_api_data;
        } else {
            this.canonical_taxon_api_data = canonical_taxon_api_data;
        }
        this.is_checklist_taxon = is_checklist_taxon;
    }

    isTaxonProperty(property: string): property is (keyof TaxonType) {
        return (property in this.taxon_api_data);
    }

    getValue<DataType>(property: (keyof TaxonType)) {
        const r1 = this.taxon_api_data[property];
        const r2 = this.canonical_taxon_api_data[property];
        if (r1 !== undefined) {
            return r1 as DataType;
        }
        if (r2 !== undefined) {
            return r2 as DataType;
        }
        return undefined;
    }

    getValueAlwaysPresent<DataType>(property: (keyof TaxonType)) {
        const result = this.getValue<DataType>(property);
        if (result === undefined) {
            throw "Key not present"
        }
        return result as DataType;
    }

    taxon_name() {
        return this.getValueAlwaysPresent<string>("taxon_name");
    }

    family() {
        return this.getValueAlwaysPresent<string>("family");
    }

    genus() {
        return this.getValueAlwaysPresent<string>("genus");
    }

    id() {
        return this.getValueAlwaysPresent<number>("id");
    }

    all_mapped_taxa() {
        const result = this.getValue<TaxonNameType[]>("all_mapped_taxa");
        if (result === undefined) {
            return [];
        }
        return result;
    }

    synonyms() {
        const result = this.getValue<ValueDisplayType[]>("synonyms");

        if (result === undefined) {
            return [];
        }
        return result;
    }

    seinet_id() {
        return this.getValue<number>("seinet_id");
    }

    inat_id() {
        return this.getValue<number>("inat_id");
    }

    life_cycle_display() {
        return this.getValue<string>("life_cycle_display");
    }

    introduced_display() {
        return this.getValue<string>("introduced_display");
    }

    endemic_display() {
        return this.getValue<string>("endemic_display");
    }

    first_observation_date() {
        return this.getValue<string>("first_observation_date");
    }


    last_observation_date() {
        return this.getValue<string>("last_observation_date");
    }

}

type GroupedTaxa = {
    [key: string]: TaxonOrChecklistTaxon[];
};

class TaxonList {
    taxa: TaxonOrChecklistTaxon[];

    constructor(taxa: TaxonOrChecklistTaxon[]) {
        this.taxa = taxa;
    }

    filterByTaxonNameContains(taxon_name_filter?: string) {
        if (!taxon_name_filter) {
            return this;
        } else {
            return new TaxonList(
                this.taxa.filter((taxon) => taxon.taxon_name().toLowerCase().includes(taxon_name_filter.toLowerCase()))
            );
        }
    }

    getGroupKey(taxon: TaxonOrChecklistTaxon, grouped_by: GroupBy) {
        switch (grouped_by) {
            case GroupBy.family:
                return taxon.family();
            case GroupBy.genus:
                return taxon.genus();
            case GroupBy.alphabetic:
                return taxon.taxon_name().charAt(0);
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
            result[key].sort((a, b) => Number(a.taxon_name() > b.taxon_name()));
        });
        return result;
    }


    getTaxonIds() {
        const result = new Set();
        this.taxa.forEach((taxon) => {
            if (!taxon.is_checklist_taxon) {
                result.add(taxon.id());
            } else {
                taxon.all_mapped_taxa().forEach((mt) => result.add(mt.id));
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
                if (!taxon.is_checklist_taxon) {
                    return common_taxon_ids.has(taxon.id())
                } else {
                    return taxon.all_mapped_taxa().some((mt) => common_taxon_ids.has(mt.id))
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
                if (!taxon.is_checklist_taxon) {
                    return diff_ids.has(taxon.id());
                } else {
                    return taxon.all_mapped_taxa().filter((i) => diff_ids.has(i.id)).length > 0;
                }

            })
        );
    }


}


function loadTaxaFromAPIData(api_data: TaxonType[]) {

    const canonical_taxa = new TaxonList([]);
    const checklist_taxa = new TaxonList([]);

    const checklist_taxa_seen = new Set();

    api_data.forEach((taxon) => {
        canonical_taxa.taxa.push(new TaxonOrChecklistTaxon(false, taxon));
        taxon.taxon_checklist_taxa
            .forEach((checklist_taxon) => {
                if (!checklist_taxa_seen.has(checklist_taxon.taxon_name)) {
                    checklist_taxa_seen.add(checklist_taxon.taxon_name);
                    checklist_taxa.taxa.push(new TaxonOrChecklistTaxon(true, checklist_taxon, taxon));
                }
            });
    });

    return [canonical_taxa, checklist_taxa];

}


const GetTaxon = createNewEndpoint<{ taxon_id: number }>("GET", "taxa", "get_taxon", (data) => [data.taxon_id.toString()])
const UpdateTaxon = createNewEndpoint<{
    taxon_id: number,
    taxon_name?: string,
    family?: string,
    seinet_id?: string,
    inat_id?: string,
    introduced?: string,
    endemic?: string,
    life_cycle?: string
}>("PATCH",
    "taxa",
    "update_taxon",
    (data) => [data.taxon_id.toString()]
)
const GetTaxa = createNewEndpoint("GET", "taxa", "get_taxa");
const GetPrimaryChecklistTaxa = createNewEndpoint("GET", "primary_taxa", "get_primary_checklist_taxa")
const GetChecklistTaxa = createNewEndpoint<{ checklist: string }>("GET", "taxa", "get_checklist_taxa");
const GetGenusTaxa = createNewEndpoint<{ genus: string }>("GET", "taxa", "get_genus_taxa");
const GetFamilyTaxa = createNewEndpoint<{ family: string }>("GET", "taxa", "get_family_taxa");
const GetTaxaAutocompletion = createNewEndpoint<{ search_term: string }>("GET", "taxa_autocomplete", "taxa_autocomplete");
const GetAllFamilies = createNewEndpoint("GET", "taxon_families", "taxon_families");
const getTaxonRankChoices = createNewEndpoint("GET", "taxon_ranks", "taxon_ranks");
const UpdateObservationDatesEndpoint = createNewEndpoint("GET", "update_observation_dates", "update_observation_dates")
const GetEndemicChoices = createNewEndpoint("GET", "endemic", "endemic");
const GetIntroducedChoices = createNewEndpoint("GET", "introduced", "introduced");
const GetLifeCycleChoices = createNewEndpoint("GET", "life_cycles", "life_cycles");

const MakeSynonymOf = createNewEndpoint<{ taxon_id_1: number, taxon_id_2: number }>("POST", "make_synonym_of", "make_synonym_of");
const CreateNewTaxon = createNewEndpoint<{ taxon_name: string, taxon_family: string }>("POST", "create_new_taxon", "create_new_taxon")

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
    CreateNewTaxon, GetAllFamilies, GetChecklistTaxa, GetEndemicChoices, GetFamilyTaxa, GetGenusTaxa, GetIntroducedChoices, GetLifeCycleChoices, GetPrimaryChecklistTaxa, GetTaxaAutocompletion, GetTaxon, GroupBy, MakeSynonymOf, TaxonOrChecklistTaxon, TaxonList, UpdateObservationDatesEndpoint, UpdateTaxon, exported_taxon_endpoints, loadTaxaFromAPIData
};

export type { GroupedTaxa };
