type TaxonSynonymAPIType = {
    id: number,
    taxon: number,
    synonym: string
}


type TaxonNameAPIType = {
    id: number,
    taxon_name: string
}

type ChecklistTaxonAPIType = {
    id: number,
    taxon_name: string,
    family: string,
    external_id: number,
    rank: string,
    genus: string,
    checklist: number,
    all_mapped_taxa: TaxonNameAPIType[];
}

type TaxonAPIType = {
    id: number,
    taxon_name: string,
    rank: string,
    genus: string,
    family: string,
    life_cycle: string,
    seinet_id?: number,
    inat_id?: number,
    taxon_checklist_taxa: ChecklistTaxonAPIType[],
    taxonsynonym_set: TaxonSynonymAPIType[],
    parent_species?: TaxonNameAPIType
    subtaxa: TaxonNameAPIType[],
    checklists: number[]
}

type ChecklistAPIType = {
    id: number,
    checklist_name: string,
    checklist_type: string,
    external_checklist_id: number,
    locality: string,
    latest_date_retrieved?: string,
    earliest_year?: string
}


type EndemicAPIType = {
    value: string,
    text: string
}


type LifeCycleAPIType = {
    value: string,
    text: string
}

type ChecklistRecordAPIType = {
    id: number,
    external_id: string,
    last_refreshed: string,
    checklist_taxon: TaxonNameAPIType,
    mapped_taxon: TaxonNameAPIType,
    checklist: ChecklistAPIType,
    date: string,
    observer: string
}

export type {
    TaxonAPIType, 
    TaxonNameAPIType, 
    ChecklistAPIType, 
    EndemicAPIType, 
    LifeCycleAPIType, 
    TaxonSynonymAPIType, 
    ChecklistTaxonAPIType, 
    ChecklistRecordAPIType
}