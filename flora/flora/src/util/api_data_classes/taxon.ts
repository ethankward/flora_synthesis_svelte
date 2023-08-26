class Taxon {
    id: number;
    primary: boolean;
    seinet_id: number;
    inat_id: number;
    taxon_name: string;
    genus: string;
    family: string;
    checklists: number[];
    observation_types: number[];
    synonyms: string[];
    mapped_to: Taxon[];
    parent_species?: number;
    subtaxa: number[];

    constructor(
        api_data: any, primary: boolean
    ) {
        this.id = api_data.pk;
        this.primary = primary;
        this.seinet_id = api_data.seinet_id;
        this.inat_id = api_data.inat_id;
        this.taxon_name = api_data.taxon_name;
        this.genus = api_data.genus;
        this.family = api_data.family;
        if (api_data.on_checklists) {
            this.checklists = api_data.on_checklists;
        } else {
            this.checklists = [];
        }
        
        this.observation_types = api_data.observation_types;
        if (api_data.taxonsynonym_set) {
            this.synonyms = api_data.taxonsynonym_set;
        } else {
            this.synonyms = [];
        }
        
        this.mapped_to = [];
        if (api_data.parent_species) {
            this.parent_species = api_data.parent_species;
        }
        this.subtaxa = api_data.subtaxa;
    }
}


type GroupedTaxa = {
    [key: string]: Taxon[];
};


enum GroupBy {
    family,
    genus,
    alphabetic,
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

    filterByIncludedObservationType(observation_types: number[]) {
        return new TaxonList(
            this.taxa.filter((taxon) =>
                taxon.observation_types.some((v: any) =>
                    observation_types.includes(v)
                )
            )
        );
    }

    filterByExcludedObservationType(observation_types: number[]) {
        return new TaxonList(
            this.taxa.filter(
                (taxon) =>
                    !taxon.observation_types.some((v: any) =>
                        observation_types.includes(v)
                    )
            )
        );
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
                taxon.mapped_to.forEach((mt) => result.add(mt.id));
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
            this.taxa.filter((taxon) => common_taxon_ids.has(taxon.id))
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
                    return taxon.mapped_to.map((t) => t.id).filter((i) => diff_ids.has(i)).length > 0;
                }
                
            })
        );
    }
}


function loadTaxaFromAPIData(api_data: any) {
    let canonical_taxa = new TaxonList(
        api_data.map(
            (t: any) =>
                new Taxon(
                    t,
                    true
                )
        )
    );

    let taxa_map_index: {[key: number]: Taxon;} = {};
    canonical_taxa.taxa.forEach((canonical_taxon: Taxon) => {
        taxa_map_index[canonical_taxon.id] = canonical_taxon;
     });

    let checklist_taxa_obj: {[key: number]: Taxon} = {};
    
    api_data.forEach((taxon: any) => {
        taxon.taxon_checklist_taxa.forEach(
            (checklist_taxon: any) => {
                if (!(checklist_taxon.pk in checklist_taxa_obj)) {
                    checklist_taxa_obj[checklist_taxon.pk] = new Taxon(
                        checklist_taxon,
                        false
                    );
                }

                checklist_taxa_obj[checklist_taxon.pk].mapped_to.push(taxa_map_index[taxon.pk]);
                checklist_taxa_obj[checklist_taxon.pk].checklists.push(checklist_taxon.checklist);
                checklist_taxa_obj[checklist_taxon.pk].observation_types.push(...checklist_taxon.observation_types);
            }
        );
    });

    let checklist_taxa = new TaxonList(Object.values(checklist_taxa_obj));
    return [canonical_taxa, checklist_taxa];

}


export {Taxon, TaxonList, GroupBy, loadTaxaFromAPIData}
