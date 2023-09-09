import type { TaxonType, TaxonSynonymType, TaxonNameType, ChecklistTaxonType, ObservationDateType} from "../data_classes/types";
import type {ValueDisplayType} from "../types"

type GroupedTaxa = {
    [key: string]: Taxon[];
};


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
    first_observation_date?: ObservationDateType
    last_observation_date?: ObservationDateType

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

        }

    }
}

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
        let taxon_ids: {
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
        }
    }

    getGrouped(grouped_by: number) {
        let result: GroupedTaxa = {};

        this.taxa.forEach((taxon) => {
            let group_key = this.getGroupKey(taxon, grouped_by);
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
        let result = new Set();
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
        let this_taxon_ids = this.getTaxonIds();
        let other_taxon_ids = otherList.getTaxonIds();
        let common_taxon_ids = new Set(
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
        let this_taxon_ids = this.getTaxonIds();
        let other_taxon_ids = otherList.getTaxonIds();
        let diff_ids = new Set(
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

    let canonical_taxa = new TaxonList([]);
    let checklist_taxa = new TaxonList([]);

    api_data.forEach((taxon) => {
        canonical_taxa.taxa.push(new Taxon(taxon, undefined));
        taxon.taxon_checklist_taxa.forEach((checklist_taxon) => {
            checklist_taxa.taxa.push(new Taxon(undefined, checklist_taxon));
        });
    });

    return [canonical_taxa, checklist_taxa];

}


export {Taxon, TaxonList, GroupBy, loadTaxaFromAPIData}
export type {GroupedTaxa}